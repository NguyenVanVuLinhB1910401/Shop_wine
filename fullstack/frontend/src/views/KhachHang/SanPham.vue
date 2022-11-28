<template>
  <div class="container-fuild" id="PageSP">
    <NavbarKH />
    <div class="row p-0 m-0" id="content">
      <div class="col-md-2" style="padding-top: 80px">
        <div style="margin-top: 65px">
          <ul class="list-group" id="danhmuc">
            
            <div class="text-center p-2" style="background-color: #00FFFF">Danh mục</div>
            <li @click="SanPhamTheoLoai(category._id)" class="list-group-item" v-for="category of caterogies" :key="category._id">{{category.tenloaisp}}</li>
            <li @click="allSanPham()" class="list-group-item">Tất cả</li>
          </ul>
        </div>
      </div>
      <div class="col-md-10" style="padding-top: 80px">
        <div class="row" >
          <h1 class="text-center">Danh sách sản phẩm</h1>
          <div
            class="col-md-4 col-lg-3 mb-4 mb-md-0 p-2"
            v-for="sp of sanpham"
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
                  <h5 class="mb-3 tensp text-center" @click="chiTietSanPham(sp._id)">
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
                    <button type="submit" @click="addToCart(sp._id, taikhoan)" class="btn btn-success form-control">
                      Add to Cart
                    </button>
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
import { mapGetters } from 'vuex';
import cartKhachHangService from '@/services/cartKhachHang.service';
export default {
  components: {
    NavbarKH,
    FooterKH,
  },
  data() {
    return {
      taikhoan: sessionStorage.getItem('taikhoan')
    }
  },
  async created() {
    const products = await this.$store.dispatch('getAllSanPham');
    const loaisp = await this.$store.dispatch('getAllCategories');
  },
  computed: {
    ...mapGetters(['sanpham', 'caterogies',]),
  },
  methods: {
    async addToCart(id, taikhoan){
      //console.log(localStorage.getItem('login'))
      if(sessionStorage.getItem('isLogin')){
        const respone = await this.$store.dispatch('addToCart', {id_sp: id, taikhoan: taikhoan});
        //console.log(respone);
      if(respone.data.code == 1){
        alert("Thêm vào giỏ hàng thành công");
        //this.$router.push({name: 'cartkh'})
      }
      }else{
        this.$router.push({name: 'khachhanglogin'})
      }
    },
    chiTietSanPham(id){
      this.$router.push({name: 'chitietsanpham', params: {id: id}});
    },
    async SanPhamTheoLoai(loai){
      const respone = await this.$store.dispatch('getAllSanPhamTheoLoai', loai);
      //console.log(respone)
    },
    async allSanPham(){
      const products = await this.$store.dispatch('getAllSanPham');
    }
  }
};
</script>

<style>
.tensp {
  height: 65px;
  text-overflow: ellipsis;
}
#danhmuc li:hover {
  background-color: #8FBC8F;
}
#content{
  padding-top: 1000px;
}
/* #PageSP{
    width: 100%;
    height: auto;
    background-image: linear-gradient(rgb(60, 60, 60), rgb(60, 60, 50));
} */

</style>
