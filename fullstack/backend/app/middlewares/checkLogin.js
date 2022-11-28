const Nhanvien = require("../models/nhanvien.model");
const jwt = require("jsonwebtoken");

exports.checkLoginAdmin = async (req, res, next) => {
    //console.log(req.url)
    try {
        // const cookie = req.cookies['jwt'];
        // const claims = jwt.verify(cookie, 'secret');
        
        const token = req.headers['token'];
        const claims = jwt.verify(token, 'secret');
        //console.log(req.url);
        if(!claims) {
            return res.status(200).json({ message: "unauthenticated", code: 0});
        }
        const user = await Nhanvien.findOne({_id: claims._id});
        //console.log(user)
        if(user) { 
            next();
        }
    } catch (e) {
        return res.status(200).json({ message: "Chưa đăng nhập", code: 0});
    }
}