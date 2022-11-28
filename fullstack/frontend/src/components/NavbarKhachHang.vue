<template>
  <nav class="navbar navbar-expand-lg m-0 p-0 " id="header">
    <div class="container-fluid m-0 p-0">
      <img src="@/assets/image(1991).png" style="width: 100px; height: 70px">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse " id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-lg-0 d-flex justify-content-center align-items-center">
          <li class="nav-item">
            <router-link
              :to="{ name: 'homekh' }"
              class="nav-link"
              aria-current="page"
              href="#"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'productskh' }"
              class="nav-link"
              aria-current="page"
              href="#"
              >
                Sản phẩm
              </router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              :to="{}"
              class="nav-link"
              aria-current="page"
              href="#"
              >
                About
              </router-link
            >
          </li>
          <li class="nav-item" v-if="isLogin">
            <router-link
              :to="{ name: 'cartkh' }"
              class="nav-link"
              aria-current="page"
              href="#"
            >
              <div class="d-flex justify-content-center cart">
                <span class="cart-count">{{countCartItem}}</span>
                <i class="fa-solid fa-cart-shopping cart-icon"></i>
                
              </div>
            </router-link>
          </li>
          <li v-if="isLogin" class="nav-item">
            <router-link
              :to="{ name: 'lichsudathang'}"
              class="nav-link"
              aria-current="page"
              href="#"
              >
                Lịch sử đặt hàng
              </router-link
            >
          </li>
          
        </ul>
        <div class="d-flex px-3">
          <div v-if="isLogin" style="color: #fff">
            {{ taikhoan }} <span @click="logout">Đăng xuất</span>
          </div>
          <div v-else  class="px-3">
            <router-link
              :to="{ name: 'khachhanglogin' }"
              style="text-decoration: none;color: #fff"
              >Đăng nhập | </router-link
            >
            
            <router-link
              :to="{ name: 'register' }"
              style="text-decoration: none;color: #fff"
              >Đăng ký</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
//import AuthKhachHangService from '@/services/authKhachHang.service';
import authKhachHangService from '../services/authKhachHang.service';

export default {
  data () {
    return {
      isLogin: sessionStorage.getItem('isLogin'),
      taikhoan: sessionStorage.getItem('taikhoan')
    }
  },
  async created() {
    //console.log(localStorage.getItem('login'));
    const checkLogin = sessionStorage.getItem('isLogin');
    //console.log(checkLogin);
    if (checkLogin) {
      //const respone = await this.$store.dispatch('getKH');
      const cart = await this.$store.dispatch('getCart',
      sessionStorage.getItem('taikhoan'))
    }
  },
  computed: {
    ...mapGetters([,'countCartItem']),
  },
  methods: {
    async logout() {
      const respone = await authKhachHangService.logout();
      if (respone.data.code == 1) {
        sessionStorage.clear();
        this.$router.push('/khachhang/login');
      }
    },
  },
};
</script>

<style>
#header{
  background: #1E90FF;
  position: fixed;
  top: 0px;
  left: 0;
  z-index: 1;
  width: 100%;
}
.cart{
  /* height: 3.3rem;
  width: 3.3rem; */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.cart-icon{
  width: 3rem;
  color: #fff;
  display: flex;
}
.cart-count{
  user-select: none;
  position: absolute;
  background: #ff4754;
  width: 1.3rem;
  height: 1.3rem;
  font-size: .8rem;
  border-radius: 50%;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -8px;
  right: .7rem;
}
ul li .nav-link{
  color: #fff;
}
li:hover{
  background-color: #ff4754;
  border-radius: 5px ;
}

</style>
