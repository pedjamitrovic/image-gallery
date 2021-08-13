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
];

router.get('/photos', function (req, res, next) {
    res.json(photos);
});

module.exports = router;