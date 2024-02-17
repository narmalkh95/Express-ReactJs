const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const Users = require("../models/User");

const HOST = process.env.HOST_IP || 'localhost';


router.get('/verify', async (req, res) => {
    const { token } = req.query;
    const decoded = jwt.verify(token, 'secret');

    const user = await Users.findById( decoded.userId);

    if (!user) {
        return res.status(401).json({ message: 'Invalid username' });
    }

    //@TODO check if the user late or in time to class and save in db

    res.redirect(`http://${HOST}:3000/thank-you`);

});

module.exports = router;
