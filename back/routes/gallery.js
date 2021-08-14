const express = require('express');
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const imageThumbnail = require('image-thumbnail');
const imageHash = require('node-image-hash');
const config = require('../config');
const StormDB = require("stormdb");

const upload = multer({
    dest: config.tempImagePath,

});

const engine = new StormDB.localFileEngine("./db.stormdb");
const db = new StormDB(engine);
db.default({ photos: [] });

const router = express.Router();

router.get('/photos', (req, res) => {
    const pageSize = isNaN(req.query.pageSize) ? 10 : +req.query.pageSize;
    const page = isNaN(req.query.page) ? 1 : +req.query.page;
    const dateTo = isNaN(Date.parse(req.query.dateTo)) ? (new Date()).toISOString() : req.query.dateTo;

    let photos = db.get("photos").value();

    photos = photos.sort((a, b) => -a.createdOn.localeCompare(b.createdOn));

    if (dateTo) {
        photos = photos.filter(p => p.createdOn <= dateTo);
    }

    const response = {
        totalCount: photos.length,
        pageSize,
        page,
        items: photos.slice((page - 1) * pageSize, page * pageSize),
    };

    if (photos.length % pageSize === 0) {
        response.totalPages = photos.length / pageSize;
    } else {
        response.totalPages = Math.floor(photos.length / pageSize) + 1;
    }

    return res.json(response);
});

router.post("/photos", upload.single("photo"), async (req, res) => {
    const file = req.file;

    if (!file.mimetype.startsWith("image/")) {
        fs.unlinkSync(file.path);
        return res.status(403).json({ error: "invalid_type", message: "Invalid file type. Only image files are allowed." });
    }

    const photos = db.get("photos").value();

    const fileHash = await imageHash.syncHash(file.path, 8, 'hex');
    const duplicateImage = photos.find((i) => i.hash === fileHash.hash);
    //if (duplicateImage) {
    if (false) {
        fs.unlinkSync(file.path);
        return res.status(403).json({ error: "duplicate", message: "Error occurred. Duplicate images are not allowed." });
    }

    /* 
        For simplicity, hash value is used as a subfolder to allow images with same name
        If there was real db behind this, it could be unique id of image or guid
    */
    const targetDir = path.join(config.imagePath, fileHash.hash);
    const targetPath = path.join(targetDir, file.originalname);
    const thumbnailDir = path.join(targetDir, config.thumbnailPath);
    const thumbnailPath = path.join(thumbnailDir, file.originalname);

    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir);
    }

    if (!fs.existsSync(thumbnailDir)) {
        fs.mkdirSync(thumbnailDir);
    }

    fs.renameSync(file.path, targetPath);

    const thumbnail = await imageThumbnail(targetPath, { percentage: 50 });

    fs.writeFileSync(thumbnailPath, thumbnail);

    const photo = {
        name: file.originalname,
        createdOn: (new Date()).toISOString(),
        hash: fileHash.hash,
        path: ["/" + fileHash.hash, file.originalname].join('/'),
        thumbnailPath: ["/" + fileHash.hash, config.thumbnailPath, file.originalname].join('/')
    }

    db.get("photos").push(photo).save();

    return res.status(200).json(photo);
});

module.exports = router;