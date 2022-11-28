const express = require("express");
const router = express.Router();
const nhanvienController = require("../controllers/nhanvien.controller");
const path = require("path");
// const multer = require("multer");

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, "../uploads"));
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now()+ "_" + file.originalname)
//     }
// })
// const upload = multer({ storage: fileStorage});
router.get("/nv/allnhanvien", nhanvienController.getAllNhanVien);
router.get("/nv/nhanvien/:id", nhanvienController.getOneNhanVien);
router.post("/nv/addnhanvien", nhanvienController.createNhanVien);
router.put("/nv/nhanvien/update/:id", nhanvienController.updateNhanVien);
// router.delete("/nv/capbackh", capbacController.deleteAllCapBac);


module.exports = router;