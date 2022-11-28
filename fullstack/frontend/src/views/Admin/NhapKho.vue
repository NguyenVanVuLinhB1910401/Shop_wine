<template>
  <div id="NhapKhoPage">
    <div class="container-fuild">
      <AppNav />
      <div class="row m-0 p-0">
        <div class="col-md-2 m-0 p-0">
          <Sidebar />
        </div>
        <div class="col-md-10" style="padding-top: 40px;">
          
          <Form class="p-3" @submit="handleNhapKho" :validation-schema="addNhapKhoFormSchema">
            <h1 class="text-center">Nhập kho</h1>
            <div class="mt-4 mb-3">
              <div class="col-sm-8 mx-auto">
                <label class="form-label col-sm-3">Họ tên</label>
                <Field
                  class="form-control"
                  name="nguoinhap"
                  type="text"
                  v-model="kho.nguoinhap"
                  placeholder="Nhập họ và tên"
                />
                <ErrorMessage name="nguoinhap" class="text-danger" />
              </div>
            </div>
            <div class="mb-3">
              <div class="col-sm-8 mx-auto">
                <label class="form-label col-sm-3">Chọn sản phẩm</label>
                <Field
                  as="select"
                  name="id_sp"
                  v-model="kho.id_sp"
                  class="form-select"
                  @click="getGiaBanAndKM(kho.id_sp, products)"
                >
                  <option disabled value="">Chọn 1 sản phẩm để nhập kho</option>
                  <option   v-for="product of products" :key="product._id" :value="product._id" >
                    {{ product.tensp }}
                  </option>
                </Field>
                <ErrorMessage name="id_sp" class="text-danger" />
              </div>
            </div>
            <div class="mb-3">
              <div class="col-sm-8 mx-auto">
                <label class="form-label col-sm-3">Giá bán</label>
                <Field
                  class="form-control"
                  name="giaban"
                  type="number"
                  v-model="this.giaban"
                />
                <ErrorMessage name="giaban" class="text-danger" />
              </div>
            </div>
            <div class="mb-3">
              <div class="col-sm-8 mx-auto">
                <label class="form-label col-sm-3">Giá khuyến mãi</label>
                <Field
                  class="form-control"
                  name="giakm"
                  type="number"
                  v-model="this.giakm"
                />
                <ErrorMessage name="giakm" class="text-danger" />
              </div>
            </div>
            <div class="mb-3">
              <div class="col-sm-8 mx-auto">
                <label class="form-label col-sm-3">Nhà cung cấp</label>
                <Field
                  as="select"
                  name="id_ncc"
                  v-model="kho.id_ncc"
                  class="form-select"
                >
                  <option disabled value="">Chọn chọn nhà cung cấp</option>
                  <option v-for="n of ncc" :key="n._id" :value="n._id">
                    {{ n.ten }}
                  </option>
                </Field>
                <ErrorMessage name="id_ncc" class="text-danger" />
              </div>
            </div>
            <div class="mb-3">
              <div class="col-sm-8 mx-auto">
                <label class="form-label col-sm-3">Số lượng</label>
                <Field
                  class="form-control"
                  name="soluong"
                  type="number"
                  v-model="kho.soluong"
                  placeholder="Nhập số lượng"
                />
                <ErrorMessage name="soluong" class="text-danger" />
              </div>
            </div>
            <div class="mb-3">
              <div class="col-sm-8 mx-auto">
                <label class="form-label col-sm-3">Giá nhập</label>
                <Field
                  class="form-control"
                  name="gianhap"
                  type="number"
                  v-model="kho.gianhap"
                  placeholder="Nhập số lượng"
                  :min="1"

                />
                <ErrorMessage name="gianhap" class="text-danger" />
              </div>
            </div>
            <div class="mb-3">
              <div class="col-sm-8 mx-auto">
                <button class="btn btn-primary form-control">Nhập kho</button>
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
import { mapActions, mapGetters } from 'vuex';
import khoService from '@/services/kho.service';
import productNhanVienService from '../../services/productNhanVien.service';
export default {
  components: {
    Sidebar,
    AppNav,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const addNhapKhoFormSchema = yup.object().shape({
      id_sp: yup.string().required('Sản phẩm không được để trống.'),
      id_ncc: yup
        .string()
        .required('Nhà cung cấp không được để trống.'),
      nguoinhap: yup
        .string()
        .required('Họ tên không được bỏ trống'),
      soluong: yup
        .number()
        .min(0,'Số lượng phải lớn hơn 0'),
      gianhap: yup
        .number()
        .min(0,'Giá nhập phải lớn hơn 0'),
        
    });
    return {
      kho: {
        id_sp: '',
        id_ncc: '',
        nguoinhap: '',
        soluong: 0,
        gianhap: 0,
      },
      giaban: '',
      giakm: '',
      addNhapKhoFormSchema

    };
  },
  async created() {
    const products = await this.$store.dispatch('getProducts');
    const ncc = await this.$store.dispatch('getAllNhaCungCap');
    //console.log(this.$route.query.id)
    if(this.$route.query.id){
      const product = await productNhanVienService.getOneProduct(this.$route.query.id);
      //console.log(product);
      if(product.data.code == 1){
        this.kho.id_sp = product.data.product._id;
          this.giaban = product.data.product.giaban;
          this.giakm = product.data.product.giakm;
      }
    }
  },
  computed: {
    ...mapGetters(['products', 'ncc']),
  },
  methods: {
    async handleNhapKho() {
      // const formData = new FormData();
      // formData.append("id_sp", this.kho.id_sp);
      // formData.append("id_ncc", this.kho.id_ncc);
      // formData.append("nguoinhap", this.kho.nguoinhap);
      // formData.append("soluong", this.kho.soluong);
      // formData.append("gianhap", this.kho.gianhap);
      const respone = await khoService.nhapKho(this.kho);
      if(respone.data.code == 1) {
        alert(respone.data.message);
        this.$router.push({name: 'kho'})
      }else {
        alert(respone.data.message);
      }
    },
    getGiaBanAndKM(id, products) {
      for(let i=0; i < products.length; i++){
        if(id === products[i]._id){
          //console.log(products[i].giaban);
          this.giaban = products[i].giaban;
          this.giakm = products[i].giakm;
        }
      }
    }
  }

};
</script>

<style scoped>
#NhapKhoPage {
  min-height: 100vh;
}
</style>
