const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/mydb';
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

router.post('/login', async (req, res) => {
    const client = new MongoClient(uri);
    const { username, password } = req.body;

    try {
        await client.connect();

        const database = client.db();
        const usersCollection = database.collection('User');

        const user = await usersCollection.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;