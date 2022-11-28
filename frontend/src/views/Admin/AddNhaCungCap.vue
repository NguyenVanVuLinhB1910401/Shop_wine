<template>
  <div id="HomePage">
    <div class="container-fuild">
      <AppNav />
      <div class="row m-0 p-0">
        <div class="col-md-2 m-0 p-0">
          <Sidebar />
        </div>
        <div class="col-md-10" style="padding-top: 40px;">
          <Form
            class="p-3"
            @submit="handleAddNhaCungCap"
            :validation-schema="addNhaCungCapFormSchema"
          >
            <h1 class="text-center">Thêm nhà cung cấp</h1>
            <div class="mt-4 mb-3">
              <div class="col-sm-8 mx-auto">
                <label class="form-label col-sm-3">Tên nhà cung cấp</label>
                <Field
                  class="form-control"
                  name="ten"
                  type="text"
                  v-model="ten"
                  placeholder="Nhập tên nhà cung cấp"
                />
                <ErrorMessage name="ten" class="text-danger" />
              </div>
            </div>
            <div class="mt-4 mb-3">
              <div class="col-sm-8 mx-auto">
                <label class="form-label col-sm-3">Email</label>
                <Field
                  class="form-control"
                  name="email"
                  type="text"
                  v-model="email"
                  placeholder="Nhập email nhà cung cấp"
                />
                <ErrorMessage name="email" class="text-danger" />
              </div>
            </div>
            <div class="mt-4 mb-3">
              <div class="col-sm-8 mx-auto">
                <label class="form-label col-sm-3">Số điện thoại</label>
                <Field
                  class="form-control"
                  name="phone"
                  type="text"
                  v-model="phone"
                  placeholder="Nhập số điện thoại nhà cung cấp"
                />
                <ErrorMessage name="phone" class="text-danger" />
              </div>
            </div>
            <div class="mt-4 mb-3">
              <div class="col-sm-8 mx-auto">
                <label class="form-label col-sm-3">Địa chỉ nhà cung cấp</label>
                <Field
                  class="form-control"
                  name="address"
                  type="text"
                  v-model="address"
                  placeholder="Nhập tên nhà cung cấp"
                />
                <ErrorMessage name="address" class="text-danger" />
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
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import AppNav from '@/components/Navbar.vue';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { mapActions, mapGetters } from 'vuex';
import nhaCungCapService from '@/services/nhaCungCap.service';
export default {
  components: {
    Sidebar,
    AppNav,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const addNhaCungCapFormSchema = yup.object().shape({
      ten: yup.string().required('Tên không được để trống.'),
      address: yup
        .string()
        .required('Địa chỉ không được để trống.')
        .max(100, 'Địa chỉ tối đa 100 ký tự.'),
      email: yup
        .string()
        .required('Email không được bỏ trống')
        .email('E-mail không đúng.')
        .max(50, 'E-mail tối đa 50 ký tự.'),
      phone: yup
        .string()
        .required('Số điện thoại không được để trống.')
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          'Số điện thoại không hợp lệ.'
        ),
    });
    return {
      ten: '',
      address: '',
      email: '',
      phone: '',
      addNhaCungCapFormSchema,
    };
  },
  methods: {
    async handleAddNhaCungCap() {
      const formData = new FormData();
      formData.append('ten', this.ten);
      formData.append('email', this.email);
      formData.append('address', this.address);
      formData.append('phone', this.phone);
      const respone = await nhaCungCapService.addNhaCungCap(formData);
      if (respone.data.code == 1) {
        alert(respone.data.message);
        this.$router.push({ name: 'nhacungcap' });
      } else {
        alert(respone.data.message);
      }
    },
  },
};
</script>

<style scoped>
#HomePage {
  min-height: 100vh;
}
</style>
