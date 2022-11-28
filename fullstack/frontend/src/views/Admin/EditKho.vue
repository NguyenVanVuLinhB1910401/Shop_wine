<template>
  <div id="EditKhoPage">
    <div class="container-fuild">
      <AppNav />
      <div class="row m-0 p-0">
        <div class="col-md-2 m-0 p-0">
          <Sidebar />
        </div>
        <div class="col-md-10" style="padding-top: 40px;">
          <Form
            class="p-3"
            @submit="EditKho"
            :validation-schema="EditKhoFormSchema"
          >
            <h1 class="text-center">Cap Nhat</h1>
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
                >
                  <option disabled value="">Chọn 1 sản phẩm để nhập kho</option>
                  <option
                    v-for="product of products"
                    :key="product._id"
                    :value="product._id"
                  >
                    {{ product.tensp }}
                  </option>
                </Field>
                <ErrorMessage name="id_sp" class="text-danger" />
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
                <button class="btn btn-primary form-control">Update</button>
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
export default {
  components: {
    Sidebar,
    AppNav,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const EditKhoFormSchema = yup.object().shape({
      id_sp: yup.string().required('Sản phẩm không được để trống.'),
      id_ncc: yup.string().required('Nhà cung cấp không được để trống.'),
      nguoinhap: yup.string().required('Họ tên không được bỏ trống'),
      soluong: yup.number().min(0, 'Số lượng phải lớn hơn 0'),
      gianhap: yup.number().min(0, 'Giá nhập phải lớn hơn 0'),
    });
    return {
      kho: {
        id_sp: '',
        id_ncc: '',
        nguoinhap: '',
        soluong: null,
        gianhap: null,
      },
      EditKhoFormSchema,
    };
  },
  async created() {
    const products = await this.$store.dispatch('getProducts');
    const ncc = await this.$store.dispatch('getAllNhaCungCap');
    const getKho = await khoService.getOneKho(this.$route.params.id);
    //console.log(getKho);
    this.kho = getKho.data.kho;
  },
  computed: {
    ...mapGetters(['products', 'ncc']),
  },
  methods: {
    async EditKho() {
      // const formData = new FormData();
      // formData.append("id_sp", this.kho.id_sp);
      // formData.append("id_ncc", this.kho.id_ncc);
      // formData.append("nguoinhap", this.kho.nguoinhap);
      // formData.append("soluong", this.kho.soluong);
      // formData.append("gianhap", this.kho.gianhap);
        const respone = await khoService.updateKho(this.$route.params.id, this.kho);
        if(respone.data.code == 1) {
          alert(respone.data.message);
          this.$router.push({name: 'kho'})
        }else {
          alert(respone.data.message);
        }
    },
  },
};
</script>

<style scoped>
#EditKhoPage {
  min-height: 100vh;
}
</style>
