const ApiError = require("../api-error");
const Capbac = require("../models/capbac.model");
const fs = require("fs");
const path = require("path");
const { nextTick } = require("process");
exports.getAllCapBac = async (req, res) => {
    try {
        const document = await Capbac.find();
        return res.status(200).json({message: "Succcess", code: 1,capbac: document});
    } catch (err) {
        return res.status(200).json({message: err.message, code: 0});
    }
};

// exports.getOneCategory = async (req, res) => {

//     try {
//         const loai = await Loai.findById(req.params.id);
//         //const data = products;
//         return res.status(200).json({message: "Succcess", code: 1,loai: loai});
//     } catch (err) {
//         return res.status(404).json({message: err.message, code: 0});
//     }
// };

exports.addCapBac = async (req, res, next) => {
    const cb = req.body;
    try {
        //console.log(loai.tenloaisp);
        const checkCB = await Capbac.find({tencapbac: cb.tencapbac});
        if(checkCB.length > 0) {
            return res.status(200).json({message: "Tên cấp bậc đã tồn tại", code: 0});
        } 
        const document = await Capbac.create(cb);
        return res.status(200).json({message: "Thêm cấp bậc thành công", code: 1});
    } catch (err) {
        console.log(err);
        return next(new ApiError(400, "Add Cấp Bậc"));
    }
};

exports.updateCategory = async (req, res) => {
    const id = req.params.id;
    // console.log(req.body);
    //console.log(id);
    let new_image = "";
    if(req.file) {
        new_image = req.file.filename;
        try {
            fs.unlinkSync(path.join(__dirname, "../uploads/" + req.body.old_image));
        } catch (error) {
            console.log(error);
        }
    }else {
        new_image = req.body.old_image;
    }
    const newCategory = req.body;
    newCategory.image = new_image;
    try {
        await Loai.findByIdAndUpdate(id, newCategory);
        return res.status(200).json({message: "Update thành công", code: 1});
    } catch (error) {
        return res.status(404).json({message: error.message, code: 0});
    }
    //return res.status(200).json({message: "update category"});
};

exports.deleteAllCapBac= async (req, res) => {
    try {
        document = await Capbac.deleteMany({});
        return res.status(200).json({message: "Xóa thành công", code: 1, document});
    } catch (error) {
        return res.status(404).json({message: error.message, code: 0});
    }
    
};

