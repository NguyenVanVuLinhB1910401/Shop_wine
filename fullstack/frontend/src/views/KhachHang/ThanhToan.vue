<template>
  <div class="container-fuild">
    <div>
      <NavbarKH />
    </div>
    <div style="padding-top: 80px">
      <div class="row m-0 p-0">
        <div class="col-lg-8 p-3">
          <h1>Your Cart</h1>
          <hr />
          <div class="card mb-2" v-for="cart_item of cart" :key="cart_item._id">
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
                        }).format(
                          parseInt(cart_item.soluong) *
                            parseInt(cart_item.id_sp.giakm)
                        )
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card mb-3">
            <div class="card-body">
              <div class="float-end">
                <p class="mb-0 me-5 d-flex align-items-center">
                  <span class="small text-muted me-2">Tổng giỏ hàng:</span>
                  <span class="lead fw-normal">{{
                    Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(cartTotal)
                  }}</span>
                </p>
              </div>
            </div>
          </div>

          <div class="card mb-3" v-if="khachhang?.capbac">
            <div class="card-body">
              <div class="float-end">
                <p class="mb-0 me-5 d-flex align-items-center">
                  <!-- <span class="small text-muted me-2">Cấp bậc:</span> -->
                  <span class="lead fw-normal">Cấp bậc: {{khachhang?.capbac.tencapbac}}, Phần trăm khuyến mãi: {{khachhang?.capbac.km}}%</span>
                </p>
              </div>
            </div>
          </div>

          <div class="card mb-5" v-if="khachhang?.capbac">
            <div class="card-body">
              <div class="float-end">
                <p class="mb-0 me-5 d-flex align-items-center">
                  <span class="small text-muted me-2">Tổng tiền thanh toán:</span>
                  <span class="lead fw-normal">{{
                    Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(cartTotal * (1 - (khachhang.capbac.km/100)))
                  }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="card mb-5" v-else>
            <div class="card-body">
              <div class="float-end">
                <p class="mb-0 me-5 d-flex align-items-center">
                  <span class="small text-muted me-2">Tổng tiền thanh toán:</span>
                  <span class="lead fw-normal">{{
                    Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(cartTotal)
                  }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 p-3">
          <h1>Thông tin đặt hàng</h1>
          <div class="row">
            <Form @submit="handleThanhToan(cart, cartTotal)" :validation-schema="thanhToanFormSchema">
              <div class="col-sm-10 mb-3">
                <label class="form-label">Họ tên</label>
                <Field
                  class="form-control"
                  name="hoten"
                  type="text"
                  v-model="thongtindonhang.hoten"
                  placeholder="Nhập họ tên"
                />
                <ErrorMessage name="hoten" class="text-danger" />
              </div>
              <div class="col-sm-10 mb-3">
                <label class="form-label">Số điện thoại</label>
                <Field
                  class="form-control"
                  name="phone"
                  type="text"
                  v-model="thongtindonhang.phone"
                  placeholder="Nhập số điện thoại"
                />
                <ErrorMessage name="phone" class="text-danger" />
              </div>
              <div class="col-sm-10 mb-3">
                <label class="form-label">Email</label>
                <Field
                  class="form-control"
                  name="email"
                  type="email"
                  v-model="thongtindonhang.email"
                  placeholder="Nhập email"
                />
                <ErrorMessage name="email" class="text-danger" />
              </div>
              <div class="col-sm-10 mb-3">
                <label class="form-label">Địa chỉ</label>
                <Field
                  as="textarea"
                  class="form-control"
                  name="address"
                  type="text"
                  rows="3"
                  v-model="thongtindonhang.address"
                  placeholder="Nhập địa chỉ nhận hàng"
                ></Field>
                <ErrorMessage name="address" class="text-danger" />
              </div>
              <div class="col-sm-10 mb-3">
                <label class="form-label">Ghi chú</label>
                <Field
                  class="form-control"
                  name="ghichu"
                  type="text"
                  v-model="thongtindonhang.ghichu"
                  placeholder="Nhập ghi chú"
                />
              </div>
              <div class="col-sm-10 mb-3">
                <div class="mx-auto">
                  <button class="btn btn-primary form-control">
                    Thanh toán
                  </button>
                </div>
              </div>
            </Form>
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
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import NavbarKH from '@/components/NavbarKhachHang.vue';
import FooterKH from '@/components/FooterKhachHang.vue';
import { mapGetters } from 'vuex';
import thanhToanService from '@/services/thanhToan.service';
export default {
  components: {
    NavbarKH,
    FooterKH,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const thanhToanFormSchema = yup.object().shape({
      hoten: yup.string().required('Tên không được để trống.'),
      address: yup
        .string()
        .required('Địa chỉ không được để trống.')
        .max(100, 'Địa chỉ tối đa 100 ký tự.'),
      email: yup
        .string()
        .required('Email không được bỏ trống')
        .email('E-mail không đúng.')
        .max(50, 'E-mail tối đa 50 ký tự.'),
      phone: yup
        .string()
        .required('Số điện thoại không được để trống.')
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          'Số điện thoại không hợp lệ.'
        ),
    });
    return {
        thongtindonhang: {
            hoten: '',
            email: '',
            phone: '',
            address: '',
            ghichu: '',
        },
        thanhToanFormSchema,
    };
  },
  async created() {
    const cart = await this.$store.dispatch(
      'getCart',
      sessionStorage.getItem('taikhoan')
    );
    const getKH = await this.$store.dispatch('getKH');
  },
  computed: {
    ...mapGetters(['cart', 'cartTotal', 'khachhang']),
  },
  methods: {
    async handleThanhToan(cart, cartTotal){
        this.thongtindonhang.taikhoan = sessionStorage.getItem('taikhoan');
        this.thongtindonhang.id_khachhang = sessionStorage.getItem('id_KH');
        if(this.khachhang?.capbac){
          this.thongtindonhang.tongtien = cartTotal * (1 - (this.khachhang.capbac.km/100));
        }else{
          this.thongtindonhang.tongtien = cartTotal;
        }
        console.log(this.thongtindonhang);
        console.log(cart)
          
        const respone = await thanhToanService.thanhToan({donhang: this.thongtindonhang,yourcart: cart});
        if(respone.data.code == 1){
            alert(respone.data.message);
            this.$router.push({name: 'homekh'})
        }else{
            alert(respone.data.message);
        }
    }
  }
};
</script>

<style></style>
