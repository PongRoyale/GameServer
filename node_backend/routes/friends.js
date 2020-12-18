const express = require('express');
const router = express.Router();
const { pool } = require('../db')
  
/**
 * Adds a user, friend pair to friends table
 */
router.post('/', (req, res) => {
    let q = `
        INSERT INTO friends(username, friend)
        VALUES ($1, $2)
    `;

    const body = req.body;
    pool.query(q, [body.username, body.friendname], (err, res) => {
        if (err) {throw err}
        if (res.rowCount === 0) res.sendStatus(400);
        else res.sendStatus(200);
    });
});

/**
 * Get a given user's list of friends
 */
router.get('/', (req, res) => {
    let q = `
        SELECT friend
        FROM friends
        WHERE username = $1 
    `;

    const body = req.body;
    pool.query(q, [body.username], (err, res) => {
        if (err) {throw err}
        if (res.rowCount === 0) res.sendStatus(400);
        else res.status(200).json(res.rows);
    });
});

/**
 * Remove a friend given user
 */
router.delete('/', (req, res) => {
    let q = `
        DELETE FROM friends
        WHERE username = $1
        AND friend = $2
    `;

    const body = req.body;
    pool.query(q, [body.username, body.friendname], (err, res) => {
        if (err) {throw err}
        if (res.rowCount === 0) res.sendStatus(400);
        else res.sendStatus(200);
    });
});

module.exports = router;