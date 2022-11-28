<template>
    <div id="EditProductPage">
      <div class="container-fuild">
        <AppNav/>
        <div class="row m-0 p-0">
          <div class="col-md-2 m-0 p-0">
          <Sidebar />
        </div>
          <div class="col-md-10 d-flex justify-content-center" style="padding-top: 40px;">
            
            <Form class="p-5 col-sm-8" @submit="handleAddProduct">
              <h1 class="text-center">Cập nhật sản phẩm</h1>
            <div class="mb-3">
              <label for="tensp" class="form-label">Tên sản phẩm</label>
              <Field type="text" name="tensp" v-model="product.tensp" class="form-control" id="tensp" />
              <ErrorMessage name="tensp" class="text-danger" />
            </div>
            <div class="mb-3">
              <label for="image" class="form-label">Hình ảnh cũ:</label>
              <img v-if="product.old_image" id="hinh" :src="'http://localhost:3000/'+ product.old_image">
              <p v-else>Không có ảnh</p>
            </div>
            <div class="mb-3">
              <label for="image" class="form-label">Hình ảnh mới</label>
              <Field type="file" @change="selectFile" name="image" class="form-control" id="image"/>
              <ErrorMessage name="image" class="text-danger" />
            </div>
  
            <div class="mb-3">
              <label class="form-label">Loại sản phẩm</label>
              <select  name="maloaisp" v-model="product.maloaisp" class="form-select">
                <option v-for="l of loai" :key="l._id" :value="l._id">{{l.tenloaisp}}</option>
              </select>
              <ErrorMessage name="maloaisp" class="text-danger" />
            </div>
  
            <div class="mb-3">
              <label>Sản phẩm nổi bật: </label>
              <div class="form-check form-check-inline">
                <input v-if="product.noibat == 1" checked class="form-check-input" type="radio" v-model="product.noibat" name="noibat" value="1"/>
                <input v-else class="form-check-input" type="radio" v-model="product.noibat" name="noibat" value="1"/>
                <label class="form-check-label">Có</label>
              </div>
              <div class="form-check form-check-inline">
                <input  v-if="product.noibat == 0" checked class="form-check-input" type="radio" v-model="product.noibat" name="noibat" value="0"/>
                <input  v-else class="form-check-input" type="radio" v-model="product.noibat" name="noibat" value="0"/>
                <label class="form-check-label" >Không</label>
              </div>
              <ErrorMessage name="noibat" class="text-danger" />
            </div>
  
            <div class="mb-3">
              <label>Sản phẩm mới: </label>
              <div class="form-check form-check-inline">
                <input v-if="product.moi == 1" checked class="form-check-input" type="radio" v-model="product.moi" name="moi" value="1"/>
                <input v-else class="form-check-input" type="radio" v-model="product.moi" name="moi" value="1"/>
                <label class="form-check-label">Có</label>
              </div>
              <div class="form-check form-check-inline">
                <input v-if="product.moi == 0" checked class="form-check-input" type="radio" v-model="product.moi" name="moi" value="0"/>
                <input v-else class="form-check-input" type="radio" v-model="product.moi" name="moi" value="0"/>
                <label class="form-check-label" >Không</label>
              </div>
              <ErrorMessage name="moi" class="text-danger" />
            </div>
            
            <div class="mb-3">
              <label for="mota" class="form-label">Mô tả sản phẩm</label>
              <Field as="textarea" class="form-control" v-model="product.mota" name="mota" id="mota" rows="3"/>
              <ErrorMessage name="mota" class="text-danger" />
            </div>
  
            <div class="mb-3">
              <label for="xuatxu" class="form-label">Xuất xứ</label>
              <Field type="text" v-model="product.xuatxu" name="xuatxu" class="form-control" id="xuatxu" />
              <ErrorMessage name="xuatxu" class="text-danger" />
            </div>
            <div class="mb-3">
              <label for="docon" class="form-label">Nồng độ (%)</label>
              <Field type="number" name="docon" v-model="product.docon" class="form-control" id="docon" />
              <ErrorMessage name="docon" class="text-danger" />
            </div>
            <div class="mb-3">
              <label for="dungtich" class="form-label">Dung tích (ML)</label>
              <Field type="number" name="dungtich" v-model="product.dungtich" class="form-control" id="dungtich" />
              <ErrorMessage name="dungtich" class="text-danger" />
            </div>
            <div class="mb-3">
              <label for="giongnho" class="form-label">Giống nho</label>
              <Field type="text" name="giongnho" v-model="product.giongnho" class="form-control" id="giongnho" />
              
            </div>
            <!-- <div class="mb-3">
              <label for="soluong" class="form-label">Số lượng</label>
              <Field type="number" name="soluong" v-model="product.soluong" class="form-control" id="soluong" />
              <ErrorMessage name="soluong" class="text-danger" />
            </div>
            <div class="mb-3">
              <label for="gianhap" class="form-label">Giá nhập</label>
              <Field type="number" name="gianhap" v-model="product.gianhap" class="form-control" id="gianhap" />
              <ErrorMessage name="gianhap" class="text-danger" />
            </div> -->
            <div class="mb-3">
              <label for="giaban" class="form-label">Giá bán</label>
              <Field type="number" name="giaban" v-model="product.giaban" class="form-control" id="giaban" />
              <div class="ms-2">
                      
                      <small>{{
                        Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(product.giaban)
                      }}</small>
                    
                  </div>
              <ErrorMessage name="giaban" class="text-danger" />
            </div>
            <div class="mb-3">
              <label for="giakm" class="form-label">Giá khuyến mãi</label>
              <Field name="giakm" type="number" v-model="product.giakm" class="form-control" id="giakm" />
              <div class="ms-2">
                      
                      <small>{{
                        Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(product.giakm)
                      }}</small>
                    
                  </div>
              <ErrorMessage name="giakm" class="text-danger" />
            </div>
  
            <div class="mb-3">
              <label>Trạng thái: </label>
              <div class="form-check form-check-inline">
                <input v-if="product.dangban == 1" checked class="form-check-input" type="radio" v-model="product.dangban" name="dangban" value=1 />
                <input v-else class="form-check-input" type="radio" v-model="product.dangban" name="dangban" value=1 />
                <label class="form-check-label">Có bán</label>
              </div>
              <div class="form-check form-check-inline">
                <input v-if="product.dangban == 0" checked class="form-check-input" type="radio" v-model="product.dangban" name="dangban" value=0 />
                <input v-else class="form-check-input" type="radio" v-model="product.dangban" name="dangban" value=0 />
                <label class="form-check-label" >Không bán</label>
              </div>
              <ErrorMessage name="dangban" class="text-danger" />
            </div>
            <div class="mb-3">
              <div class="mx-auto">
                <button class="btn btn-primary form-control">Thêm</button>
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
    import Sidebar from "@/components/Sidebar.vue";
    import AppNav from "@/components/Navbar.vue";
    import productNhanVienService from "../../services/productNhanVien.service";
    import { mapGetters } from 'vuex';
  export default {
    components: {
      Sidebar,
      AppNav,
      Form,
      Field,
      ErrorMessage
    },
    data() {
      return {
        product: {
          tensp: '',
          image: '',
          old_image: '',
          maloaisp: '',
          noibat: '',
          moi: '',
          mota: '',
          xuatxu: '',
          docon: '',
          dungtich: '',
          giongnho: '',
          // soluong: '',
          // gianhap: '',
          giaban: '',
          giakm: '',
          dangban: '',
        },
        image: '',
      }
    },
    async created() {
      const loai = await this.$store.dispatch('getAllLoai');
      const respone = await productNhanVienService.getOneProduct(this.$route.params.id);
      this.product = respone.data.product;
      this.product.old_image = respone.data.product.image;
    //   console.log(this.product.maloaisp);
    //     console.log(this.product.old_image);
    },
    computed: {
      ...mapGetters(['loai']),
  
    },
    methods: {
      selectFile(event){
        this.image = event.target.files[0];
      },
      async handleAddProduct(){
        const formData = new FormData();
        //console.log(this.image);
        formData.append("tensp", this.product.tensp);
        formData.append("image", this.image);
        formData.append("old_image", this.product.old_image);
        formData.append("maloaisp", this.product.maloaisp);
        formData.append("noibat", this.product.noibat);
        formData.append("moi", this.product.moi);
        formData.append("mota", this.product.mota);
        formData.append("xuatxu", this.product.xuatxu);
        formData.append("docon", this.product.docon);
        formData.append("dungtich", this.product.dungtich);
        formData.append("giongnho", this.product.giongnho);
        // formData.append("soluong", this.product.soluong);
        // formData.append("gianhap", this.product.gianhap);
        formData.append("giaban", this.product.giaban);
        formData.append("giakm", this.product.giakm);
        formData.append("dangban", this.product.dangban);
        //this.product.image = this.image;
        //console.log(this.product);
        const respone = await productNhanVienService.updateProduct(this.$route.params.id, formData);
        //console.log(respone);
        if(respone.data.code == 1) {
          alert(respone.data.message);
          this.$router.push({name: 'product'});
        } else {
          alert(respone.data.message);
        }
        //this.$router.push({name: 'product'});
      }
    }
  }
  </script>
  
  <style scoded>
  #AddProductPage{
    min-height: 100vh;
  }
  .col-md-2{
    padding: 0;
  }
  </style>