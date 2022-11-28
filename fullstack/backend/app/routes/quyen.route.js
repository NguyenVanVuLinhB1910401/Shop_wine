const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const quyenController = require("../controllers/quyen.controller");

router.get('/nv/allquyen', quyenController.getAllQuyen);
router.post("/nv/quyen/add", quyenController.createQuyen);

// router.post("/nv/themshipper", shipperController.createShipper);
// router.delete('/nv/shipper/:id', shipperController.deleteOneShipper);
// router.get('/nv/shippers', shipperController.getAllShipper);
// router.get('/nv/shipper/donhang', shipperController.getAllDonHang);
// router.get('/nv/shipper/donhangdanggiao/:id', shipperController.getAllDonHangDangGiao);
// router.get('/nv/shipper/donhangdagiao/:id', shipperController.getAllDonHangDaGiao);
// router.put('/nv/shipper/nhandon/:id', shipperController.nhanDon);
module.exports = router; 