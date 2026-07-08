/**
 * Project Shwas — Ingestion Pipeline, SQLite Controller & WebSocket Hub
 */
const express = require('express');const http = require('http');const WebSocket = require('ws');const mqtt = require('mqtt');const sqlite3 = require('sqlite3').verbose();const twilio = require('twilio');const { unpackTelemetryPacket } = require('./binary_parser');
const app = express();const server = http.createServer(app);const wss = new WebSocket.Server({ server });
const db = new sqlite3.Database('./database/shwas_compliance.db');
app.use(express.static('public'));

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS shwas_dust_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mine_id TEXT, pm25 REAL, pm10 REAL, 
        security_state TEXT, voltage REAL, logged_time TEXT DEFAULT CURRENT_TIMESTAMP
    )`);
});
const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID || 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN || 'your_auth_token_here';let SMS_GATEWAY;try {
    SMS_GATEWAY = new twilio(TWILIO_SID, TWILIO_TOKEN);
} catch (e) {
    console.warn("Twilio client initialization bypassed. Provide valid variables for active SMS alerts.");
}
const BROKER_URL = process.env.MQTT_BROKER_URL || 'mqtt://://hivemq.com';const mqttClient = mqtt.connect(BROKER_URL);

mqttClient.on('connect', () => {
    mqttClient.subscribe('rajasthan/mines/+/shwas_binary_telemetry');
    console.log("● SHWAS BROKER LINK: Online and listening for raw 7-byte telemetry buffers.");
});

mqttClient.on('message', (topic, messageBuffer) => {
    try {
        const decoded = unpackTelemetryPacket(messageBuffer);
        const mineId = `NODE_${decoded.id.toString().padStart(3, '0')}`;
        const securityState = decoded.security.caseTamperAlert ? "TAMPER_ALERT" : "SECURE";

        db.run(`INSERT INTO shwas_dust_logs (mine_id, pm25, pm10, security_state, voltage) VALUES (?, ?, ?, ?, ?)`, 
            [mineId, decoded.pm25, decoded.pm10, securityState, decoded.voltage]);

        if ((decoded.pm10 >= 10000 || decoded.security.caseTamperAlert) && SMS_GATEWAY) {
            SMS_GATEWAY.messages.create({
                body: `🚨 SHWAS COMPLIANCE CRITICAL: Mine Node [${mineId}] entered alarm state: ${securityState}. PM10 density: ${decoded.pm10} ug/m3. Immediate water mist suppression required.`,
                to: '+919876543210', from: '+1234567890'
            }).catch(err => console.error("SMS routing exception:", err.message));
        }

        const uiUpdatePayload = JSON.stringify({
            type: "update", id: decoded.id, pm25: decoded.pm25, pm10: decoded.pm10, tamper: securityState, volt: decoded.voltage
        });

        wss.clients.forEach(wsClient => {
            if (wsClient.readyState === WebSocket.OPEN) wsClient.send(uiUpdatePayload);
        });
    } catch (error) {
        console.error("Packet processing error:", error.message);
    }
});

server.listen(3000, () => console.log("Shwas Control Dashboard active at http://localhost:3000"));
