import createApiClient from "./api.service";

class nhaCungCapService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    };
    async addNhaCungCap(data) {
        return await this.api.post("/nhacungcap", data);
    };
    async getAllNhaCungCap() {
        return await this.api.get("/nhacungcap");
    };
    async getOneNhaCungCap(id) {
        return await this.api.get("/nhacungcap/"+id);
    };
    async updateNhaCungCap(id, data) {
        return await this.api.put("/nhacungcap/" + id, data);
    };
    async deleteNhaCungCap(id) {
        return await this.api.delete("/nhacungcap/" + id);
    };
}
export default new nhaCungCapService();