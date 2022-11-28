const mongoose = require("mongoose");

const khachhangSchema = new mongoose.Schema({
    hoten: {
        type: String,
        
    },
    taikhoan: {
        type: String,
        required: true,
        unique: true,
    },
    matkhau: {
        type: String,
        
    },
    email: {
        type: String, 
    },
    sdt: {
        type: String, 
    },
    diachi: {
        type: String, 
    },
    id_capbac: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Capbac'
    },
    quyen: {
        type: Number, 
        default: 1
    },
    createAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Khachhang", khachhangSchema);