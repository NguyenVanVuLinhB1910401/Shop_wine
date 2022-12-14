const ApiError = require("../api-error");
const Nhanvien = require("../models/nhanvien.model");
const Sanpham = require("../models/sanpham.model");
const fs = require("fs");
const path = require("path");

exports.getAllProduct = async (req, res) => {
    try {
        
            const products = await Sanpham.find({dangban: 1,});
            return res.status(200).json({message: "Succcess", code: 1, products});
    } catch (err) {
        return res.status(200).json({message: err.message, code: 0});
    }
};
exports.getAllNewProduct = async (req, res) => {
    try {
        const products = await Sanpham.find({dangban: 1,moi: 1}).limit(4);
            return res.status(200).json({message: "Succcess", code: 1, products});
    } catch (err) {
        return res.status(200).json({message: err.message, code: 0});
    }
};
exports.getAllNoiBatProduct = async (req, res) => {
    try {
        const products = await Sanpham.find({dangban: 1,noibat: 1}).limit(4);
            return res.status(200).json({message: "Succcess", code: 1, products});
    } catch (err) {
        return res.status(200).json({message: err.message, code: 0});
    }
};

exports.getOneProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Sanpham.findById(id);
        //const data = products;
        return res.status(200).json({message: "Succcess", code: 1, product: product});
    } catch (err) {
        return res.status(404).json({message: err.message, code: 0});
    }

    
};

exports.getProductTheoLoai = async (req, res) => {
    const loai = req.params.loai;
    try {
        const product = await Sanpham.find({maloaisp: loai});
        //const data = products;
        return res.status(200).json({message: "Succcess", code: 1, product: product});
    } catch (err) {
        return res.status(404).json({message: err.message, code: 0});
    }

    
};

exports.addProduct = async (req, res) => {
    const product = req.body;
    product.image = req.file?.filename;
    //console.log(product);
    try {
        const sanpham = await Sanpham.create(product);
        return res.status(200).json({message: "Th??m s???n ph???m th??nh c??ng", code: 1, sanpham});
    } catch (err) {
        console.log(err);
        return res.status(200).json({message: "Th??m s???n ph???m th???t b???i", code: 0});
    }
};

exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    // return res.status(200).json({product: req.body});
    // console.log("product: "+id);
    //console.log(req.body);
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
    const newProduct = req.body;
    newProduct.image = new_image;
    try {
        const product = await Sanpham.findByIdAndUpdate(id, newProduct);
        return res.status(200).json({message: "C???p nh???t s???n ph???m th??nh c??ng", code: 1});
    } catch (error) {
        return res.status(404).json({message: error.message, code: 0});
    }
    //return res.status(200).json({message: "update category"});
};

exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const sanpham = await Sanpham.findById(id);
        //console.log(sanpham);
        fs.unlinkSync(path.join(__dirname, "../uploads/" + sanpham.image));
        await Sanpham.deleteOne({_id: id});
        const products = await  Sanpham.find();
        return res.status(200).json({message: "X??a s???n ph???m th??nh c??ng", code: 1,products: products});
    } catch (error) {
        return res.status(404).json({message: error.message, code: 0});
    }
    //return res.status(200).json({message: "Delete Product"});
    
};

