import createApiClient from "./api.service";

class loaiNhanVienService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    };
    async addCategory(data) {
        return await this.api.post("/nv/loaisp/add", data);
    };
    async getAllCategory() {
        return await this.api.get("/nv/loaisp");
    };
    async getOneCategory(id) {
        return await this.api.get("/nv/loaisp/"+id);
    };
    async updateLoai(id, data) {
        return await this.api.put("/nv/loaisp/" + id, data);
    };
    async deleteLoai(id) {
        return await this.api.delete("/nv/loaisp/" + id);
    };
}
export default new loaiNhanVienService();