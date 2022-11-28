import createApiClient from "./api.service";

class thanhToanService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    };
    async thanhToan(data) {
        return await this.api.post("/khachhang/thanhtoan", data);
    };
    async huyDonHang(data) {
        return await this.api.post("/khachhang/huydh", data);
    };
    async lichSuDatHang(taikhoan) {
        return await this.api.get("/khachhang/lichsudathang/"+taikhoan);
    };
    async chiTietDonHang(id) {
        return await this.api.get("/khachhang/chitietdonhang/"+id);
    };
    // async getOneProduct(id) {
    //     return await this.api.get("/products/" + id);
    // };
    // async updateProduct(id, data) {
    //     return await this.api.put("/products/" + id, data);
    // };
    // async deleteCartItem(id) {
    //     return await this.api.delete("/khachhang/cart/" + id);
    // };

    // async getAllLoai() {
    //     return await this.api.get("/nv/loaisp");
    // }
}


export default new thanhToanService();