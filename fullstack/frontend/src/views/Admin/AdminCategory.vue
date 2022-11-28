<template>
  <div id="AdminCategoryPage">
    <div class="container-fuild m-0 p-0">
      <AppNav/>
      <div class="row m-0 p-0">
        <div class="col-md-2 m-0 p-0">
          <Sidebar/>
        </div>
        <div class="col-md-10" style="padding-top: 40px;">
          <div class="d-flex justify-content-between mt-2">
              <h1>DANH SÁCH LOẠI SẢN PHẨM</h1>
              <div class="me-5 mt-2">
                <router-link
                :to="{ name: 'addcategory' }"
                class="nav-link text-white"
              >
                <button class="btn btn-primary p-2"><i class="fa fa-plus me-2" aria-hidden="true"></i> Thêm loại sản phẩm</button>
              </router-link>
              </div>
            </div>
            <hr/>
          <table class="table table-hover mt-3">
            <tr style="background: #FFFF00; height: 50px">
              <th class="text-center">STT</th>
              <th id="tensp">Tên loại sản phẩm</th>
              <th class="text-center">Hình ảnh</th>
              <th>Ngày tạo</th>
              <th class="text-center">Action</th>
            </tr>
            <tr v-for="(l, index) of loai" :key="l._id">
                <td class="text-center">{{index+1}}</td>
                <td>{{l.tenloaisp}}</td>
                <td v-if="l.image" class="text-center"><img id="hinh" :src="'http://localhost:3000/'+ l.image"></td>
                <td v-else class="text-center">Không có ảnh</td>
                <td>{{moment(l.createAt).format('DD/MM/YYYY, h:mm:ss a')}}</td>
                <td class="text-center">
                  <div>
                    <button @click="goEditCategory(l._id)" class="btn btn-secondary mx-2">Cập nhật</button>
                    <button @click="deleteCategory(l)" class="btn btn-danger mx-2">Xóa</button>
                  </div>
                </td>
              </tr>            
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import loaiNhanVienService from '../../services/loaiNhanVien.service';
import Sidebar from "@/components/Sidebar.vue";
import AppNav from "@/components/Navbar.vue";
import moment from 'moment';
export default {
  components: {
      Sidebar,
      AppNav,
  },
  data() {
    return {
      moment,
    }
  },
  async created() {
    //this.loai = loaiNhanVienService.getAllCategory();
    const respone = await this.$store.dispatch('getAllLoai');
  },
  computed: {
      ...mapGetters(['loai']),

  },
  methods: {
      goEditCategory(id) {
        this.$router.push({name: 'editcategory', params: { id: id }})
      },
      async deleteCategory(loai) {
        if(confirm(`Bạn có chắc chắn xóa loại ${loai.tenloaisp}?`)){
          const respone = await this.$store.dispatch('deleteLoai', loai._id);
        //console.log(respone);
        if(respone.data.code == 0) {
          alert(respone.data.message);
        } else {
          alert(respone.data.message);
          this.$router.push({name: 'category'});
        }
        }
      }
  }

}
</script>

<style scoped>
#AdminCategoryPage{
    min-height: 100vh;
}
#hinh{
  width: 100px;
  height: 100px;
}
.table{
  background: #FFFACD;
}
</style>