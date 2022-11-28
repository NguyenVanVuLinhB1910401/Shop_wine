const Khachhang = require("../models/khachhang.model");
const Donhang = require("../models/donhang.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')


exports.getAllKhachHangTongTien = async (req, res) => {
    try {
        
        
        const result = await Donhang.aggregate([
            {
                $match: {
                    trangthai: 'Đã hoàn thành',
                }
            },
            {
                $group: {
                    _id: "$taikhoan",
                    count: { $sum: '$tongtien'}
                },
            },
            // {
            //     $lookup: {
            //         from: "Khachhang",
            //         localField: "taikhoan",
            //         foreignField: "taikhoan",
            //         as: "khachhang"
            //     }
            // }
        ]);
        // const result = await Donhang.find({
        //     trangthai: "Đã hoàn thành"
        // })
        //return res.status(200).json({ khachhang: result, code: 1});
        //console.log(typeof(result))
        const chitiet= Object.values(result);
        //console.log(typeof(chitiet));
        //console.log(chitiet)
        for(let i=0; i < chitiet.length; i++){
            chitiet[i].thongtin = await Khachhang.findOne({taikhoan: chitiet[i]._id});
        }
        
        return res.status(200).json({ khachhang: chitiet, code: 1});
    } catch (e) {
        return res.status(400).json({ message: e.message, code: 0});
    }
}

exports.getAllKhachHang = async (req, res) => {
    try {
        
        const kh = await Khachhang.find({}).populate('id_capbac');
        return res.status(200).json({ khachhang: kh, code: 1});
    } catch (e) {
        return res.status(400).json({ message: e.message, code: 0});
    }
}
exports.filterKH = async (req, res) => {
    try {
        if(req.params.id == "all"){
            const kh = await Khachhang.find().populate('id_capbac');
            return res.status(200).json({ khachhang: kh, code: 1});
        }else{
            const kh = await Khachhang.find({id_capbac: req.params.id}).populate('id_capbac');
            return res.status(200).json({ khachhang: kh, code: 1});
        }
       
    } catch (e) {
        return res.status(400).json({ message: e.message, code: 0});
    }
}

exports.nangCapKhachHang = async (req, res) => {
    const dsKH = req.body.dsKH;
    const idCapBac = req.body.idCapBac;
    // console.log(dsKH)
    // console.log(idCapBac)
    try {
        for(let i=0;i<dsKH.length;i++){
            await Khachhang.findByIdAndUpdate(dsKH[i].thongtin._id,{id_capbac: idCapBac});
        }
        
        return res.status(200).json({message: "Nâng cấp thành công", code: 1});
    } catch (error) {
        return res.status(404).json({message: error.message, code: 0});
    }
    //return res.status(200).json({message: "update category"});
};
// exports.getAllDonHangDangGiao = async (req, res) => {
//     try {
        
//         const dh = await Donhang.find({shipper: req.params.id, trangthai: "Đang giao hàng",});
//         return res.status(200).json({ dh: dh, code: 1,  message: "Các đơn hàng đang giao"});
//     } catch (e) {
//         return res.status(400).json({ message: e.message, code: 0});
//     }
// }
// exports.getAllDonHangDaGiao = async (req, res) => {
//     try {
//         const dh = await Donhang.find({trangthai: "Đã hoàn thành", shipper: req.params.id, });
//         return res.status(200).json({dh: dh, code: 1, message: "Các đơn hàng đã giao"});
//     } catch (e) {
//         return res.status(400).json({ message: e.message, code: 0});
//     }
// }
// exports.nhanDon = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const updateDH = await Donhang.findByIdAndUpdate(id, req.body);
//         return res.status(200).json({message: "Nhận đơn thành công", code: 1,});
        
//         //return res.status(200).json({message: "Add to cart thành công", code: 1, sp: document});
//     } catch (err) {
//         console.log(err);
//         return res.status(401).json({message: "Nhận đơn thất bại", code: 0});
//     }
// };
// exports.deleteOneShipper = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const shippers = await Nhanvien.deleteOne({_id: id});
//         return res.status(200).json({ message: "Xóa thành công", shippers: shippers, code: 1});
//     } catch (e) {
//         return res.status(400).json({ message: e.message, code: 0});
//     }
// }
