const Quyen = require("../models/quyen.model");
const Donhang = require("../models/donhang.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.createQuyen = async (req, res) => {
    
    try{
        data = await Quyen.create(req.body);
        //console.log(data);
        return res.status(200).json({message: "Thêm quyền thành công", code: 1});
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({ message: error.message});
    }
    
}
exports.getAllQuyen = async (req, res) => {
    try {
        
        const document = await Quyen.find({});
        return res.status(200).json({ quyen: document, code: 1});
    } catch (e) {
        return res.status(400).json({ message: e.message, code: 0});
    }
}
