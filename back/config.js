const path = require("path");

const config = {
    imagePath: path.join(__dirname, "uploads"),
    tempImagePath: path.join(__dirname, "uploads/temp"),
    thumbnailRelativePath: "/thumbnail"
};

module.exports = config;