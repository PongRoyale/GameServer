const express = require('express');
const router = express.Router();
const { pool } = require('../db')
  
/**
 * Register (i.e. add) a user to the users table
 */
router.post('/', (req, res) => {
    let q = `
        INSERT INTO users(username, password, email)
        VALUES ($1, crypt($2, gen_salt('bf', 4)), $3)
    `;

    const body = req.body;
    pool.query(q, [body.username, body.password, body.email], (err, res) => {
        if (err) {throw err}
        if (res.rowCount === 0) res.sendStatus(400);
        else res.sendStatus(200);
    });
});

/**
 * Check if a given users is in the database (login action)
 */
router.get('/', (req, res) => {
    let q = `
        SELECT username, email
        FROM user
        WHERE username = $1 
        AND password = crypt($2, password)
    `;

    const body = req.body;
    pool.query(q, [body.username, body.password], (err, res) => {
        if (err) {throw err}
        if (res.rowCount === 0) res.sendStatus(400);
        else res.status(200).json(res.rows);
    });
});

/**
 * Remove a user from the users table
 */
router.delete('/', (req, res) => {
    let q = `
        DELETE FROM users
        WHERE username = $1
        AND password = crypt($2, password)
    `;

    const body = req.body;
    pool.query(q, [body.username, body.password], (err, res) => {
        if (err) {throw err}
        if (res.rowCount === 0) res.sendStatus(400);
        else res.sendStatus(200);
    });
});

/**
 * Get relevant user data (wins, losses)
 */
router.get('/data', (req, res) => {
    let q = `
        SELECT wins, losses
        FROM users
        WHERE username = $1
    `;

    const body = req.body;
    pool.query(q, [body.username], (err, res) => {
        if (err) {throw err}
        if (res.rowCount === 0) res.sendStatus(400);
        else res.status(200).json(res.rows);
    });
});

module.exports = router;