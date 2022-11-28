import createApiClient from "./api.service";

class khoService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    };
    async nhapKho(data) {
        return await this.api.post("/khosp", data);
    };
    async getAllKho() {
        return await this.api.get("/khosp");
    };
    async getOneKho(id) {
        return await this.api.get("/khosp/"+id);
    };
    async updateKho(id, data) {
        return await this.api.put("/khosp/" + id, data);
    };
    async deleteKho(id) {
        return await this.api.delete("/khosp/" + id);
    };
}
export default new khoService();