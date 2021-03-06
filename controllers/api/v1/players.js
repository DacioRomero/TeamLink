const express = require('express');
const router = express.Router();
const Player = require('../../../models/player');
const Comment = require('../../../models/comment');

// INDEX Player
router.get('/players', (req, res) => {
    Player.find().lean()
    .then(players => {
        res.status(200).send(players)
    })
    .catch(error => {
        console.error(error);
        res.status(400).send(error);
    });
});

// CREATE Player
router.post('/players', (req, res) => {
    Player.create(req.body)
    .then(player => {
        res.status(200).send(player);
    })
    .catch(error => {
        res.status(400).send(error);
        console.error(error);
    });
});

// SHOW Player
router.get('/players/:id', (req, res) => {
    Player.findById(req.params.id).lean()
    .then(player => {
        res.status(200).send(player);
    })
    .catch(error => {
        console.error(error);
        res.status(400).send(error);
    });
});

// UPDATE Player
router.put('/players/:id', (req, res) => {
    Player.findByIdAndUpdate(req.params.id, req.body).lean()
    .then(player => {
        res.status(200).send(player);
    })
    .catch(error => {
        console.error(error);
        res.status(400).send(error);
    });
});

// DESTROY Player
router.delete('/players/:id', (req, res) => {
    Player.findByIdAndDelete(req.params.id).lean()
    .then(player => {
        res.status(200).send(player);
    })
    .catch(error => {
        console.error(error);
        res.status(400).send(error);
    })
});

module.exports = router;
