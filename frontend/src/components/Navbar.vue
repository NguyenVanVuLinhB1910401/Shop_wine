<template>
  <nav class="navbar navbar-expand-lg col-12" id="header" >
    <div class="container-fluid justify-content-end">
      <div class="dropdown px-5 ">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
        >
          {{ taikhoan }}
        </a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item">Thông tin cá nhân</a></li>
          <li><a class="dropdown-item" v-on:click="logout">Đăng xuất</a></li>
        </ul>
      </div>
      <!-- <button v-on:click="logout" class="btn btn-primary">Logout</button> -->
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import authNhanVien from '../services/authNhanVien.service';
import nhanvienModule from '../store/modules/nhanvien';
export default {
  data() {
    return {
      taikhoan: sessionStorage.getItem('taikhoan')
    };
  },
  async created() {
    // const respone = await this.$store.dispatch('getNhanVien');
    // if (respone.code == 0) {
    //   this.$router.push('/admin/login');
    // }
  },
  computed: {
    ...mapGetters(['nhanvien']),
  },
  methods: {
    async logout() {
      const respone = await authNhanVien.logout();
      if (respone.status == 200 && respone.data.message === 'success') {
        sessionStorage.clear();
        this.$router.push('/admin/login');
      }
    },
  },
};
</script>

<style scoped>
#header {
  right: 0px;
  position: fixed;
  background: #363945;
  color: #fff;
}
</style>
