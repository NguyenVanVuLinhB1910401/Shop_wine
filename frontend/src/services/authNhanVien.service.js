import createApiClient from "./api.service";

class authNhanVienService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    };
    async nhanVienDangNhap(data) {
        return (await this.api.post("/nv/login", data));
    };
    async getUser() {
        return await this.api.get("/nv/user");
    };
    async logout() {
        return await this.api.post("/nv/logout");
    };
}


export default new authNhanVienService();