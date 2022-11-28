const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authNhanVienController = require("../controllers/authNhanVien.controller");
const path = require("path");
const multer = require("multer");

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, req.body.hoten +"_"+ Date.now()+"_" + file.originalname);
    }
})
const upload = multer({ storage: fileStorage});


router.post("/nv/create", upload.single('image'), authNhanVienController.createNhanVien);
router.post("/nv/login", authNhanVienController.login);
router.post('/nv/logout', authNhanVienController.logout);
router.get('/nv/user', authNhanVienController.getNhanVien);

module.exports = router; 