<template>
  <div class="container-fuild" id="CartPage">
    <div>
      <NavbarKH />
    </div>
    <div class="" style="padding-top: 80px">
      <div class="row d-flex justify-content-center px-3 m-0 p-0" >
        <div class="col pt-2" >
          <p>
            <span class="h2">Shopping Cart </span>
          </p>

          <div class="card mb-2" v-for="cart_item of cart" :key="cart_item._id">
            <div class="card-body">
              <div class="d-flex justify-content-center">
                <div class="mx-auto" v-if="cart_item.id_sp.image">
                  <img
                    style="height: 100px; width: 100px"
                    :src="'http://localhost:3000/' + cart_item.id_sp.image"
                    class="img-fluid"
                    alt="Không có ảnh"
                  />
                </div>
                <div class="col-md-2 d-flex justify-content-center">
                  <div>
                    <p class="small text-muted mb-2 pb-2">Tên sản phẩm</p>
                    <p class="lead fw-normal mb-0">
                      {{ cart_item.id_sp.tensp }}
                    </p>
                  </div>
                </div>

                <div class="col-md-2 d-flex justify-content-center">
                  <div>
                    <p class="small text-muted mb-2 pb-2">Số lượng</p>
                    <p class="lead fw-normal mb-0">{{ cart_item.soluong }}</p>
                  </div>
                </div>
                <div class="col-md-2 d-flex justify-content-center">
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
                <div class="col-md-2 d-flex justify-content-center">
                  <div>
                    <p class="small text-muted mb-2 pb-2">Thành tiền</p>
                    <p class="lead fw-normal mb-0">{{Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(parseInt(cart_item.soluong)*parseInt(cart_item.id_sp.giakm))}}</p>
                  </div>
                </div>
                <div class="col-md-2 d-flex justify-content-center">
                  <div>
                    <p class="small text-muted mb-2 pb-2">Xóa</p>
                    <i @click="deleteCartItem(cart_item._id)" class="fas fa-trash" style="color: red; font-size: 30px;"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card mb-5">
            <div class="card-body p-4">
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

          <div class="d-flex justify-content-end mb-3">
            <router-link :to="{name: 'productskh'}" type="button" class="btn btn-light btn-lg me-2">
              Continue shopping
            </router-link>
            <button @click="goToThanhToan()" type="button" class="btn btn-primary btn-lg">
              Thanh toán
            </button>
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
export default {
  components: {
    NavbarKH,
    FooterKH,
  },
  data() {
    return {};
  },
  async created() {
    const cart = await this.$store.dispatch(
      'getCart',
      sessionStorage.getItem('taikhoan')
    );
  },
  computed: {
    ...mapGetters(['cart', 'cartTotal']),
  },
  methods: {
    async deleteCartItem(id){
      const respone = await this.$store.dispatch('deleteCartItem', id);
    },
    goToThanhToan(){
      if(this.cart.length > 0){
        this.$router.push({name: 'thanhtoan'});
      }
      else{
        alert("Giỏ hàng rỗng.")
      }
    }
  }
};
</script>

<style>

</style>
