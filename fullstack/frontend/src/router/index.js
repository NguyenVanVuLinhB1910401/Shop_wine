import { createWebHistory, createRouter } from 'vue-router';
import AdminLogin from '@/views/Admin/Login.vue';
import AdminHome from '@/views/Admin/AdminHome.vue';

import AdminCategory from '@/views/Admin/AdminCategory.vue';
import AddCategory from '@/views/Admin/AddCategory.vue';
import EditCategory from '@/views/Admin/EditCategory.vue';

import AdminProduct from '@/views/Admin/AdminProduct.vue';
import AddProduct from '@/views/Admin/AddProduct.vue';
import EditProduct from '@/views/Admin/EditProduct.vue';

import AdminKho from '@/views/Admin/AdminKho.vue';
import NhapKho from '@/views/Admin/NhapKho.vue';
import EditKho from '@/views/Admin/EditKho.vue';

import NCC from '@/views/Admin/NhaCungCap.vue';
import AddNhaCungCap from '@/views/Admin/AddNhaCungCap.vue';

import AdminOrder from '@/views/Admin/AdminOrder.vue';
import AdminDetailOrder from '@/views/Admin/AdminDetailOrder.vue';

import AdminKhachHang from '@/views/Admin/AdminKhachHang.vue';
import NangCapKhachHang from '@/views/Admin/NangCapKhachHang.vue';

import AdminNhanVien from '@/views/Admin/AdminNhanVien.vue';
import AddNhanVien from '@/views/Admin/AddNhanVien.vue';
import EditNhanVien from '@/views/Admin/EditNhanVien.vue';

import AdminShipper from '@/views/Admin/AdminShipper.vue';
import AddShipper from '@/views/Admin/AddShipper.vue';
import ShipperNhanDon from '@/views/Admin/ShipperNhanDon.vue';

import ThongKe from '@/views/Admin/ThongKe.vue';

//Khách Hàng
import KhachHangLogin from '@/views/KhachHang/Login.vue';
import KhachHangRegister from '@/views/KhachHang/Register.vue';
import HomeKH from '@/views/KhachHang/Home.vue';
import ProductsKH from '@/views/KhachHang/SanPham.vue';
import CartKH from '@/views/KhachHang/Cart.vue';
import ChiTietSanPham from '@/views/KhachHang/ChiTietSanPham.vue';
import ThanhToan from '@/views/KhachHang/ThanhToan.vue';
import LichSuDatHang from '@/views/KhachHang/LichSuDatHang.vue';
import ChiTietDonHang from '@/views/KhachHang/ChiTietDonHang.vue';

const routes = [
    {
        path: '/admin',
        name: 'adminhome',
        component: AdminHome,
      },
  {
    path: '/admin/login',
    name: 'login',
    component: AdminLogin,
  },
  {
    path: '/admin/add-product',
    name: 'addproduct',
    component: AddProduct,
  },
  {
    path: '/admin/edit-product/:id',
    name: 'editproduct',
    component: EditProduct,
  },
  {
    path: '/admin/add-category',
    name: 'addcategory',
    component: AddCategory,
  },
  {
    path: '/admin/edit-category/:id',
    name: 'editcategory',
    component: EditCategory,
  },
  {
    path: '/admin/products',
    name: 'product',
    component: AdminProduct,
  },
  {
    path: '/admin/category',
    name: 'category',
    component: AdminCategory,
  },
  {
    path: '/admin/kho',
    name: 'kho',
    component: AdminKho,
  },
  {
    path: '/admin/kho/nhapkho',
    name: 'nhapkho',
    component: NhapKho,
  },
  {
    path: '/admin/kho/:id',
    name: 'editkho',
    component: EditKho,
  },
  {
    path: '/admin/ncc',
    name: 'nhacungcap',
    component: NCC,
  },
  {
    path: '/admin/ncc/add',
    name: 'addncc',
    component: AddNhaCungCap,
  },
  {
    path: '/admin/order',
    name: 'adminorder',
    component: AdminOrder,
  },
  {
    path: '/admin/order/:iddh',
    name: 'admindetailorder',
    component: AdminDetailOrder,
  },
  {
    path: '/admin/khachang',
    name: 'adminkhachhang',
    component: AdminKhachHang,
  },
  {
    path: '/admin/khachang/nangcap',
    name: 'nangcapkhachhang',
    component: NangCapKhachHang,
  },
  {
    path: '/admin/nhanvien',
    name: 'adminnhanvien',
    component: AdminNhanVien,
  },
  {
    path: '/admin/nhanvien/add',
    name: 'addnhanvien',
    component: AddNhanVien,
  },
  {
    path: '/admin/nhanvien/:id',
    name: 'editnhanvien',
    component: EditNhanVien,
  },
  {
    path: '/admin/shipper',
    name: 'adminshipper',
    component: AdminShipper,
  },
  {
    path: '/admin/shipper/add',
    name: 'addshipper',
    component: AddShipper,
  },
  {
    path: '/admin/shipper/nhandon',
    name: 'shippernhandon',
    component: ShipperNhanDon,
  },
  {
    path: '/admin/thongke',
    name: 'thongke',
    component: ThongKe,
  },

  //Khách hàng
  {
    path: '/khachhang/login',
    name: 'khachhanglogin',
    component: KhachHangLogin,
  },
  {
    path: '/khachhang/register',
    name: 'register',
    component: KhachHangRegister,
  },
  {
    path: '/khachhang',
    name: 'homekh',
    component: HomeKH,
  },
  {
    path: '/khachhang/products',
    name: 'productskh',
    component: ProductsKH,
  },
  {
    path: '/khachhang/cart',
    name: 'cartkh',
    component: CartKH,
  },
  {
    path: '/khachhang/chitietsanpham/:id',
    name: 'chitietsanpham',
    component: ChiTietSanPham,
  },
  {
    path: '/khachhang/thanhtoan',
    name: 'thanhtoan',
    component: ThanhToan,
  },
  {
    path: '/khachhang/lichsudathang',
    name: 'lichsudathang',
    component: LichSuDatHang,
  },
  {
    path: '/khachhang/chitietdonhang/:id',
    name: 'chitietdonhang',
    component: ChiTietDonHang,
  },
  {
    path: "/admin/no-permission",
    name: 'no-permission',
    component: () => import('@/views/NoPermission.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('@/views/NotFound.vue'),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
    const url = to.fullPath.toString();
  if (to.name !== 'login' && url.match('/admin') && !sessionStorage.getItem('isLogin')){
    next({ name: 'login' });
  }
  else {
    next()
    };
});

export default router;
