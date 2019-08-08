const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();


cloudinary.config({
    cloud_name: 'dnoe6suxi',
    api_key: '742314183214933',
    api_secret: '_fTNi24osMIhWLQepfG4B2_Phyc'
 })

var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'viahappy', // The name of the folder in cloudinary
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
        cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
    }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;