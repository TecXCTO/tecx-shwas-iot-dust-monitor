/**
 * Project Shwas — Automated API Endpoint Integration Testing Suite
 * Validates endpoint stability, data typing, and security role locks.
 */

const request = require('supertest');
const assert = require('assert');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

// Initialize an isolated, clean memory database for automated software testing
const testDb = new sqlite3.Database(':memory:');
const app = express();

app.use(express.json());

// Setup a mock API route replicating production system endpoints
app.get('/api/v1/shwas/history', (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).json({ error: "Access Denied" });
    
    testDb.all(`SELECT * FROM shwas_test_logs`, [], (err, rows) => {
        res.json({ records: rows });
    });
});

describe('=== PROJECT SHWAS: BACKEND API LIFECYCLE TESTS ===', () => {
    
    before((done) => {
        testDb.run(`CREATE TABLE shwas_test_logs (mine_id TEXT, pm10 REAL)`, () => {
            testDb.run(`INSERT INTO shwas_test_logs (mine_id, pm10) VALUES ('NODE_999', 420.5)`, done);
        });
    });

    it('🛑 Test Guard 1: Verify route rejects calls missing a secure authorization header', (done) => {
        request(app)
            .get('/api/v1/shwas/history')
            .expect(403)
            .end((err, res) => {
                if (err) return done(err);
                assert.strictEqual(res.body.error, "Access Denied");
                done();
            });
    });

    it('✅ Test Guard 2: Verify route successfully releases data logs when authorized', (done) => {
        request(app)
            .get('/api/v1/shwas/history')
            .set('Authorization', 'Bearer MOCK_GOVT_TOKEN_2026')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert.strictEqual(res.body.records.length, 1);
                assert.strictEqual(res.body.records[0].mine_id, 'NODE_999');
                assert.strictEqual(res.body.records[0].pm10, 420.5);
                done();
            });
    });
});

