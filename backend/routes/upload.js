const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.resolve(__dirname, "../uploads");

console.log("UPLOAD PATH =", uploadPath);
console.log("__dirname =", __dirname);

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        console.log("Saving to:", uploadPath);
        cb(null, uploadPath);
    },

    filename(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

module.exports = multer({ storage });