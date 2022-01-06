const express = require('express');
const router = express.Router();
// const { Video } = require("../models/Video");
const { auth } = require("../middleware/auth");
const multer = require("multer");
var ffmpeg = require('fluent-ffmpeg');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only mp4 is allowed.', false))
        }
        cb(null, true)
    }
})

const upload = multer({ storage: storage }).single("file")

//=================================
//             Video
//=================================

router.post("/uploads", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
    })
})

router.post("/thumbnail", (req, res) => {
    let filePath = ""
    let fileDuration = ""

    ffmpeg.ffprobe(req.body.url, function (err,metadata) {
        console.log(metadata.format.duration, "초")
        fileDuration = metadata.format.duration
    })

    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log(filenames)
            filePath = 'uploads/thumbnails/' + filenames[0]
        })
        .on('end', function () {
            console.log("Screenshots had been taken.")
            return res.json({success: true, url: filePath, fileDuration: fileDuration})
        })
        .on('error', function(err) {
            console.error(err)
            return res.json({success: false, err})
        })
        .screenshots({
            count: 2, 
            folder: 'uploads/thumbnails',
            size: '320x240',
            filename: 'thumbnail-%b.png'
        })
})

module.exports = router;