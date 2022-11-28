import createApiClient from "./api.service";
import router from "../router/index"
class shipperService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    };
    // async addShipper(data) {
    //     return (await this.api.post("/nv/themshipper", data));
    // };
    async getAllKhachHang() {
        return await this.api.get("/nv/allkhachhang");
    };
    async getAllKhachHangTongTien() {
        return await this.api.get("/nv/khachhangtongtien");
    };
    async nangCapKH(data) {
        return await this.api.put("/nv/nangcapkh",data);
    };
    async filterKH(id) {
        return await this.api.get("/nv/khachhang/filter/"+id);
    }
    // async getAllDonHangDaGiao(id) {
    //     return await this.api.get("/nv/shipper/donhangdagiao/"+id);
    // };
    // async nhanDon(id, data) {
    //     return await this.api.put("/nv/shipper/nhandon/"+ id, data);
    // };
    // async deleteOneShipper(id) {
    //     return await this.api.delete("/nv/shipper/"+id);
    // };

}


export default new shipperService();
