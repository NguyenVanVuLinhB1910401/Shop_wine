const express = require("express");
const router = express.Router();
const capbacController = require("../controllers/capbac.controller");
const path = require("path");

const Nhanvien = require("../models/nhanvien.model");
const jwt = require("jsonwebtoken");


router.get("/nv/capbackh", capbacController.getAllCapBac);
// router.get("/nv/loaisp/:id", loaiNhanVienController.getOneCategory);
router.post("/nv/capbackh/add", capbacController.addCapBac);
// router.put("/nv/loaisp/:id", upload.single("image"), loaiNhanVienController.updateCategory);
router.delete("/nv/capbackh", capbacController.deleteAllCapBac);


module.exports = router;