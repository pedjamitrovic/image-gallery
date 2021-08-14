const express = require('express');
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const imageThumbnail = require('image-thumbnail');
const imageHash = require('node-image-hash');
const upload = multer({
    dest: path.join(__dirname, "../uploads/temp"),
});

const router = express.Router();

const PHOTOS = [
    { name: 'a.jpg', createdOn: '2021-08-14T06:48:19.424Z', hash: '403f6f10fe0042f8', path: '/file/v1/1/a.jpg', thumbnailPath: '/file/v1/1/a.jpg' },
    { name: 'a.jpg', createdOn: '2021-08-14T06:48:19.424Z', hash: '403f6f10fe0042f8', path: '/file/v1/1/a.jpg', thumbnailPath: '/file/v1/1/a.jpg' },
    { name: 'a.jpg', createdOn: '2021-08-14T06:48:19.424Z', hash: '403f6f10fe0042f8', path: '/file/v1/1/a.jpg', thumbnailPath: '/file/v1/1/a.jpg' },
    { name: 'a.jpg', createdOn: '2021-08-14T06:48:19.424Z', hash: '403f6f10fe0042f8', path: '/file/v1/1/a.jpg', thumbnailPath: '/file/v1/1/a.jpg' },
    { name: 'a.jpg', createdOn: '2021-08-14T06:48:19.424Z', hash: '403f6f10fe0042f8', path: '/file/v1/1/a.jpg', thumbnailPath: '/file/v1/1/a.jpg' },
    { name: 'a.jpg', createdOn: '2021-08-14T06:48:19.424Z', hash: '403f6f10fe0042f8', path: '/file/v1/1/a.jpg', thumbnailPath: '/file/v1/1/a.jpg' },
    { name: 'a.jpg', createdOn: '2021-08-14T06:48:19.424Z', hash: '403f6f10fe0042f8', path: '/file/v1/1/a.jpg', thumbnailPath: '/file/v1/1/a.jpg' },
    { name: 'a.jpg', createdOn: '2021-08-14T06:48:19.424Z', hash: '403f6f10fe0042f8', path: '/file/v1/1/a.jpg', thumbnailPath: '/file/v1/1/a.jpg' },
    { name: 'a.jpg', createdOn: '2021-08-14T06:48:19.424Z', hash: '403f6f10fe0042f8', path: '/file/v1/1/a.jpg', thumbnailPath: '/file/v1/1/a.jpg' },
    { name: 'a.jpg', createdOn: '2021-08-14T10:48:19.424Z', hash: '403f6f10fe0042f8', path: '/file/v1/1/a.jpg', thumbnailPath: '/file/v1/1/a.jpg' },
    { name: 'a.jpg', createdOn: '2021-08-14T10:48:19.424Z', hash: '403f6f10fe0042f8', path: '/file/v1/1/a.jpg', thumbnailPath: '/file/v1/1/a.jpg' },
    { name: 'a.jpg', createdOn: '2021-08-14T10:48:19.424Z', hash: '403f6f10fe0042f8', path: '/file/v1/1/a.jpg', thumbnailPath: '/file/v1/1/a.jpg' },
    { name: 'a.jpg', createdOn: '2021-08-14T10:48:19.424Z', hash: '403f6f10fe0042f8', path: '/file/v1/1/a.jpg', thumbnailPath: '/file/v1/1/a.jpg' },
];

router.get('/photos', (req, res, next) => {
    const pageSize = isNaN(req.query.pageSize) ? 10 : +req.query.pageSize;
    const page = isNaN(req.query.page) ? 1 : +req.query.page;
    const dateTo = isNaN(Date.parse(req.query.dateTo)) ? (new Date()).toISOString() : req.query.dateTo;

    let photos = PHOTOS.sort((a, b) => -a.createdOn.localeCompare(b.createdOn));

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

    res.json(response);
});

router.post("/photos", upload.single("photo"), async (req, res) => {
    const file = req.file;

    if (!file.mimetype.startsWith("image/")) {
        fs.unlink(file.path, (err) => {
            if (err) return handleError(err, res);

            res.status(403).json({error: "invalid_type", message: "Invalid file type. Only image files are allowed."});
        });
    }

    const hash = await imageHash.syncHash(file.path, 8, 'hex');
    const duplicateImage = PHOTOS.find((i) => i.hash === hash.hash);
    if (duplicateImage) {
        fs.unlink(file.path, (err) => {
            if (err) return handleError(err, res);

            res.status(403).json({error: "duplicate", message: "Error occurred. Duplicate images are not allowed."});
        });
    }

    const targetPath = path.join(__dirname, "../uploads/1", file.originalname);
    const targetDir = targetPath.substring(0, targetPath.lastIndexOf("\\"));
    const thumbnailDir = path.join(targetDir, '/thumbnail');

    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir);
    }

    if (!fs.existsSync(thumbnailDir)) {
        fs.mkdirSync(thumbnailDir);
    }

    fs.renameSync(file.path, targetPath);

    const thumbnail = await imageThumbnail(targetPath);

    fs.writeFileSync(path.join(thumbnailDir, file.originalname), thumbnail);

    res.status(200).json(PHOTOS[0]);
});

module.exports = router;