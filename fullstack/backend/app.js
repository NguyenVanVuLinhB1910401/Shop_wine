const express = require('express');
const middleware = require('./app/middlewares/checkLogin');

const authNhanVienRouter = require("./app/routes/authNhanVien.route");
const productNhanVienRouter = require("./app/routes/productNhanVien.route");
const loaiNhanVienRouter = require("./app/routes/loaiNhanVien.route");
const nhaCungCapRouter = require("./app/routes/nhaCungCap.route");
const khoRouter = require("./app/routes/kho.route");
const orderNhanVienRouter = require("./app/routes/orderNhanVien.route");

const nhanvienRouter = require("./app/routes/nhanvien.route");
const shipperRouter = require("./app/routes/shipper.route");
const khachhangRouter = require("./app/routes/khachhang.route");
const capbacKHRouter = require("./app/routes/capbac.route");
const quyenRouter = require("./app/routes/quyen.route");

//Khách hàng
const authKhachHangRouter = require("./app/routes/authKhachHang.route");
const productKhachHangRouter = require("./app/routes/productKhachHang.route");
const cartKhachHangRouter = require("./app/routes/cartKhachHang.route");
const thanhToanRouter = require("./app/routes/thanhToan.route");

const ApiError = require("./app/api-error");
const cors = require("cors");
var cookieParser = require('cookie-parser');


const app = express()
app.use(cors({
    origin: [
        "http://localhost:3001",
        "http://localhost:3000",
      ],
    credentials: true,
    // exposedHeaders: ["set-cookie"],
  }));
app.use(cookieParser())
app.use(express.json());
app.use(express.static(__dirname+"/app/uploads"));

app.use("/api", authKhachHangRouter);
app.use("/api", authNhanVienRouter);

//Khách Hàng

app.use("/api", productKhachHangRouter);
app.use("/api", cartKhachHangRouter);
app.use("/api", thanhToanRouter);
app.use("/api", loaiNhanVienRouter);



app.use("/api", middleware.checkLoginAdmin, orderNhanVienRouter);
app.use("/api", middleware.checkLoginAdmin, shipperRouter);
app.use("/api", middleware.checkLoginAdmin, productNhanVienRouter);
app.use("/api", middleware.checkLoginAdmin, nhaCungCapRouter);
app.use("/api", middleware.checkLoginAdmin, khoRouter);
app.use("/api", middleware.checkLoginAdmin, khachhangRouter);
app.use("/api", middleware.checkLoginAdmin, capbacKHRouter);
app.use("/api", middleware.checkLoginAdmin, nhanvienRouter);
//app.use("/api", quyenRouter);

// handle 404 response
app.use((req, res, next) => {
    // Code o day se chay khi khong co route duoc dinh nghia nao khop voi yeu cau. Goi next() de chuyen sang middleware xu ly loi
    return next(new ApiError(404, "resource not found"));
});

// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    // Middleware xử lý lỗi tập trung.
    // Trong các đoạn code xử lý ở các route, gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    });
});
    
module.exports = app;