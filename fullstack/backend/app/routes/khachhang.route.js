const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const khachhangController = require("../controllers/khachhang.controller");
const middleware = require("../middlewares/checkLogin");

// const path = require("path");
// const multer = require("multer");

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, "../uploads"));
//     },
//     filename: (req, file, cb) => {
//         cb(null, req.body.hoten +"_"+ Date.now()+"_" + file.originalname);
//     }
// })
// const upload = multer({ storage: fileStorage});


// router.post("/nv/themshipper", shipperController.createShipper);
// router.delete('/nv/shipper/:id', shipperController.deleteOneShipper);
router.get('/nv/khachhangtongtien', khachhangController.getAllKhachHangTongTien);
router.get('/nv/allkhachhang', khachhangController.getAllKhachHang);
router.get('/nv/khachhang/filter/:id', khachhangController.filterKH);
// router.get('/nv/shipper/donhangdagiao/:id', shipperController.getAllDonHangDaGiao);
router.put('/nv/nangcapkh', khachhangController.nangCapKhachHang);
module.exports = router; 