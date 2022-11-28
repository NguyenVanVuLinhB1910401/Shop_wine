import createApiClient from "./api.service";

class capBacKHService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    };
    async addCapBacKH(data) {
        return await this.api.post("/nv/capbackh/add", data);
    };
    async getAllCapBac() {
        return await this.api.get("/nv/capbackh");
    };
    // async getOneCategory(id) {
    //     return await this.api.get("/nv/loaisp/"+id);
    // };
    // async updateLoai(id, data) {
    //     return await this.api.put("/nv/loaisp/" + id, data);
    // };
    async deleteAllCapBac() {
        return await this.api.delete("/nv/capbackh");
    };
}
export default new capBacKHService();