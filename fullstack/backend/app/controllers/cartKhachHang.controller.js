const ApiError = require("../api-error");
const Cart = require("../models/cart.model");

exports.getCart = async (req, res) => {

    try {
        const cart = await Cart.find({taikhoan: req.params.taikhoan}).populate('id_sp');
        //const data = products;
        return res.status(200).json({message: "Succcess", code: 1, cart: cart});
    } catch (err) {
        return res.status(401).json({message: err.message, code: 0});
    }
};


exports.addCart = async (req, res) => {
    const cart = req.body;   
   
    try {
        const find = await Cart.findOne({id_sp: cart.id_sp, taikhoan: cart.taikhoan});
        //console.log(find);
        if(find){
            
            if(cart.soluong == undefined){
                cart.soluong = parseInt(find.soluong) + 1;
            }else{
                cart.soluong = parseInt(find.soluong) + cart.soluong;
            }
            const result = await Cart.findByIdAndUpdate(find._id, cart);
            const document = await Cart.find({taikhoan: cart.taikhoan});
            return res.status(200).json({message: "Add to cart thành công", code: 1, sp: document});
        }else{
            //console.log("Tim ko thay: "+cart.soluong);
            if(cart.soluong == undefined){
                cart.soluong = 1;
            }
            
            //console.log("Không có trong giỏ hàng:" + cart.soluong);
            const result = await Cart.create(cart);
            const document = await Cart.find({taikhoan: cart.taikhoan});
            return res.status(200).json({message: "Add to cart thành công", code: 1, sp: document});
        }
        //return res.status(200).json({message: "Add to cart thành công", code: 1, sp: document});
    } catch (err) {
        console.log(err);
        return res.status(401).json({message: "Add to cart thất bại", code: 0});
    }
};



exports.deleteCartItem = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Cart.deleteOne({_id: id});
        return res.status(200).json({message: "Xóa thành công", code: 1});
    } catch (error) {
        return res.status(404).json({message: error.message, code: 0});
    }
    
};




