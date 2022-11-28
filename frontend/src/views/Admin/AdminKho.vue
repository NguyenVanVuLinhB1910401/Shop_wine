<template>
  <div id="AdminKhoPage">
    <div class="container-fuild">
      <AppNav />
      <div class="row m-0 p-0">
        <div class="col-md-2 p-0 m-0">
          <Sidebar />
        </div>
        <div class="col-md-10 p-2" >
          <div class="d-flex justify-content-between mt-2" style="padding-top: 40px">
              <h1>DANH SÁCH SẢN PHẨM TRONG KHO</h1>
              <div class="me-5 mt-2">
                <router-link
                :to="{ name: 'nhapkho' }"
                class="nav-link text-white"
              >
                <button class="btn btn-primary px-4"><i class="fa fa-plus me-2" aria-hidden="true"></i>Nhập kho</button>
              </router-link>
              </div>
            </div>
            <hr/>

          <div style="margin-right: 20px">
            <table class="table">
              <tr style="background: #FFFF00; height: 50px">
                <th class="text-center">STT</th>
                <th class="col-sm-2">Tên sản phẩm</th>
                <th class="">Người nhập</th>
                <th class="">Nhà cung cấp</th>
                <th class="text-end">Tồn kho</th>
                <th class="text-end">Đã bán</th>
                <th class="text-end">Giá nhập</th>
                <th class="text-end">Tổng tiền</th>
                <!-- <th>Ngày nhập</th> -->
                <th class="text-center">Action</th>
              </tr>
              <tr v-for="(k, index) in kho" :key="k._id">
                <td class="text-center">{{ index + 1 }}</td>
                <td id="tensp">{{ k.id_sp?.tensp }}</td>
                <td class="">{{ k?.nguoinhap }}</td>
                <td class="">{{ k?.id_ncc.ten }}</td>
                <td class="text-end">{{ k?.soluong - k?.daban }}</td>
                <td class="text-end">{{ k?.daban }}</td>
                <td class="text-end">
                  {{
                    Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(k.gianhap)
                  }}
                </td>
                <td class="text-end">
                  {{
                    Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(k.tongtien)
                  }}
                </td>
                <td class="text-center">
                  <div>
                    <!-- <button
                      @click="goEditKho(k._id)"
                      type="submit"
                      class="btn btn-secondary mx-2"
                    >
                      Cập nhật
                    </button> -->
                    <button
                      @click="deleteKho(k)"
                      type="submit"
                      class="btn btn-danger mx-2 px-4"
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
    ...mapGetters(['kho']),
  },

  async created() {
    const respone = await this.$store.dispatch('getAllKho');
  },
  methods: {
    goEditKho(id) {
      this.$router.push({ name: 'editkho', params: { id: id } });
    },
    async deleteKho(kho) {
      if (confirm(`Bạn có chắc chắn xóa sản pham ${kho.id_sp.tensp} trong kho?`)) {
        try {
          const respone = await this.$store.dispatch('deleteKho', kho._id);
          if (respone.data.code == 1) {
            alert(respone.data.message);
            this.$router.push({ name: 'kho' });
          } else {
            alert(respone.data.message);
          }
        } catch (error) {
          console.log(error);
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
/* tr{
    text-align: center;
  } */
#tensp {
  text-align: left;
}
.table{
  background: #FFFACD;
}
</style>
