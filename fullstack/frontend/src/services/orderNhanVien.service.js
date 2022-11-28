import createApiClient from "./api.service";

class orderNhanVienService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    };
    async nhapKho(data) {
        return await this.api.post("/khosp", data);
    };
    async getAllDonHang() {
        return await this.api.get("/nhanvien/order");
    };
    async getAllDonHangChuaXuLy() {
        return await this.api.get("/nhanvien/order/chuaxuly");
    };
    async getAllDonHangDaXuLy() {
        return await this.api.get("/nhanvien/order/daxuly");
    };
    async getAllDonHangDangGiaoHang() {
        return await this.api.get("/nhanvien/order/danggiaohang");
    };
    async getAllDonHangDaGiaoHang() {
        return await this.api.get("/nhanvien/order/dagiaohang");
    };
    async getDetailDonHang(id) {
        return await this.api.get("/nhanvien/order/"+id);
    };
    async updateTrangThai(id, data) {
        return await this.api.put("/nhanvien/order/" + id, data);
    };
    async deleteKho(id) {
        return await this.api.delete("/khosp/" + id);
    };
}
export default new orderNhanVienService();