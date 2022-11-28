
import authNhanVien from "../../../services/authNhanVien.service";
import productNhanVienService from "../../../services/productNhanVien.service";
import loaiNhanVienService from "../../../services/loaiNhanVien.service";
import nhaCungCapService from "../../../services/nhaCungCap.service";
import khoService from "../../../services/kho.service";
import orderNhanVienService from "../../../services/orderNhanVien.service";
const state = {
    nhanvien: null,
    products: [],
    product: [],
    loai: null,
    kho: null,
    ncc: null,
    donhang: [],

};
const mutations = {
    SET_NHANVIEN(state, data){
        state.nhanvien = data;
    },
    UPDATE_PRODUCTS(state, data){
        state.products = data;
    },
    UPDATE_PRODUCT(state, data){
        state.product = data;
    },
    UPDATE_LOAI(state, data){
        state.loai = data;
    },
    UPDATE_NCC(state, data){
        state.ncc = data;
    },
    UPDATE_KHO(state, data){
        state.kho = data;
    },
    UPDATE_DONHANG(state, data){
        state.donhang = data;
    },
    
};
const actions = {
    async nhanVienDangNhap({commit}, data){
        const respone = await authNhanVien.nhanVienDangNhap(data);
        if(respone.data.code == 1) {
            sessionStorage.setItem('token', respone.data.token);
            sessionStorage.setItem('id', respone.data.id);
            sessionStorage.setItem('role', respone.data.role);
            sessionStorage.setItem('taikhoan', respone.data.taikhoan);
            sessionStorage.setItem('isLogin', true)
            commit('SET_NHANVIEN', respone.data);
            return respone.data;
        }
        
        
    },
    async getNhanVien({commit}){
        const respone = await authNhanVien.getUser();
        commit('SET_NHANVIEN', respone.data);
        return respone.data;
    },
    async getProducts({commit}, id){
        const respone = await productNhanVienService.getProducts();
        commit('UPDATE_PRODUCTS', respone.data.products);
    },
    
    async getAllLoai({commit}){
        const respone = await loaiNhanVienService.getAllCategory();
        commit('UPDATE_LOAI', respone.data.loai);
    },
    async getOneLoai({commit}, id){
        const respone = await loaiNhanVienService.getOneCategory(id);
        commit('UPDATE_LOAI', respone.data.loai);
        return respone.data;
    },
    async themLoai({commit}, loai){
        //console.log(loai);
        const respone = await loaiNhanVienService.addCategory(loai);
        return respone.data;
        //console.log(respone);
    },
    async updateLoai({commit}, {id, loai}){
        //console.log(loai);
        const respone = await loaiNhanVienService.updateLoai(id, loai);
        return respone.data;
        //console.log(respone);
    },
    async deleteLoai({commit}, id) {
        const respone = await loaiNhanVienService.deleteLoai(id);
        commit('UPDATE_LOAI', respone.data.category);
        return respone;
    },
    async deleteProduct({commit}, id) {
        const respone = await productNhanVienService.deleteProduct(id);
        commit('UPDATE_PRODUCTS', respone.data.products);
        return respone;
    },
    async getAllNhaCungCap({commit}){
        const respone = await nhaCungCapService.getAllNhaCungCap();
        commit('UPDATE_NCC', respone.data.ncc);
    },
    async deleteNhaCungCap({commit}, id) {
        const respone = await nhaCungCapService.deleteNhaCungCap(id);
        commit('UPDATE_NCC', respone.data.ncc);
        return respone;
    },
    async getAllKho({commit}){
        const  respone = await khoService.getAllKho();
        commit('UPDATE_KHO', respone.data.kho);
        return respone;
    },
    async deleteKho({commit}, id) {
        const respone = await khoService.deleteKho(id);
        commit('UPDATE_KHO', respone.data.kho);
    },
    async getAllDonHang({commit}){
        const  respone = await orderNhanVienService.getAllDonHang();
        commit('UPDATE_DONHANG', respone.data.donhang);
        return respone;
    },
    async getAllDonHangChuaXuLy({commit}){
        const  respone = await orderNhanVienService.getAllDonHangChuaXuLy();
        commit('UPDATE_DONHANG', respone.data.donhang);
        return respone;
    },
    async getAllDonHangDaXuLy({commit}){
        const  respone = await orderNhanVienService.getAllDonHangDaXuLy();
        commit('UPDATE_DONHANG', respone.data.donhang);
        return respone;
    },
    async getAllDonHangDangGiaoHang({commit}){
        const  respone = await orderNhanVienService.getAllDonHangDangGiaoHang();
        commit('UPDATE_DONHANG', respone.data.donhang);
        return respone;
    },
    async getAllDonHangDaGiaoHang({commit}){
        const  respone = await orderNhanVienService.getAllDonHangDaGiaoHang();
        commit('UPDATE_DONHANG', respone.data.donhang);
        return respone;
    },
    async updateTrangThai({commit},{id, data}){
        const respone = await orderNhanVienService.updateTrangThai(id, data);
        commit('UPDATE_DONHANG', respone.data.donhang);
        return respone;
    }


};
const getters = {
    nhanvien: state => state.nhanvien,
    products: state => state.products,
    loai: state => state.loai,
    ncc: state => state.ncc,
    kho: state => state.kho,
    donhang: state => state.donhang,

};
const nhanvienModule = {
    state,
    mutations,
    actions,
    getters
}
export default nhanvienModule;