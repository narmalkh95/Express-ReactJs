const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');

const qrCodeData = {};

router.get('/generateQR/:userId/:classroomId', async (req, res) => {
    const { userId, classroomId } = req.params;
    const uniqueCode = `${userId}-${classroomId}`;

    qrCodeData[uniqueCode] = { userId, classroomId };

    const qrCode = await QRCode.toDataURL(uniqueCode);
    res.json({ qrCode });
});

module.exports = router;

