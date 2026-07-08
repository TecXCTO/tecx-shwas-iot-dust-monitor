/**
 * Project Shwas — High-Density Binary Data Packet Unpacker
 * Unpacks big-endian raw radio payloads to minimize telemetry bandwidth usage.
 */
function unpackTelemetryPacket(rawBuffer) {
    if (rawBuffer.length !== 7) {
        throw new Error(`Invalid packet size: Received ${rawBuffer.length} bytes, expected exactly 7.`);
    }

    const nodeId = rawBuffer.readUInt8(0);
    const pm25   = rawBuffer.readUInt16BE(1);
    const pm10   = rawBuffer.readUInt16BE(3);
    const batteryVoltage = rawBuffer.readUInt8(5) / 50.0;
    
    const flagByte = rawBuffer.readUInt8(6);
    const isTampered    = (flagByte & 0x80) !== 0; 
    const isConsoleOpen = (flagByte & 0x40) !== 0; 

    return {
        id: nodeId,
        pm25: pm25,
        pm10: pm10,
        voltage: parseFloat(batteryVoltage.toFixed(2)),
        security: {
            caseTamperAlert: isTampered,
            consoleExposed: isConsoleOpen
        },
        timestamp: new Date().toISOString()
    };
}

module.exports = { unpackTelemetryPacket };
