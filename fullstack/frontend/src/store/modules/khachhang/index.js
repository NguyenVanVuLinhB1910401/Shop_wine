import authKhachHangService from "../../../services/authKhachHang.service";
import cartKhachHangService from "../../../services/cartKhachHang.service";
import orderNhanVienService from "../../../services/orderNhanVien.service";
import productKhachHangService from "../../../services/productKhachHang.service";
import thanhToanService from "../../../services/thanhToan.service";

const state = {
    khachhang: null,
    sanpham: null,
    cart: [],
    caterogies: [],
    lichsudathang: [],

};
const mutations = {
    SET_KHACHHANG(state, data){
        state.khachhang = data;
    },
    UPDATE_SANPHAM(state, data){
        state.sanpham = data;
    },
    UPDATE_CATEGORIES(state, data){
        state.caterogies = data;
    },
    UPDATE_CART(state, data){
        state.cart = data;
    },
    UPDATE_LICHSUDATHANG(state, data){
        state.lichsudathang = data;
    },


};
const actions = {
    async KH_Login({commit}, data){
        const respone = await authKhachHangService.KhachHangDangNhap(data);
        console.log(respone)
        if(respone.data.code == 1){
            commit('SET_KHACHHANG', respone.data);
            sessionStorage.setItem('token', respone.data.token);
            sessionStorage.setItem('id_KH', respone.data.id);
            sessionStorage.setItem('isLogin', true);
            sessionStorage.setItem('taikhoan', respone.data.taikhoan);
            //localStorage.setItem('taikhoan', )
        }
        return respone;
        
    },
    async getKH({commit}){
            const respone = await authKhachHangService.getKhachHang();
            commit('SET_KHACHHANG', respone.data);
            return respone; 
    },
    async getAllSanPham({commit}){
        const respone = await productKhachHangService.getProducts();
        if(respone.data.code == 1){
            commit('UPDATE_SANPHAM', respone.data.products);
        }
        return respone;
    },
    async getAllSanPhamTheoLoai({commit}, loai){
        const respone = await productKhachHangService.getProductTheoLoai(loai);
        if(respone.data.code == 1){
            commit('UPDATE_SANPHAM', respone.data.product);
        }
        return respone;
    },
    async getAllCategories({commit}){
        const respone = await productKhachHangService.getAllLoai();
        if(respone.data.code == 1){
            commit('UPDATE_CATEGORIES', respone.data.loai);
        }
        return respone;
    },
    async addToCart({commit}, data){
        const respone = await cartKhachHangService.addCart(data);
        if(respone.data.code == 1){
            commit('UPDATE_CART', respone.data.sp);
        }
        return respone;
    },
    async getCart({commit}, taikhoan){
        const respone = await cartKhachHangService.getCart(taikhoan);
        //console.log("Lỗi");
        if(respone.data.code == 1){
            commit('UPDATE_CART', respone.data.cart);
        }
        return respone;
    },
    async deleteCartItem({commit}, id){
        const respone = await cartKhachHangService.deleteCartItem(id);
        const getCart = await cartKhachHangService.getCart(sessionStorage.getItem('taikhoan'));
        commit('UPDATE_CART', getCart.data.cart);
    },
    async lichSuDatHang({commit}, taikhoan){
        const getLichSuDH = await thanhToanService.lichSuDatHang(taikhoan);
        //console.log(getLichSuDH);
        commit('UPDATE_LICHSUDATHANG', getLichSuDH.data.donhang);
    },
    async huyDonHang({commit},{data}){
        const respone = await thanhToanService.huyDonHang(data);
        return respone;
    }

};
const getters = {
    khachhang: state => state.khachhang,
    sanpham: state => state.sanpham,
    caterogies: state => state.caterogies,
    cart: state => {
        return state.cart;
    },
    cartTotal: state => {
        return state.cart.reduce((acc, cartItem) => {
            return (cartItem.soluong * cartItem.id_sp.giakm) + acc;
        }, 0);
    },
    countCartItem: state => state.cart.length,
    lichsudathang: state => state.lichsudathang,
};
const khachhangModule = {
    state,
    mutations,
    actions,
    getters
}
export default khachhangModule;