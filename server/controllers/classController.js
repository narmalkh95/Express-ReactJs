const express = require('express');
const router = express.Router();
const Class = require('../models/Class');

// Create class
router.post('/class', (req, res) => {
    const { name, startDate, endDate, room, teacher, link } = req.body;
    const newClass = new Class({ name, startDate, endDate, room, teacher, link });
    newClass.save()
        .then(() => res.status(201).json(newClass))
        .catch((err) => res.status(500).json(err));
});

// Read all classes
router.get('/class', (req, res) => {
    Class.find()
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json(err));
});

// Update class
router.put('/class/:id', (req, res) => {
    const { id } = req.params;
    const { name, startDate, endDate, room, teacher, link } = req.body;
    Class.findByIdAndUpdate(id, { name, startDate, endDate, room, teacher, link }, { new: true })
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json(err));
});

// Delete class
router.delete('/class/:id', (req, res) => {
    const { id } = req.params;
    Class.findByIdAndDelete(id)
        .then(() => res.sendStatus(204))
        .catch((err) => res.status(500).json(err));
});

module.exports = router;