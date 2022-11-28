<template>
  <div id="AddShipperPage">
    <div class="container-fuild">
      <AppNav />
      <div class="row m-0 p-0">
        <div class="col-md-2 m-0 p-0">
          <Sidebar />
        </div>
        <div class="col-md-10" style="padding-top: 40px;">
          <Form
            class="p-3"
            @submit="handleAddShipper"
            :validation-schema="addShipperFormSchema"
          >
            <h1 class="text-center">Thêm shipper</h1>
            <div class="mt-4 mb-3">
              <div class="col-sm-8 mx-auto">
                <label class="form-label col-sm-3">Họ tên shipper</label>
                <Field
                  class="form-control"
                  name="hoten"
                  type="text"
                  v-model="shipper.hoten"
                  placeholder="Nhập họ tên shippper"
                />
                <ErrorMessage name="hoten" class="text-danger" />
              </div>
            </div>
            <div class="mt-4 mb-3">
              <div class="col-sm-8 mx-auto">
                <label class="form-label col-sm-3">Tài khoản</label>
                <Field
                  class="form-control"
                  name="taikhoan"
                  type="text"
                  v-model="shipper.taikhoan"
                  placeholder="Nhập tài khoản"
                />
                <ErrorMessage name="taikhoan" class="text-danger" />
              </div>
            </div>
            <div class="mb-3">
              <div class="col-sm-8 mx-auto">
                <label class="form-label">Mật khẩu</label>
                <Field
                  class="form-control"
                  name="matkhau"
                  type="password"
                  v-model="shipper.matkhau"
                  placeholder="Nhập mật khẩu"
                />
                <ErrorMessage name="matkhau" class="text-danger" />
              </div>
            </div>
            <div class="mb-3">
              <div class="col-sm-8 mx-auto">
                <label class="form-label">Nhập lại mật khẩu</label>
                <Field
                  class="form-control"
                  name="nhaplaimatkhau"
                  type="password"
                  v-model="nhaplaimatkhau"
                  placeholder="Nhập lại mật khẩu"
                />
                <p v-if="checkmk" class="text-danger">
                  Mật khẩu không trùng khớp
                </p>
                <ErrorMessage name="nhaplaimatkhau" class="text-danger" />
              </div>
            </div>

            <div class="mt-4 mb-3">
              <div class="col-sm-8 mx-auto">
                <label class="form-label col-sm-3">Số điện thoại</label>
                <Field
                  class="form-control"
                  name="phone"
                  type="text"
                  v-model="shipper.sdt"
                  placeholder="Nhập số điện thoại nhà cung cấp"
                />
                <ErrorMessage name="phone" class="text-danger" />
              </div>
            </div>
            <div class="mt-4 mb-3">
            <div class=" col-sm-8 mx-auto">
              <label class="form-label">Email</label>
              <Field
                class="form-control"
                name="email"
                type="email"
                v-model="shipper.email"
                placeholder="Nhập email"
              />
              <ErrorMessage name="email" class="text-danger" />
            </div>
          </div>
          <div class="mb-4">
            <div class="col-sm-8 mx-auto">
              <label class="form-label">Địa chỉ</label>
              <Field
                as="textarea"
                rows="5"
                class="form-control"
                name="diachi"
                v-model="shipper.diachi"
                placeholder="Nhập địa chỉ"
              />
              <ErrorMessage name="diachi" class="text-danger" />
            </div>
          </div>
            <div class="mb-3">
              <div class="col-sm-8 mx-auto">
                <button class="btn btn-primary form-control">Thêm shipper</button>
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
import ShipperService from '@/services/shipper.service';
export default {
  components: {
    Sidebar,
    AppNav,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const addShipperFormSchema = yup.object().shape({
      hoten: yup.string().required('Tên không được để trống.'),
      taikhoan: yup.string().required('Tài khoản không được để trống.'),
      matkhau: yup.string().required('Mật khẩu không được để trống.'),
      diachi: yup
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
      shipper: {
        hoten: '',
        taikhoan: '',
        matkhau: '',
        email: '',
        sdt: '',
        diachi: '',
      },
      nhaplaimatkhau: '',
      checkmk: false,

      addShipperFormSchema,
    };
  },
  methods: {
    async handleAddShipper() {
        if (this.shipper.matkhau === this.nhaplaimatkhau) {
        const respone = await ShipperService.addShipper(this.shipper);
        //console.log(respone);
        if (respone.data.code == 1) {
          alert(respone.data.message);
          this.$router.push("/admin/shipper");
        } else {
          alert(respone.data.message);
        }
      } else {
        this.checkmk = true;
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
