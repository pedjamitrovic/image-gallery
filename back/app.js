const express = require('express');

const gallery = require('./routes/gallery');
const file = require('./routes/file');

const app = express();

app.use(
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    }
);

app.use('/gallery/v1', gallery);
app.use('/file/v1', file);

app.listen(3000, () => { console.log('App listening on port 3000!'); });

module.exports = app;