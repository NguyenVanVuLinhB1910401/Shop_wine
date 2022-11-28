<template>
    <div id="AddCategoryPage">
      <div class="container-fuild">
        <AppNav/>
        <div class="row m-0 p-0">
          <div class="col-md-2 m-0 p-0">
            <Sidebar/>
          </div>
          <div class="col-md-10" style="padding-top: 40px;">
            <Form class="p-3" @submit="handleAddCategory" :validation-schema="addCategoryFormSchema">
              <h1 class="text-center">Thêm loại sản phẩm</h1>
              <div class="mt-4 mb-3" >
                <div class="col-sm-8 mx-auto">
                    <label class="form-label col-sm-3">Tên loại sản phẩm</label>
                    <Field class="form-control" name="tenloaisp" type="text" v-model="tenloaisp" placeholder="Nhập tên loại sản phẩm"/>
                    <ErrorMessage name="tenloaisp" class="text-danger" />
                </div>
              </div>
              <div class="mb-4">
                  <div class="col-sm-8 mx-auto">
                    <label>Hình ảnh</label>
                    <Field class="form-control" @change="selectFile" type="file" name="image"/>
                    <ErrorMessage name="image" class="text-danger" />
                  </div>  
              </div>
              <div class="mb-3">
                  <div class="col-sm-8 mx-auto">
                      <button class="btn btn-primary form-control">Thêm</button>
                  </div>
              </div>
            </Form> 
          </div>
        </div>
        <Footer/>
      </div>
    </div>
    
  </template>
  
  <script>
    import * as yup from "yup"; 
    import { Form, Field, ErrorMessage } from "vee-validate";
    import Sidebar from "@/components/Sidebar.vue";
    import AppNav from "@/components/Navbar.vue";
    import Footer from "../../components/FooterKhachHang.vue";
    import { mapActions, mapGetters } from "vuex";
    import loaiNhanVienService from "@/services/loaiNhanVien.service";
      export default {
        components: {
            Sidebar,
            AppNav,
            Footer,
            Form,
            Field, 
            ErrorMessage,
  
        },
        data() {
          const addCategoryFormSchema = yup.object().shape({ 
            tenloaisp: yup 
                .string() 
                .required("Tên khoản không được để trống."),
            // image: yup
            //     .string()
            //     .required("Hình không được để trống.")
          });
          return {
            tenloaisp: '',
            image: '',
            addCategoryFormSchema,
          }
        },
        methods: {
          selectFile(event){
            this.image = event.target.files[0];
          },
          async handleAddCategory() {
            //console.log(this.image);
            const formData = new FormData();
            formData.append("tenloaisp", this.tenloaisp);
            formData.append("image", this.image);
            const respone = await this.$store.dispatch("themLoai", formData);
            //console.log(respone);
            if(respone.code == 0) {
              alert(respone.message);
            }else{
              alert(respone.message);
              this.$router.push({name: 'category'});
            }
            
            //const respone = await loaiNhanVienService.addCategory(formData);
            //console.log(respone);
          },
        }
        
  
      }
  </script>
  
  <style scoped>
  #AddCategoryPage {
    min-height: 100vh;
  }
  </style>