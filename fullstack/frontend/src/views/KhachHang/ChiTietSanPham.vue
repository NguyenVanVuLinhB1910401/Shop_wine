<template>
  <div class="container-fuild" id="CTSP">
    <div>
      <NavbarKH />
    </div>
    <div style="padding-top: 80px">
      <div class="row p-2 m-2">
        <div class="col-lg-4 text-center">
          <img
            v-if="chitietsp.image"
            :src="'http://localhost:3000/' + chitietsp.image"
            alt="image"
            style="width: 400px; object-fit: cover"
          />
        </div>
        <div class="col-lg-4">
          <div class="mb-3" style="font-size: 30px; font-weight: bold">
            {{ chitietsp.tensp }}
          </div>

          <div class="mb-3">
            <h5 class="small text-danger mb-0">
              <s>{{
                Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(chitietsp.giaban)
              }}</s>
            </h5>
            <h3 class="text-dark mb-0">
              {{
                Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(chitietsp.giakm)
              }}
            </h3>
          </div>
          <div class="mb-3 d-flex">
            <label class="form-label mt-1">Số lượng: </label>
            <div>
              <input
                type="number"
                v-model="soluong"
                min="1"
                max="100"
                class="form-control"
              />
            </div>
          </div>
          <div class="text-center">
            <button
              type="submit"
              @click="addToCart(chitietsp._id, taikhoan, soluong)"
              class="btn btn-success form-control"
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div class="col-lg-4">
          <h2>Thông tin sản phẩm</h2>
          <hr />
          <div class="m-2 p-3">
            <div class="row col-sm-8 border">
              <div class="col-sm-6 ttsp">Xuất xứ</div>
              <div class="col-sm-6">{{ chitietsp?.xuatxu }}</div>
            </div>
            <div class="row col-sm-8 border">
              <div class="col-sm-6 ttsp">Độ cồn</div>
              <div class="col-sm-6">{{ chitietsp?.docon }} %</div>
            </div>
            <div class="row col-sm-8 border">
              <div class="col-sm-6 ttsp">Dung tích</div>
              <div class="col-sm-6">{{ chitietsp?.dungtich }} ML</div>
            </div>
            <div class="row col-sm-8 border">
              <div class="col-sm-6 ttsp">Giống nho</div>
              <div class="col-sm-6">{{ chitietsp?.giongnho }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-3 m-4" style="text-align: justify">
        {{ chitietsp.mota }}
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
import productKhachHangService from '../../services/productKhachHang.service';
import { mapGetters } from 'vuex';
export default {
  components: {
    NavbarKH,
    FooterKH,
  },
  data() {
    return {
      chitietsp: '',
      soluong: '',
      taikhoan: sessionStorage.getItem('taikhoan')
    };
  },
  async created() {
    const respone = await productKhachHangService.getOneProduct(
      this.$route.params.id
    );
    this.chitietsp = respone.data.product;
  },
  computed: {
    ...mapGetters(['khachhang']),
  },
  methods: {
    async addToCart(id, taikhoan, soluong) {
      //console.log(localStorage.getItem('login'))
      if (sessionStorage.getItem('isLogin')) {
        const respone = await this.$store.dispatch('addToCart', {
          id_sp: id,
          taikhoan: taikhoan,
          soluong: soluong,
        });
        //console.log(respone);
        if (respone.data.code == 1) {
          this.$router.push({ name: 'cartkh' });
        }
      } else {
        this.$router.push({ name: 'khachhanglogin' });
      }
    },
  },
};
</script>

<style>
.ttsp{
  font-size: 20px;
  font-weight: bolder;

}
/* #CTSP{
    width: 100%;
    height: auto;
    background-image: linear-gradient(rgb(60, 60, 60), rgb(60, 60, 50));
    color: #fff;
} */
</style>
