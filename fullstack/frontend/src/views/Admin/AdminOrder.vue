<template>
  <div id="EditKhoPage">
    <div class="container-fuild">
      <AppNav />
      <div class="row m-0 p-0">
        <div class="col-md-2 m-0 p-0">
          <Sidebar />
        </div>
        <div class="col-md-10" style="padding-top: 40px;">
          <div style="" class="mt-2">
            <div class="d-flex justify-content-between">
              <h1>Quản Lý Đơn Hàng</h1>
              <form class="d-flex align-items-center" role="search">
                <select
                  @change="onChange($event)"
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option value="0">Tất cả đơn hàng</option>
                  <option value="1">Đơn hàng chưa xử lý</option>
                  <option value="2">Đơn hàng đã xử lý</option>
                  <option value="3">Đơn hàng đang giao hàng</option>
                  <option value="4">Đơn hàng đã giao hàng</option>
                </select>
              </form>
            </div>
            <hr />
            <table class="table table-hover">
              <tr style="background: #FFFF00; height: 50px">
                <th class="text-center">STT</th>
                <th id="tensp">Họ tên</th>
                <th>Tài khoản</th>
                <th>Tổng tiền</th>
                <th>Ngày đặt</th>
                <th>Trạng thái</th>
                <th class="text-center">Action</th>
              </tr>
              <tr v-for="(dh, index) of donhang" :key="dh._id">
                <td class="text-center">{{ index + 1 }}</td>
                <td>{{ dh.hoten }}</td>
                <td>{{ dh.taikhoan }}</td>
                <td>
                  {{
                    Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(dh.tongtien)
                  }}
                </td>
                <td>
                  {{ moment(dh.createAt).format('DD/MM/YYYY, h:mm:ss A') }}
                </td>
                <td>
                  <div v-if="dh.trangthai == 'Chưa xử lý'" class="">
                    <button
                      @click="updateTrangThai(dh._id)"
                      class="btn btn-primary"
                    >
                      {{ dh.trangthai }}
                    </button>
                  </div>
                  <div v-else>
                    <button class="btn btn-primary" disabled>
                      {{ dh.trangthai }}
                    </button>
                  </div>
                </td>
                <td class="text-center">
                  <div class="">
                    <button
                      @click="goToDetail(dh._id)"
                      class="btn btn-secondary mx-2"
                    >
                      Chi tiết
                    </button>
                    <!-- <button
                      @click="deleteCategory(dh._id)"
                      class="btn btn-danger mx-2 px-4"
                    >
                      Xóa
                    </button> -->
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
export default {
  components: {
    Sidebar,
    AppNav,
  },
  data() {
    return {
      moment,
    };
  },
  async created() {
    const respone = await this.$store.dispatch('getAllDonHang');
  },
  computed: {
    ...mapGetters(['donhang', 'nhanvien']),
  },

  methods: {
    goToDetail(id) {
      this.$router.push({ name: 'admindetailorder', params: { iddh: id } });
    },
    async updateTrangThai(id) {
      const data = {
        trangthai: 'Đã xử lý',
        nguoixuly: sessionStorage.getItem('taikhoan'),
      };
      const respone = await this.$store.dispatch('updateTrangThai', {
        id,
        data,
      });
      if(respone.data.code == 1){
        alert("Đã xử lý đơn hàng");
        await this.$store.dispatch('getAllDonHangChuaXuLy');
      }
    },
    async onChange(e) {
      //console.log(e.target.value);
      if (e.target.value == 0) {
        const respone = await this.$store.dispatch('getAllDonHang');
      };
      //getall don hang chua xu ly
      if (e.target.value == 1) {
        const respone = await this.$store.dispatch('getAllDonHangChuaXuLy');
      };
      if (e.target.value == 2) {
        const respone = await this.$store.dispatch('getAllDonHangDaXuLy');
      };
      if (e.target.value == 3) {
        const respone = await this.$store.dispatch('getAllDonHangDangGiaoHang');
      };
      if (e.target.value == 4) {
        const respone = await this.$store.dispatch('getAllDonHangDaGiaoHang');
      }
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
