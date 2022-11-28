<template>
  <div id="AddProductPage">
    <div class="container-fuild">
      <AppNav />
      <div class="row m-0 p-0">
        <div class="col-md-2 m-0 p-0">
          <Sidebar />
        </div>
        <div
          class="col-md-10 d-flex justify-content-center"
          style="padding-top: 40px"
        >
          <Form
            id="formAdd"
            class="p-3 px-5 col-sm-8"
            @submit="handleAddProduct"
            :validation-schema="addProductFormSchema"
          >
            <div>
              <h1 class="text-center">Thêm sản phẩm</h1>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="mb-3">
                  <label for="tensp" class="form-label">Tên sản phẩm</label>
                  <Field
                    type="text"
                    name="tensp"
                    v-model="product.tensp"
                    class="form-control"
                    id="tensp"
                  />
                  <ErrorMessage name="tensp" class="text-danger" />
                </div>
                <div class="mb-3">
                  <label for="image" class="form-label">Hình ảnh</label>
                  <Field
                    type="file"
                    @change="selectFile"
                    name="image"
                    class="form-control"
                    id="image"
                  />
                  <ErrorMessage name="image" class="text-danger" />
                </div>

                <div class="mb-4">
                  <label class="form-label">Loại sản phẩm</label>
                  <Field
                    as="select"
                    name="maloaisp"
                    v-model="product.maloaisp"
                    class="form-select"
                  >
                    <option v-for="l of loai" :key="l._id" :value="l._id">
                      {{ l.tenloaisp }}
                    </option>
                  </Field>
                  <ErrorMessage name="maloaisp" class="text-danger" />
                </div>

                <div class="mb-3">
                  <label class="me-3">Sản phẩm nổi bật: </label>
                  <div class="form-check form-check-inline ms-1">
                    <Field
                      class="form-check-input"
                      type="radio"
                      v-model="product.noibat"
                      name="noibat"
                      value="1"
                    />
                    <label class="form-check-label">Có</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <Field
                      class="form-check-input"
                      type="radio"
                      v-model="product.noibat"
                      name="noibat"
                      value="0"
                    />
                    <label class="form-check-label">Không</label>
                  </div>
                  <ErrorMessage name="noibat" class="text-danger" />
                </div>

                <div class="mb-2">
                  <label class="me-4">Sản phẩm mới: </label>
                  <div class="form-check form-check-inline ms-3">
                    <Field
                      class="form-check-input"
                      type="radio"
                      v-model="product.moi"
                      name="moi"
                      value="1"
                    />
                    <label class="form-check-label">Có</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <Field
                      class="form-check-input"
                      type="radio"
                      v-model="product.moi"
                      name="moi"
                      value="0"
                    />
                    <label class="form-check-label">Không</label>
                  </div>
                  <ErrorMessage name="moi" class="text-danger" />
                </div>

                <div class="mb-3">
                  <label for="mota" class="form-label">Mô tả sản phẩm</label>
                  <Field
                    as="textarea"
                    class="form-control"
                    v-model="product.mota"
                    name="mota"
                    id="mota"
                    rows="6"
                  />
                  <ErrorMessage name="mota" class="text-danger" />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="mb-3">
                  <label for="xuatxu" class="form-label">Xuất xứ</label>
                  <Field
                    type="text"
                    v-model="product.xuatxu"
                    name="xuatxu"
                    class="form-control"
                    id="xuatxu"
                  />
                  <ErrorMessage name="xuatxu" class="text-danger" />
                </div>
                <div class="mb-3">
                  <label for="docon" class="form-label">Nồng độ (%)</label>
                  <Field
                    type="number"
                    name="docon"
                    v-model="product.docon"
                    class="form-control"
                    id="docon"
                  />
                  <ErrorMessage name="docon" class="text-danger" />
                </div>
                <div class="mb-3">
                  <label for="dungtich" class="form-label"
                    >Dung tích (ML)</label
                  >
                  <Field
                    type="number"
                    name="dungtich"
                    v-model="product.dungtich"
                    class="form-control"
                    id="dungtich"
                  />
                  <ErrorMessage name="dungtich" class="text-danger" />
                </div>
                <div class="mb-3">
                  <label for="giongnho" class="form-label">Giống nho</label>
                  <Field
                    type="text"
                    name="giongnho"
                    v-model="product.giongnho"
                    class="form-control"
                    id="giongnho"
                  />
                </div>

                <div class="mb-3">
                  <label for="giaban" class="form-label">Giá bán</label>
                  <Field
                    type="number"
                    name="giaban"
                    v-model="product.giaban"
                    class="form-control"
                    id="giaban"
                  />
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
                    
                  

                  <Field
                    name="giakm"
                    type="number"
                    v-model="product.giakm"
                    class="form-control"
                    id="giakm"
                  />
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
                  <label class="me-3">Trạng thái: </label>
                  <div class="form-check form-check-inline">
                    <Field
                      class="form-check-input"
                      type="radio"
                      v-model="product.dangban"
                      name="dangban"
                      value="1"
                    />
                    <label class="form-check-label">Đang bán</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <Field
                      class="form-check-input"
                      type="radio"
                      v-model="product.dangban"
                      name="dangban"
                      value="0"
                    />
                    <label class="form-check-label">Tạm dừng</label>
                  </div>
                  <ErrorMessage name="dangban" class="text-danger" />
                </div>
              </div>
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
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import Sidebar from '@/components/Sidebar.vue';
import AppNav from '@/components/Navbar.vue';
import productNhanVienService from '../../services/productNhanVien.service';
import { mapGetters } from 'vuex';
export default {
  components: {
    Sidebar,
    AppNav,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const addProductFormSchema = yup.object().shape({
      tensp: yup.string().required('Tên sản phẩm không được để trống.'),
      image: yup.string().required('Hình không được để trống.'),
      maloaisp: yup.string().required('Loại sản phẩm không được để trống.'),
      mota: yup.string().required('Mô tả sản phẩm không được để trống.'),
      xuatxu: yup.string().required('Xuất xứ không được để trống.'),
      docon: yup.string().required('Độ cồn không được để trống.'),
      dungtich: yup.string().required('Dung tích không được để trống.'),
      giaban: yup.string().required('Giá bán không được để trống.'),
      // giakm: yup
      //     .string()
      //     .required("Giá khuyến mãi không được để trống."),
    });
    return {
      product: {
        tensp: '',
        image: '',
        maloaisp: '',
        noibat: '',
        moi: '',
        mota: '',
        xuatxu: '',
        docon: '',
        dungtich: '',
        giongnho: '',
        giaban: '',
        giakm: '',
        dangban: '',
      },
      image: '',
      addProductFormSchema,
    };
  },
  async created() {
    const respone = await this.$store.dispatch('getAllLoai');
  },
  computed: {
    ...mapGetters(['loai']),
  },
  methods: {
    selectFile(event) {
      this.image = event.target.files[0];
    },
    async handleAddProduct() {
      const formData = new FormData();
      formData.append('tensp', this.product.tensp);
      formData.append('image', this.image);
      formData.append('maloaisp', this.product.maloaisp);
      formData.append('noibat', this.product.noibat);
      formData.append('moi', this.product.moi);
      formData.append('mota', this.product.mota);
      formData.append('xuatxu', this.product.xuatxu);
      formData.append('docon', this.product.docon);
      formData.append('dungtich', this.product.dungtich);
      formData.append('giongnho', this.product.giongnho);
      formData.append('soluong', this.product.soluong);
      formData.append('gianhap', this.product.gianhap);
      formData.append('giaban', this.product.giaban);
      formData.append('giakm', this.product.giakm);
      formData.append('dangban', this.product.dangban);
      const respone = await productNhanVienService.addProduct(formData);
      if (respone.data.code == 1) {
        alert(respone.data.message);
        this.$router.push({ name: 'product' });
      } else {
        alert(respone.data.message);
      }
      //this.$router.push({name: 'product'});
    },
  },
};
</script>

<style scoded>
#AddProductPage {
  min-height: 100vh;
  /* background: linear-gradient(to top, lime, cyan); */
}
/* #formAdd{
  background: linear-gradient(to top, lime, cyan);
} */
</style>
