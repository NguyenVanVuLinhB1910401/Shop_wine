import createApiClient from "./api.service";

class nhanVienService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    };
    async addNhanVien(data) {
        return await this.api.post("/nv/addnhanvien", data);
    };
    async getAllNhanVien() {
        return await this.api.get("/nv/allnhanvien");
    };
    async getOneNhanVien(id) {
        return await this.api.get("/nv/nhanvien/"+id);
    };
    async updateNhanVien(id, data) {
        return await this.api.put("/nv/nhanvien/update/" + id, data);
    };
    // async getOneCategory(id) {
    //     return await this.api.get("/nv/loaisp/"+id);
    // };
    
    async deleteAllCapBac() {
        return await this.api.delete("/nv/capbackh");
    };
}
export default new nhanVienService();