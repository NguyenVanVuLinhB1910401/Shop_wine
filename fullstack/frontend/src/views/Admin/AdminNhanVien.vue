<template>
    <div id="EditKhoPage">
      <div class="container-fuild">
        <AppNav />
        <div class="row m-0 p-0">
          <div class="col-md-2 m-0 p-0">
            <Sidebar />
          </div>
          <div class="col-md-10" style="padding-top: 40px;">
            <div class="mt-3 p-2">
              <div class="d-flex justify-content-between">
              <h1>QUẢN LÝ DANH SÁCH NHÂN VIÊN</h1>
              <div class="me-5 mt-2">
                <router-link
                :to="{ name: 'addnhanvien' }"
                class="nav-link text-white"
              >
                <button class="btn btn-primary p-2"><i class="fa fa-plus me-2" aria-hidden="true"></i>Thêm nhân viên</button>
              </router-link>
              </div>
            </div>
            <hr/>
            <table class="table table-hover " >
              <tr style="background: #FFFF00; height: 50px">
                <th class="text-center">STT</th>
                <th id="tensp">Họ tên</th>
                <th>Tài khoản</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Role</th>
                <th class="text-center">Action</th>
              </tr>
              <tr v-for="(nv, index) of allNhanVien" :key="nv._id">
                <td class="text-center">{{ index + 1 }}</td>
                <td>{{ nv.hoten }}</td>
                <td>{{ nv.taikhoan }}</td>
                <td>
                  {{
                   nv.sdt
                  }}
                </td>
                <td>{{nv.email}}</td>
                <td>
                  {{nv.diachi}}
                </td>
                <td>
                  {{nv.role}}
                </td>
                <td class="text-center">
                  <div>
                  <button @click="goEdit(nv._id)"  class="btn btn-primary">Cập nhật</button>
                </div>

                </td>
              </tr>
            </table>
          </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Sidebar from '@/components/Sidebar.vue';
  import AppNav from '@/components/Navbar.vue';
  import { mapActions, mapGetters } from 'vuex';
  import moment from 'moment';
import nhanvienService from '../../services/nhanvien.service';
  export default {
    components: {
      Sidebar,
      AppNav,
    },
    data() {
      return {
        moment,
        allNhanVien: '',
      };
    },
    async created() {
      const respone = await nhanvienService.getAllNhanVien();
      //console.log(respone)
      if(respone.data.code == 1){
        this.allNhanVien = respone.data.nhanvien;
      }
    },
    computed: {
      ...mapGetters(['donhang']),
    },
  
    methods: {
      goEdit(id) {
        this.$router.push({ name: 'editnhanvien', params: { id: id } });
      },
      async updateTrangThai(id){
        const data = {
          trangthai: 'Đã xử lý'
        }
        const respone = await this.$store.dispatch('updateTrangThai',{id,data});
      }
    },
  };
  </script>
  
  <style scoped>
  #HomePage {
    min-height: 100vh;
  }
  .table{
  background: #FFFACD;
}
  </style>
  