<template>
  <div id="HomePage">
    <div class="container-fuild">
      <AppNav />
      <div class="row m-0 p-0">
        <div class="col-md-2 m-0 p-0">
          <Sidebar />
        </div>
        <div class="col-md-10" style="padding-top: 40px">
          <div class="d-flex justify-content-between align-items-center">
            <h1>Nâng Cấp Khách Hàng</h1>
            <div class="d-flex align-items-center justify-content-end p-2">
              <!-- <form  role="search">
                <select class="form-select" aria-label="Default select example">
                  <option selected value="all">Tất cả khách hàng</option>
                  <option value="1">Khách hàng bình thường</option>
                  <option value="2">Khách hàng thân thiết</option>
                  <option value="3">Khách hàng VIP</option>
                </select>
              </form> -->

              <!-- <form  role="search">
                <select class="form-select" aria-label="Default select example">
                  <option selected value="all">Tất cả khách hàng</option>
                  <option value="1">Khách hàng bình thường</option>
                  <option value="2">Khách hàng thân thiết</option>
                  <option value="3">Khách hàng VIP</option>
                </select>
              </form> -->
            </div>
          </div>
          <hr />
          <div class="d-flex justify-content-center row">
            <form
              class="d-flex justify-content-center"
              @submit.prevent="addCapBac"
            >
              <!-- <div class="row"> -->
              <div class="col-lg-4">
                <div class="d-flex mx-auto">
                  <label class="form-label col-lg-2 mt-2">Cấp bậc:</label>
                  <input
                    class="form-control"
                    name="tencapbac"
                    type="text"
                    v-model="capbac.tencapbac"
                    placeholder="Nhập cấp bậc khách hàng"
                    required
                  />
                  <!-- <ErrorMessage name="tencapbac" class="text-danger" /> -->
                </div>
              </div>
              <div class="col-lg-4 ms-4">
                <div class="d-flex mx-auto">
                  <label class="form-label col-lg-3 mt-2">Khuyến mãi:</label>
                  <input
                    class="form-control"
                    name="km"
                    type="number"
                    v-model="capbac.km"
                    placeholder="Nhập phần trăm khuyến mãi"
                  />
                  <!-- <ErrorMessage name="matkhau" class="text-danger" /> -->
                </div>
              </div>
              <div class="col-lg-2 ms-2">
                <div class="d-flex mx-auto">
                  <button type="submit" class="btn btn-success me-3">
                    Thêm cấp bậc
                  </button>
                </div>
              </div>

              <!-- </div> -->
            </form>
          </div>
          <hr />

          <!-- </div> -->
          <div class="d-flex justify-content-end my-2">
            <div class="p-1">Tổng tiền từ:</div>
            <div class="col-sm-2">
              <input
                v-model="min"
                type="number"
                class="form-input form-control"
                min="1"
              />
            </div>
            <div class="p-1">đến:</div>
            <div class="col-sm-2">
              <input
                v-model="max"
                type="number"
                min="1"
                class="form-input form-control"
              />
            </div>
            <div class="p-1" @click="filterKH(this.allKhachHang)">
              <i class="fa-solid fa-filter"></i>
            </div>
          </div>
          <div class="d-flex justify-content-start mt-4">
            <div class="p-1 me-2">Chọn cấp bậc nâng cấp:</div>
            <div class="mx-1" v-for="cb of allCapBac" :key="cb._id">
              <button @click="nangCapKh(cb)" class="btn btn-primary">
                {{ cb.tencapbac }}, km: {{ cb.km }}%
              </button>
            </div>
            <button
              @click="deleteAllCapBac"
              type="submit"
              class="btn btn-danger"
            >
              Xóa tất cả cấp bậc
            </button>
          </div>

          <div class="p-3 m-2">
            <table class="table table-hover">
              <tr style="background: #FFFF00; height: 50px">
                <th class="text-center">STT</th>
                <th id="tensp">Họ tên</th>
                <th>Tài khoản</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Đã mua</th>
              </tr>
              <tr v-for="(kh, index) of allKhachHang" :key="kh._id" style="height: 50px">
                <td class="text-center">{{ index + 1 }}</td>
                <td>{{ kh.thongtin.hoten }}</td>
                <td>{{ kh.thongtin.taikhoan }}</td>
                <td>
                  {{ kh.thongtin.sdt }}
                </td>
                <td>
                  {{ kh.thongtin.email }}
                </td>
                <td>
                  {{ kh.thongtin.diachi }}
                </td>
                <td>
                  {{
                    Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(kh.count)
                  }}
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
import moment from 'moment';
import Footer from '../../components/FooterKhachHang.vue';
import capBacKHService from '@/services/capbac.service';
import khachhangService from '@/services/khachhang.service';
export default {
  components: {
    Sidebar,
    AppNav,
    Footer,
  },
  data() {
    return {
      moment,
      capbac: {
        tencapbac: '',
        km: '',
      },
      allKhachHang: '',
      allCapBac: '',
      max: '',
      min: '',
    };
  },
  async created() {
    const respone = await khachhangService.getAllKhachHangTongTien();
    if (respone.data.code == 1) {
      this.allKhachHang = respone.data.khachhang;
    }
    const allCB = await capBacKHService.getAllCapBac();
    if (respone.data.code == 1) {
      this.allCapBac = allCB.data.capbac;
    }
  },
  computed: {
    ...mapGetters(['nhanvien']),
  },

  methods: {
    async addCapBac() {
      try {
        const respone = await capBacKHService.addCapBacKH(this.capbac);
        if (respone.data.code == 1) {
          alert(respone.data.message);
        } else {
          alert('Thêm cấp bậc thất bại');
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteAllCapBac() {
      if (confirm(`Bạn có chắc chắn xóa tất cả cấp bậc?`)) {
        try {
          const respone = await capBacKHService.deleteAllCapBac();
          if (respone.data.code == 1) {
            alert(respone.data.message);
          } else {
            alert('Xóa thất bại');
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    async filterKH(allKH) {
      if (this.min == '' || this.max == '') return;
      const respone = await khachhangService.getAllKhachHangTongTien();
      if (respone.data.code == 1) {
        this.allKhachHang = respone.data.khachhang;
      }
      allKH = this.allKhachHang;
      const filterKH = [];
      for (let i = 0; i < allKH.length; i++) {
        if (
          allKH[i].count >= parseInt(this.min) &&
          allKH[i].count <= parseInt(this.max)
        ) {
          filterKH.push(allKH[i]);
        }
      }
      this.allKhachHang = filterKH;
    },
    async nangCapKh(cb){
      const min = Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(this.min);
      const max = Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(this.max);
      
      if (confirm(`Bạn có chắc chắn nâng cấp tất cả khách hàng đã mua từ ${min} đến ${max} lên cấp bậc ${cb.tencapbac} ?`)) {
        try {
          const data = {
            dsKH: this.allKhachHang,
            idCapBac: cb._id
          }
          const respone = await khachhangService.nangCapKH(data);
          //console.log(respone);
          if (respone.data.code == 1) {
            alert(respone.data.message);
            this.$router.push({name: 'adminkhachhang'})
          } else {
            alert('Nâng cấp thất bại');
          }
        } catch (error) {
          console.log(error);
        }
      }
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
