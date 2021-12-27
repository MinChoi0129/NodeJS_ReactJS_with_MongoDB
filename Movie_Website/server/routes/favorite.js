const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')

router.post('/favoriteNumber', (req, res) => {
    Favorite.find({"movieId": req.body.movieID})
    .exec((err, info) => {
        if (err) return res.status(400).send(err)
        res.status(200).json({success: true, favoriteNumber: info.length})
    })
})

router.post('/favorited', (req, res) => {
    Favorite.find({
        "movieId": req.body.movieID,
        "userFrom": req.body.userFrom
    })
    .exec((err, info) => {
        if (err) return res.status(400).send(err)

        let result = false
        if (info.length !== 0) {
            result = true
        }

        res.status(200).json({success: true, favorited: result})
    })
})

module.exports = router;