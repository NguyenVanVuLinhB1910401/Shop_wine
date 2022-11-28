<template>
    <nav class="nav flex-column" id="sidebar" v-if="role == 'Admin'">
        <li class="nav-item">
            <div class="nav-link text-white"><i class="fas fa-desktop"></i>Dashboard</div>
        </li>
        <li class="nav-item">
            <router-link :to="{ name: 'adminhome' }" class="nav-link text-white">
                <i class="fas fa-home"></i>Trang chủ
            </router-link>
        </li>
        <li class="nav-item">
            <router-link :to="{ name: 'product' }" class="nav-link text-white">
                <i class="fa-solid fa-list-check"></i>Quản lý sản phẩm
            </router-link>
        </li>
        <li class="nav-item">
            <router-link :to="{name: 'category'}" class="nav-link text-white">
                <i class="fa-solid fa-list-check"></i>Quản lý loại sản phẩm
            </router-link>
        </li>
        <li class="nav-item">
            <div class="nav-link text-white sub-btn"  @click="toggleContent"><i class="fa-solid fa-warehouse"></i>Quản lý kho <i class="fas fa-angle-right dropdown"></i></div>
            <div class="sub-menu toBeToggled" id="toBeToggled"  >
                <router-link :to="{name: 'kho'}" class="nav-link text-white">Danh sách sản phẩm đã nhập</router-link>
                <router-link :to="{name: 'nhacungcap'}" class="nav-link text-white">Nhà cung cấp</router-link>
                <router-link :to="{name: 'thongke'}" class="nav-link text-white">Thống kê doanh thu</router-link>
            </div>
            
        </li>
        <li class="nav-item">
            <router-link :to="{name: 'adminorder'}" class="nav-link text-white">
                <i class="fa-brands fa-first-order"></i>Quản lý đơn hàng
            </router-link>
        </li>
        <li class="nav-item">
            <router-link :to="{name: 'adminkhachhang'}" class="nav-link text-white">
                <i class="fa-brands fa-first-order"></i>Quản lý khách hàng
            </router-link>
        </li>
        <li class="nav-item">
            <router-link :to="{name: 'adminnhanvien'}" class="nav-link text-white">
                <i class="fa-brands fa-first-order"></i>Quản lý nhân viên
            </router-link>
        </li>
        <li class="nav-item">
            <router-link :to="{name: 'adminshipper'}" class="nav-link text-white">
                <i class="fa-brands fa-first-order"></i>Quản lý Shipper
            </router-link>
        </li>
        <li class="nav-item">
            <router-link :to="{name: 'shippernhandon'}" class="nav-link text-white">
                <i class="fa-brands fa-first-order"></i>Shipper nhận đơn hàng
            </router-link>
        </li>
    </nav>

    <nav class="nav flex-column" id="sidebar" v-if="role == 'Nhân viên'">
        <li class="nav-item">
            <div class="nav-link text-white"><i class="fas fa-desktop"></i>Dashboard</div>
        </li>
        <li class="nav-item">
            <router-link :to="{ name: 'adminhome' }" class="nav-link text-white">
                <i class="fas fa-home"></i>Trang chủ
            </router-link>
        </li>
        
        <li class="nav-item">
            <router-link :to="{name: 'adminorder'}" class="nav-link text-white">
                <i class="fa-brands fa-first-order"></i>Quản lý đơn hàng
            </router-link>
        </li>
    </nav>

    <nav class="nav flex-column" id="sidebar" v-if="role == 'Shipper'">
        <li class="nav-item">
            <div class="nav-link text-white"><i class="fas fa-desktop"></i>Dashboard</div>
        </li>
        <li class="nav-item">
            <router-link :to="{ name: 'adminhome' }" class="nav-link text-white">
                <i class="fas fa-home"></i>Trang chủ
            </router-link>
        </li>
        
        <li class="nav-item">
            <router-link :to="{name: 'shippernhandon'}" class="nav-link text-white">
                <i class="fa-brands fa-first-order"></i>Shipper nhận đơn hàng
            </router-link>
        </li> 
    </nav>
        
</template>

<script>
import { mapGetters } from 'vuex';
import authNhanVien from '../services/authNhanVien.service';
export default {
    data: () => ({
        toggleCheck: false,
        role: sessionStorage.getItem('role'),
        taikhoan: sessionStorage.getItem('taikhoan')
    }),
    computed: {
        ...mapGetters(['nhanvien']),
    },

    methods: {
    toggleContent() {
        this.toggleCheck = !this.toggleCheck;
            if (this.toggleCheck == true) {
                $("#toBeToggled").slideDown();
            } else {
                $("#toBeToggled").slideUp();
            }
        }
    },
    async logout() {
      const respone = await authNhanVien.logout();
      console.log(respone)
      if (respone.status == 200 && respone.data.message === 'success') {
        sessionStorage.removeItem('token', respone.data.token);
        sessionStorage.removeItem('role', respone.data.role);
        this.$router.push('/admin/login');
      }
    },
}
</script>

<style scoped>
#toBeToggled {
    display: none;
}
#sidebar{
    padding-right: 0px;
    height: 100vh;
    width: 250px;
    
    overflow-y:auto;
    background: #363945;
    position: fixed;
    left: 0;
}
#sidebar li .router-link{
    color: #fff;
    
}

#sidebar .nav-item:hover {
    background: #8621F8;
}
.sub-menu .nav-link:hover {
    background: #ad86d9;
}
.sub-menu{
    display: none;
}
.sub-menu .nav-link {
    padding-left: 70px;
}
i {
    margin-right: 15px;
}


.rotate {
    transform: rotate(90deg);
}
</style>