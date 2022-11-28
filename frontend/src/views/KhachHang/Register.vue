<template>
  <div id="KhachHangRegisterPage">
    <Form
      class="col-sm-6 p-3"
      id="formLogin"
      @submit="handleDangKy"
      :validation-schema="registerFormSchema"
    >
      <h1 class="text-center">ĐĂNG KÝ</h1>
      <div class="row">
        <div class="col-sm-6 px-3">
          <div class="mt-4 mb-3">
            <div class="mx-auto">
              <label class="form-label">Họ tên</label>
              <Field
                class="form-control"
                name="hoten"
                type="text"
                v-model="hoten"
                placeholder="Nhập họ tên"
              />
              <ErrorMessage name="hoten" class="text-danger" />
            </div>
          </div>
          <div class="mb-4">
            <div class="mx-auto">
              <label class="form-label">Tài khoản</label>
              <Field
                class="form-control"
                name="taikhoan"
                type="text"
                v-model="taikhoan"
                placeholder="Nhập tài khoản"
              />
              <ErrorMessage name="taikhoan" class="text-danger" />
            </div>
          </div>
          <div class="mb-4">
            <div class="mx-auto">
              <label class="form-label">Mật khẩu</label>
              <Field
                class="form-control"
                name="matkhau"
                type="password"
                v-model="matkhau"
                placeholder="Nhập mật khẩu"
              />
              <ErrorMessage name="matkhau" class="text-danger" />
            </div>
          </div>
          <div class="mb-4">
            <div class="mx-auto">
              <label class="form-label">Nhập lại mật khẩu</label>
              <Field
                class="form-control"
                name="nhaplaimatkhau"
                type="password"
                v-model="nhaplaimatkhau"
                placeholder="Nhập lại mật khẩu"
              />
              <p v-if="checkmk" class="text-danger">Mật khẩu không trùng khớp</p>
              <ErrorMessage name="nhaplaimatkhau" class="text-danger" />
            </div>
          </div>
        </div>
        <div class="col-sm-6 px-3">
          <div class="mt-4 mb-3">
            <div class="mx-auto">
              <label class="form-label">Email</label>
              <Field
                class="form-control"
                name="email"
                type="email"
                v-model="email"
                placeholder="Nhập email"
              />
              <ErrorMessage name="email" class="text-danger" />
            </div>
          </div>
          <div class="mb-4">
            <div class="mx-auto">
              <label class="form-label">Số điện thoại</label>
              <Field
                class="form-control"
                name="sdt"
                type="text"
                v-model="sdt"
                placeholder="Nhập số điện thoại"
              />
              <ErrorMessage name="sdt" class="text-danger" />
            </div>
          </div>
          <div class="mb-4">
            <div class="mx-auto">
              <label class="form-label">Địa chỉ</label>
              <Field
                as="textarea"
                rows="5"
                class="form-control"
                name="diachi"
                v-model="diachi"
                placeholder="Nhập địa chỉ"
              />
              <ErrorMessage name="diachi" class="text-danger" />
            </div>
          </div>
        </div>
      </div>

      <div class="mb-3">
        <div class="mx-auto">
          <button class="btn btn-primary form-control">Đăng ký</button>
        </div>
      </div>
      <!-- <div class="mt-4">
        <div class="col-sm-8 mx-auto text-center">
          <a>Đăng nhập</a>
        </div>
      </div> -->
    </Form>
  </div>
</template>

<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { mapGetters, mapActions } from 'vuex';
import AuthNhanVienService from '@/services/authNhanVien.service';
import authKhachHangService from '../../services/authKhachHang.service';
export default {
  name: 'khachhanglogin',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const registerFormSchema = yup.object().shape({
      hoten: yup
        .string()
        .required('Họ tên không được để trống.'),
      taikhoan: yup
        .string()
        .required('Tên khoản không được để trống.')
        .min(4, 'Tài khoản phải ít nhất 4 ký tự.')
        .max(10, 'Tài có nhiều nhất 10 ký tự.'),
      matkhau: yup
        .string()
        .required('Mật khẩu không được để trống.')
        .max(30, 'Mật khẩu tối đa 30 ký tự.'),
      diachi: yup
        .string()
        .required('Địa chỉ không được để trống.')
        .max(100, 'Địa chỉ tối đa 100 ký tự.'),
      email: yup
        .string()
        .required('Email không được bỏ trống')
        .email('E-mail không đúng.')
        .max(50, 'E-mail tối đa 50 ký tự.'),
      sdt: yup
        .string()
        .required('Số điện thoại không được để trống.')
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          'Số điện thoại không hợp lệ.'
        ),
    });
    return {
      registerFormSchema,
      hoten: '',
      taikhoan: '',
      matkhau: '',
      nhaplaimatkhau: '',
      email: '',
      sdt: '',
      diachi: '',
      checkmk: false,
    };
  },
  methods: {
    async handleDangKy() {
      if (this.matkhau === this.nhaplaimatkhau) {
        const respone = await authKhachHangService.KhachHangDangKy({
          hoten: this.hoten,
          taikhoan: this.taikhoan,
          matkhau: this.matkhau,
          email: this.email,
          sdt: this.sdt,
          diachi: this.diachi,
        });
        //console.log(respone);
        if (respone.data.code == 1) {
          alert(respone.data.message);
          this.$router.push({ name: 'khachhanglogin' });
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
#KhachHangRegisterPage {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
