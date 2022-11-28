<template>
  <div id="AdminProductPage">
    <div class="container-fuild">
      <AppNav />
      <div class="row m-0 p-0">
        <div class="col-md-2 p-0" id="navbar-example3">
          <Sidebar />
        </div>
        <div class="col-md-10 p-2">
          <div style="padding-top: 40px">
            <div class="d-flex justify-content-between">
              <h1>DANH SÁCH SẢN PHẨM</h1>
              <div class="me-5 mt-2">
                <router-link
                :to="{ name: 'addproduct' }"
                class="nav-link text-white"
              >
                <button class="btn btn-primary p-2"><i class="fa fa-plus me-2" aria-hidden="true"></i> Thêm sản phẩm</button>
              </router-link>
              </div>
            </div>
            <hr/>

            <table class="table">
              <tr class="" style="background: #FFFF00; height: 50px">
                <th>STT</th>
                <th id="tensp" class="col-sm-2">Tên sản phẩm</th>
                <th>Hình</th>
                <th>Nổi bật</th>
                <th>Sản phẩm mới</th>
                <th>Giá bán</th>
                <th>Giá khuyến mãi</th>
                <th>Trạng thái</th>
                <th>Action</th>
              </tr>
              <tr v-for="(product, index) in products" :key="product._id">
                <td>{{ index + 1 }}</td>
                <td id="tensp">{{ product.tensp }}</td>
                <td>
                  <img
                    id="hinhsp"
                    :src="'http://localhost:3000/' + product.image"
                  />
                </td>
                <td>{{ product.noibat }}</td>
                <td>{{ product.moi }}</td>
                <td>
                  {{
                    Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(product.giaban)
                  }}
                </td>
                <td>
                  {{
                    Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(product.giakm)
                  }}
                </td>
                <td v-if="product.dangban == 1">Đang bán</td>
                <td v-else>Tạm dừng</td>
                <td>
                  <div>
                    <button
                      @click="goNhapKho(product._id)"
                      type="submit"
                      class="btn btn-primary mx-2"
                    >
                      Nhập kho
                    </button>
                    <button
                      @click="goEditProduct(product._id)"
                      type="submit"
                      class="btn btn-secondary mx-2"
                    >
                      Cập nhật
                    </button>
                    <button
                      @click="deleteProduct(product._id)"
                      type="submit"
                      class="btn btn-danger mx-2"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
                <!-- <ProductItem :product="product"/> -->
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productNhanVienService from '../../services/productNhanVien.service';
import Sidebar from '@/components/Sidebar.vue';
import AppNav from '@/components/Navbar.vue';
import ProductItem from '../../components/ProductItem.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: {
    Sidebar,
    AppNav,
    ProductItem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['products']),
  },

  async created() {
    const respone = await this.$store.dispatch('getProducts');
  },
  methods: {
    goEditProduct(id) {
      this.$router.push({ name: 'editproduct', params: { id: id } });
    },
    goNhapKho(id) {
      this.$router.push('/admin/kho/nhapkho?id=' + id);
    },
    async deleteProduct(id) {
      if(confirm("Bạn có chắc chắn xóa sản phẩm này?")){
        const respone = await this.$store.dispatch('deleteProduct', id);
      //const respone = await productNhanVienService.deleteProduct(id);
      if (respone.data.code == 1) {
        alert(respone.data.message);
        this.$router.push({ name: 'product' });
      } else {
        alert(respone.data.message);
      }
      }
    },
  },
};
</script>

<style scoped>
#AdminProductPage {
  min-height: 100vh;
}
.table{
  background: #FFFACD;
}
tr {
  text-align: center;
}
#tensp {
  text-align: left;
}
#hinhsp {
  height: 100px;
  width: 100px;
}
</style>
