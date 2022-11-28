import createApiClient from "./api.service";

class cartKhachHangService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    };
    async addCart(data) {
        return await this.api.post("/khachhang/cart", data);
    };
    async getCart(taikhoan) {
        return await this.api.get("/khachhang/cart/"+taikhoan);
    };
    // async getOneProduct(id) {
    //     return await this.api.get("/products/" + id);
    // };
    // async updateProduct(id, data) {
    //     return await this.api.put("/products/" + id, data);
    // };
    async deleteCartItem(id) {
        return await this.api.delete("/khachhang/cart/" + id);
    };

    // async getAllLoai() {
    //     return await this.api.get("/nv/loaisp");
    // }
}


export default new cartKhachHangService();