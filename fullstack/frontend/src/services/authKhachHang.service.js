import createApiClient from "./api.service";

class authKhachHangService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    };
    async KhachHangDangNhap(data) {
        return (await this.api.post("/khachhang/login", data));
    };
    async KhachHangDangKy(data) {
        return (await this.api.post("/khachhang/register", data));
    };
    async getKhachHang() {
        return await this.api.get("/khachhang/user");
    };
    async logout() {
        return await this.api.post("/khachhang/logout");
    };
}


export default new authKhachHangService();