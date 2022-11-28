<template>
  <div id="EditCategoryPage">
    <div class="container-fuild m-0 p-0">
      <AppNav/>
      <div class="row m-0 p-0">
        <div class="col-md-2">
          <Sidebar/>
        </div> 
        <div class="col-md-10" style="padding-top: 40px;">
          <Form class="p-3" @submit="handleEditCategory">
              <h1 class="text-center">Cập nhật loại sản phẩm</h1>
              <div class="mt-4 mb-3" >
                <div class="col-sm-8 mx-auto">
                    <label class="form-label col-sm-3">Tên loại sản phẩm</label>
                    <Field class="form-control" name="tenloaisp" type="text" v-model="loai.tenloaisp" placeholder="Nhập tên loại sản phẩm"/>
                </div>
              </div>
              <div class="mb-4">
                  <div class="col-sm-8 mx-auto">
                    <label>Hình ảnh cũ: </label>
                    <img v-if="loai.old_image" id="hinh" :src="'http://localhost:3000/'+ loai.old_image">
                    <p v-else>Không có ảnh</p>
                  </div>  
              </div>
              <div class="mb-4">
                  <div class="col-sm-8 mx-auto">
                    <label>Hình ảnh mới: </label>
                    <Field class="form-control" @change="selectFile" type="file" name="image"/>
                  </div>  
              </div>
              <div class="mb-3">
                  <div class="col-sm-8 mx-auto">
                      <button class="btn btn-primary form-control">Cập nhật</button>
                  </div>
              </div>
            </Form> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import * as yup from "yup"; 
    import { Form, Field, ErrorMessage } from "vee-validate";
    import { mapActions, mapGetters } from 'vuex';
    import loaiNhanVienService from '../../services/loaiNhanVien.service';
    import Sidebar from "@/components/Sidebar.vue";
    import AppNav from "@/components/Navbar.vue";
    export default {
        components: {
        Sidebar,
        AppNav,
        Form,
        Field, 
        ErrorMessage,
    },
    data() {
        return {
            loai: {
                tenloaisp: '',
                image: '',
                old_image: '',
            } 
        }
    },
    async created() {
      const respone = await this.$store.dispatch('getOneLoai', this.$route.params.id);
      this.loai = respone.loai;
      this.loai.old_image = respone.loai.image;
      //console.log(respone.loai.image);
    },
    computed: {
    },
  methods: {
    selectFile(event){
        this.loai.image = event.target.files[0];
    },
    async handleEditCategory() {
        //console.log(this.image);
        const formData = new FormData();
        formData.append("tenloaisp", this.loai.tenloaisp);
        formData.append("image", this.loai.image);
        formData.append("old_image", this.loai.old_image);
        //console.log(this.loai);
        const respone = await loaiNhanVienService.updateLoai(this.$route.params.id, formData);
        if(respone.data.code == 0) {
            alert(respone.data.message);
        } else {
            alert(respone.data.message);
            this.$router.push({name: 'category'});
        }
        
        //console.log(respone);
    },
  }
}
</script>

<style>
#EditCategoryPage{
    min-height: 100vh;
}
#hinh{
    width: 150px;
    height: 150px;
}
</style>