const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.resolve(__dirname, "../uploads");

console.log("UPLOAD PATH =", uploadPath);

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        console.log("Destination =", uploadPath);
        console.log("Folder exists =", fs.existsSync(uploadPath));
        cb(null, uploadPath);
    },

    filename(req, file, cb) {
        const filename = Date.now() + path.extname(file.originalname);
        console.log("Filename =", filename);
        cb(null, filename);
    }
});

module.exports = multer({ storage });