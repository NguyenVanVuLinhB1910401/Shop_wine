<template>
  <div id="HomePage">
    <div class="container-fuild">
      <AppNav />
      <div class="row m-0 p-0">
        <div class="col-md-2 m-0 p-0">
          <Sidebar />
        </div>
        <div class="col-md-10" style="padding-top: 40px;">
          <div  class="mt-3 p-2">
            <div class="d-flex justify-content-between">
              <h1>Danh sách đơn hàng</h1>

              <form class="d-flex align-items-center" role="search">
                <select
                  @change="onChange($event, shipper_id)"
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option value="1">Đơn hàng chưa nhận</option>
                  <option value="2">Đơn hàng đang giao</option>
                  <option value="3">Đơn hàng đã giao</option>
                </select>
              </form>
            </div>
            <hr />
            <table class="table table-hover">
              <tr class="" style="background: #FFFF00; height: 50px">
                <th class="text-center">STT</th>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th class="col-sm-3">Địa chỉ</th>
                <th>Ngày đặt</th>
                <th>Ghi chú</th>
                <th>Tổng tiền</th>
                <th class="text-center">Action</th>
              </tr>
              <tr v-for="(dh, index) of donhang" :key="dh._id">
                <td class="text-center">{{ index + 1 }}</td>
                <td>{{ dh.hoten }}</td>
                <td>{{ dh.phone }}</td>
                <td>{{ dh.address }}</td>
                <td>
                  {{ moment(dh.createAt).format('DD/MM/YYYY, h:mm:ss A') }}
                </td>
                <td>{{ dh.ghichi }}</td>
                <td>
                  {{
                    Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(dh.tongtien)
                  }}
                </td>
                <td class="text-center">
                  <div class="">
                    <button
                      v-if="dh.trangthai == 'Đã xử lý'"
                      @click="nhanDon(dh._id, shipper_id)"
                      class="btn btn-success"
                    >
                      Nhận đơn
                    </button>
                    <button
                      v-if="dh.trangthai == 'Đang giao hàng'"
                      @click="daGiaoHang(dh._id)"
                      class="btn btn-success"
                    >
                      Đã hoàn thành
                    </button>
                    <button
                      v-if="dh.trangthai == 'Đã hoàn thành'"
                      class="btn btn-success"
                      disabled
                    >
                      Đã hoàn thành
                    </button>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <!-- <Footer /> -->
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import AppNav from '@/components/Navbar.vue';
import { mapActions, mapGetters } from 'vuex';
import Footer from '../../components/FooterKhachHang.vue';
import ShipperService from '@/services/shipper.service';
import moment from 'moment';
export default {
  components: {
    Sidebar,
    AppNav,
    Footer,
  },
  data() {
    return {
      donhang: [],
      moment,
      shipper_id: sessionStorage.getItem('id')
    };
  },
  async created() {
    const respone = await ShipperService.getAllDonHang();
    if (respone.data.code == 1) {
      this.donhang = respone.data.dh;
    }
  },
  computed: {
    ...mapGetters(['nhanvien']),
  },

  methods: {
    async getDonHang() {
      const respone = await ShipperService.getAllDonHang();
      if (respone.data.code == 1) {
        this.donhang = respone.data.dh;
      }
    },
    async nhanDon(dh_id, shipper_id) {
      //console.log(shipper.id);
      const data = {
        trangthai: 'Đang giao hàng',
        shipper: shipper_id,
      };

      const respone = await ShipperService.nhanDon(dh_id, data);
      if (respone.data.code == 1) {
        alert("Nhận đơn thành công");
        this.getDonHang();
      }
      //console.log(respone);
    },
    async onChange(e, id) {
      if (e.target.value == 1) {
        this.donHangChuaNhan();
      }
      if (e.target.value == 2) {
        this.donHangDangGiao(id);
      }
      if (e.target.value == 3) {
        this.donHangDaGiao(id);
      }
    },
    async donHangChuaNhan() {
      const respone = await ShipperService.getAllDonHang();
      if (respone.data.code == 1) {
        this.donhang = respone.data.dh;
      }
    },
    async donHangDangGiao(id) {
      const respone = await ShipperService.getAllDonHangDangGiao(id);

      if (respone.data.code == 1) {
        this.donhang = respone.data.dh;
        
      }
    },
    async donHangDaGiao(id) {
      const respone = await ShipperService.getAllDonHangDaGiao(id);

      if (respone.data.code == 1) {
        this.donhang = respone.data.dh;
        
      }
    },
    async daGiaoHang(id_dh) {
      const data = {
        trangthai: 'Đã hoàn thành',
      };
      const respone = await ShipperService.nhanDon(id_dh, data);
      
      if (respone.data.code == 1) {
        alert("Đã xác nhận giao hàng thành công");
        this.donHangDangGiao(this.shipper_id);
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
