<template>
  <div id="EditKhoPage">
    <div class="container-fuild">
      <AppNav />
      <div class="row m-0 p-0">
        <div class="col-md-2 m-0 p-0">
          <Sidebar />
        </div>
        <div class="col-md-10" style="padding-top: 40px">
          <div style="" class="mt-3">
            <div class="d-flex justify-content-between align-items-center">
              <h1>Quản Lý Danh Sách Khách Hàng</h1>
              <router-link
                :to="{ name: 'nangcapkhachhang' }"
                class="btn btn-primary"
                >Nâng cấp cấp bậc khách hàng</router-link
              >
              <div>
                <form class="d-flex align-items-center" role="search">
                  <select
                    @change="onChange($event)"
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option value="all">Tất cả khách hàng</option>
                    <option
                      v-for="cb of allCapBac"
                      :key="cb._id"
                      :value="cb._id"
                    >
                      {{ cb.tencapbac }}
                    </option>
                  </select>
                </form>
              </div>
            </div>
            <hr />

            <table class="table table-hover">
              <tr style="background: #FFFF00; height: 50px">
                <th class="text-center">STT</th>
                <th id="tensp">Họ tên</th>
                <th>Tài khoản</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th >Cấp bậc</th>
              </tr>
              <tr v-for="(kh, index) of allKhachHang" :key="kh._id" style="height: 50px">
                <td class="text-center">{{ index + 1 }}</td>
                <td>{{ kh.hoten }}</td>
                <td>{{ kh.taikhoan }}</td>
                <td>
                  {{ kh.sdt }}
                </td>
                <td>
                  {{ kh.email }}
                </td>
                <td>
                  {{ kh.diachi }}
                </td>
                <td >
                  {{ kh?.id_capbac?.tencapbac }}
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
import khachhangService from '../../services/khachhang.service';
import capBacKHService from '@/services/capbac.service';
export default {
  components: {
    Sidebar,
    AppNav,
  },
  data() {
    return {
      moment,
      allKhachHang: '',
      allCapBac: '',
      capbac: '',
    };
  },
  async created() {
    const respone = await khachhangService.getAllKhachHang();
    if (respone.data?.code == 3) {
      this.$router.push({name: 'no-permission'})
    }
    if (respone.data?.code == 1) {
      this.allKhachHang = respone.data.khachhang;
    }
    const capbac = await capBacKHService.getAllCapBac();
    if (capbac.data?.code == 3) {
      this.$router.push({name: 'no-permission'})
    }
    if (capbac.data.code == 1) {
      this.allCapBac = capbac.data.capbac;
    }
  },
  computed: {
    // ...mapGetters(['donhang']),
  },

  methods: {
    async onChange(e) {
      //console.log(e.target.value);
      const respone = await khachhangService.filterKH(e.target.value);
      if(respone.data?.code == 1){
        this.allKhachHang = respone.data.khachhang;
      }

    },
    goToDetail(id) {
      this.$router.push({ name: 'admindetailorder', params: { idkh: id } });
    },
    async updateTrangThai(id) {
      const data = {
        trangthai: 'Đã xử lý',
      };
      const respone = await this.$store.dispatch('updateTrangThai', {
        id,
        data,
      });
    },
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
