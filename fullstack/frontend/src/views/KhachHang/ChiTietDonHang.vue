<template>
  <div class="container-fuild">
    <div>
      <NavbarKH />
    </div>
    <div>
      <div class="row" style="padding-top: 80px">
        <div class="col-lg-4">
          <div class="m-2 p-3">
        <h1>Thông tin đặt hàng</h1>
        <div class="row">
          <p><b>Họ tên:</b> {{ thongtindathang.hoten }}</p>
          <p><b>Số điện thoại:</b> {{ thongtindathang.phone }}</p>
          <p><b>Email:</b> {{ thongtindathang.email }}</p>
          <p><b>Địa chỉ:</b> {{ thongtindathang.address }}</p>
          <p><b>Ghi chú:</b> {{ thongtindathang.ghichu }}</p>
          <p>
            <b>Ngày đặt:</b>
            {{
              moment(thongtindathang.createAt).format('DD/MM/YYYY, h:mm:ss a')
            }}
          </p>
          <p><b>Trạng thái:</b> {{ thongtindathang.trangthai }}</p>
          <p v-if="thongtindathang.shipper"><b>Họ tên shipper:</b> {{thongtindathang.shipper.hoten}}</p>
          <p v-if="thongtindathang.shipper"><b>Số điện thoại shipper:</b> {{thongtindathang.shipper.sdt}}</p>
          <div>
            <button v-if="thongtindathang.trangthai == 'Đã hủy' || thongtindathang.trangthai == 'Đã hoàn thành'" disabled
              @click="huyDonHang()"
              class="btn btn-danger"
            >
              Hủy đơn hàng
            </button>
            <button v-else
              @click="huyDonHang()"
              class="btn btn-danger"
            >
              Hủy đơn hàng
            </button>
          </div>
        </div>
      </div>
        </div>
        <div class="col-lg-8">
          <div class="m-2 p-3">
        <div class="">
          <h1>Đơn hàng</h1>
          <hr />
          <div
            class="card mb-2"
            v-for="cart_item of giohang"
            :key="cart_item._id"
          >
            <div class="card-body">
              <div class="d-flex justify-content-center">
                <div
                  class="col-sm-2 d-flex justify-content-center"
                  v-if="cart_item.id_sp.image"
                >
                  <img
                    style="height: 100px; width: 100px"
                    :src="'http://localhost:3000/' + cart_item.id_sp.image"
                    class="img-fluid"
                    alt="Không có ảnh"
                  />
                </div>
                <div class="col-sm-4 d-flex justify-content-center">
                  <div>
                    <p class="small text-muted mb-2 pb-2">Tên sản phẩm</p>
                    <p class="lead fw-normal mb-0">
                      {{ cart_item.id_sp.tensp }}
                    </p>
                  </div>
                </div>

                <div class="col-sm-2 d-flex justify-content-center">
                  <div>
                    <p class="small text-muted mb-2 pb-2">Số lượng</p>
                    <p class="lead fw-normal mb-0 text-center">
                      {{ cart_item.soluong }}
                    </p>
                  </div>
                </div>
                <div class="col-sm-2 d-flex justify-content-center">
                  <div>
                    <p class="small text-muted mb-2 pb-2">Giá</p>
                    <p class="lead fw-normal mb-0">
                      {{
                        Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(cart_item.id_sp.giakm)
                      }}
                    </p>
                  </div>
                </div>
                <div class="col-sm-2 d-flex justify-content-center">
                  <div>
                    <p class="small text-muted mb-2 pb-2">Thành tiền</p>
                    <p class="lead fw-normal mb-0">
                      {{
                        Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(cart_item.thanhtien)
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card mb-5">
            <div class="card-body">
              <div class="float-end">
                <p class="mb-0 me-5 d-flex align-items-center">
                  <span class="small text-muted me-2">Tổng giỏ hàng:</span>
                  <span class="lead fw-normal">{{
                    Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(thongtindathang.tongtien)
                  }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
      
      
    </div>
    <div>
      <FooterKH />
    </div>
  </div>
</template>

<script>
import NavbarKH from '@/components/NavbarKhachHang.vue';
import FooterKH from '@/components/FooterKhachHang.vue';
import thanhToanService from '../../services/thanhToan.service';
import moment from 'moment';
import orderNhanVienService from '../../services/orderNhanVien.service';
export default {
  components: {
    NavbarKH,
    FooterKH,
  },
  data() {
    return {
      thongtindathang: '',
      giohang: '',
      moment,
    };
  },
  async created() {
    const respone = await thanhToanService.chiTietDonHang(
      this.$route.params.id
    );
    //console.log(respone);
    if (respone.data.code == 1) {
      this.thongtindathang = respone.data.thongtindathang;
      this.giohang = respone.data.giohang;
    }
  },
  methods: {
    async huyDonHang(){
        const data = {
        trangthai: 'Đã hủy'
      }
      console.log(this.giohang);
      const respone = await thanhToanService.huyDonHang({id: this.$route.params.id, giohang: this.giohang});
      this.$router.push({name: 'lichsudathang'})
    }
  }
};
</script>

<style>
p {
  font-size: 20px;
  text-align: justify;
}
</style>
