import createApiClient from "./api.service";

class productNhanVienService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    };
    async addProduct(data) {
        return await this.api.post("/products/add", data);
    };
    async getProducts() {
        return await this.api.get("/products/");
    };
    async getOneProduct(id) {
        return await this.api.get("/products/" + id);
    };
    async updateProduct(id, data) {
        return await this.api.put("/products/" + id, data);
    };
    async deleteProduct(id) {
        return await this.api.delete("/products/" + id);
    };
}


export default new productNhanVienService();