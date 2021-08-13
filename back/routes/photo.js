const express = require('express');
const router = express.Router();

const photos = [
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', path: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', thumbnailPath: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
];

router.get('/photos', (req, res, next) => {
    const pageSize = isNaN(req.query.pageSize) ? 10 : +req.query.pageSize;
    const page = isNaN(req.query.page) ? 1 : +req.query.page;

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

module.exports = router;