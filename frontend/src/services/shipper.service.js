import createApiClient from "./api.service";

class shipperService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    };
    async addShipper(data) {
        return (await this.api.post("/nv/themshipper", data));
    };
    async getAllShipper() {
        return await this.api.get("/nv/shippers");
    };
    async getAllDonHang() {
        return await this.api.get("/nv/shipper/donhang");
    };
    async getAllDonHangDangGiao(id) {
        return await this.api.get("/nv/shipper/donhangdanggiao/"+id);
    };
    async getAllDonHangDaGiao(id) {
        return await this.api.get("/nv/shipper/donhangdagiao/"+id);
    };
    async nhanDon(id, data) {
        return await this.api.put("/nv/shipper/nhandon/"+ id, data);
    };
    async deleteOneShipper(id) {
        return await this.api.delete("/nv/shipper/"+id);
    };

}


export default new shipperService();
