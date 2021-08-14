const express = require('express');
const router = express.Router();

const PHOTOS = [
    { name: 'MyImage.jpg', createdOn: '2021-08-14T06:48:19.424Z', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', createdOn: '2021-08-14T06:48:19.424Z', path: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', thumbnailPath: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
    { name: 'MyImage.jpg', createdOn: '2021-08-14T06:48:19.424Z', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', createdOn: '2021-08-14T06:48:19.424Z', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', createdOn: '2021-08-14T06:48:19.424Z', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', createdOn: '2021-08-14T06:48:19.424Z', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', createdOn: '2021-08-14T06:48:19.424Z', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', createdOn: '2021-08-14T06:48:19.424Z', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', createdOn: '2021-08-14T06:48:19.424Z', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', createdOn: '2021-08-14T10:48:19.424Z', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', createdOn: '2021-08-14T10:48:19.424Z', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', createdOn: '2021-08-14T10:48:19.424Z', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
    { name: 'MyImage.jpg', createdOn: '2021-08-14T10:48:19.424Z', path: 'https://wallpapercave.com/wp/wp2559551.jpg', thumbnailPath: 'https://wallpapercave.com/wp/wp2559551.jpg' },
];

router.get('/photos', (req, res, next) => {
    const pageSize = isNaN(req.query.pageSize) ? 10 : +req.query.pageSize;
    const page = isNaN(req.query.page) ? 1 : +req.query.page;
    const dateTo = isNaN(Date.parse(req.query.dateTo)) ? (new Date()).toISOString() : req.query.dateTo;

    console.log(dateTo)

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

module.exports = router;