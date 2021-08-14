const path = require("path");

const config = {
    imagePath: path.join(__dirname, "uploads"),
    tempImagePath: path.join(__dirname, "uploads/temp"),
    thumbnailPath: "thumbnail"
};

module.exports = config;