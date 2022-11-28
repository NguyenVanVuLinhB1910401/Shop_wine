<template>
  <div class="container-fuild" id="HomePage">
    <div>
      <NavbarKH />
    </div>
    <div style="padding-top: 80px">
      <div class="row px-4">
        <h2 class="text-center">Sản Phẩm Nổi Bật</h2>
        <div
          class="col-md-4 col-lg-3 mb-4 mb-md-0 p-2"
          v-for="sp of spNoiBat"
          :key="sp._id"
        >
          <div class="card">
            <img
              :src="'http://localhost:3000/' + sp.image"
              class="card-img-top"
              alt="Sản phẩm"
              @click="chiTietSanPham(sp._id)"
            />
            <div class="card-body">
              <div class="">
                <h5
                  class="mb-3 tensp text-center"
                  @click="chiTietSanPham(sp._id)"
                >
                  {{ sp.tensp.substring(0, 60) }}
                </h5>

                <div class="mb-3 text-center">
                  <p class="small text-danger mb-0 text-center">
                    <s>{{
                      Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(sp.giaban)
                    }}</s>
                  </p>
                  <h5 class="text-dark mb-0">
                    {{
                      Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(sp.giakm)
                    }}
                  </h5>
                </div>
                <div class="text-center">
                  <button
                    type="submit"
                    @click="addToCart(sp._id, taikhoan)"
                    class="btn btn-success form-control"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row p-4">
        <h2 class="text-center">Sản Phẩm Mới</h2>
        <div
          class="col-md-4 col-lg-3 mb-4 mb-md-0 p-2"
          v-for="sp of spNew"
          :key="sp._id"
        >
          <div class="card">
            <img
              :src="'http://localhost:3000/' + sp.image"
              class="card-img-top"
              alt="Sản phẩm"
              @click="chiTietSanPham(sp._id)"
            />
            <div class="card-body">
              <div class="">
                <h5
                  class="mb-3 tensp text-center"
                  @click="chiTietSanPham(sp._id)"
                >
                  {{ sp.tensp.substring(0, 60) }}
                </h5>

                <div class="mb-3 text-center">
                  <p class="small text-danger mb-0 text-center">
                    <s>{{
                      Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(sp.giaban)
                    }}</s>
                  </p>
                  <h5 class="text-dark mb-0">
                    {{
                      Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(sp.giakm)
                    }}
                  </h5>
                </div>
                <div class="text-center">
                  <button
                    type="submit"
                    @click="addToCart(sp._id, taikhoan)"
                    class="btn btn-success form-control"
                  >
                    Add to Cart
                  </button>
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
import productKhachHangService from '@/services/productKhachHang.service';
export default {
  components: {
    NavbarKH,
    FooterKH,
  },
  data() {
    return {
      spNew: [],
      spNoiBat: [],
      taikhoan: sessionStorage.getItem('taikhoan'),
    };
  },
  async created() {
    const getSPNew = await productKhachHangService.getNewProducts();
    if (getSPNew.status == 200 && getSPNew.data?.code == 1) {
      this.spNew = getSPNew.data.products;
    }
    const getSPNoiBat = await productKhachHangService.getNoiBatProducts();
    //console.log(getSPNoiBat);
    if (getSPNoiBat.status == 200 && getSPNoiBat.data?.code == 1) {
      this.spNoiBat = getSPNoiBat.data.products;
    }
  },
  methods: {
    async addToCart(id, taikhoan) {
      //console.log(localStorage.getItem('login'))
      if (sessionStorage.getItem('isLogin')) {
        const respone = await this.$store.dispatch('addToCart', {
          id_sp: id,
          taikhoan: taikhoan,
        });
        //console.log(respone);
        if (respone.data.code == 1) {
          this.$router.push({ name: 'cartkh' });
        }
      } else {
        this.$router.push({ name: 'khachhanglogin' });
      }
    },
    chiTietSanPham(id) {
      this.$router.push({ name: 'chitietsanpham', params: { id: id } });
    },
  },
};
</script>

<style scoped>
#HomePage {
  width: 100%;
  min-height: 100vh;
  /* background-image: linear-gradient(rgb(60, 60, 60), rgb(60, 60, 50)); */
}
#anhdaidien {
  background-size: cover;
}
</style>
