const {model} = require("mongoose");
const router = express.Router();
const express = require("express");
 const multer = require('multer');

const upload = multer({ storage });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

router.post('/', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
     const File = model('File', {
        filename: String,
        path: String,
        size: Number,
        createdAt: { type: Date, default: Date.now },
    });
    const newFile = new File({
        filename: file.originalname,
        path: file.path,
        size: file.size,
    });
    newFile.save((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to save file' });
        }
        res.json({ filename: file.originalname, path: file.path });
    });
});

module.exports = router;