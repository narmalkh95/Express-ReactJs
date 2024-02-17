const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const jwt = require('jsonwebtoken');

const Users = require("../models/User");


router.get('/verify', async (req, res) => {
    const { token } = req.query;
    const decoded = jwt.verify(token, 'secret');

    const user = await Users.findById( decoded.userId);

    if (!user) {
        return res.status(401).json({ message: 'Invalid username' });
    }

    res.redirect('http://192.168.0.100:3000/thank-you');

});

module.exports = router;
