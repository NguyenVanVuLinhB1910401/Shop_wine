<template>
    <div id="AddNhanVienPage">
      <div class="container-fuild">
        <AppNav />
        <div class="row m-0 p-0">
          <div class="col-md-2 m-0 p-0">
            <Sidebar />
          </div>
          <div class="col-md-10" style="padding-top: 40px">
            <div class="col-sm-8 mx-auto">
              <Form
              class="p-3"
              @submit="handleEditNhanVien"
              :validation-schema="addNhanVienFormSchema"
            >
              <h1 class="text-center">Cập Nhật Nhân viên</h1>
              <div class="row mx-auto">
                <div class="col-sm-6">
                  <div class="mt-4 mb-3">
                    <div class="col-sm-11 mx-auto">
                      <label class="form-label col-sm-3">Họ tên</label>
                      <Field
                        class="form-control"
                        name="hoten"
                        type="text"
                        v-model="nhanvien.hoten"
                        placeholder="Nhập họ tên nhân viên"
                      />
                      <ErrorMessage name="hoten" class="text-danger" />
                    </div>
                  </div>
                  <div class="mt-4 mb-3">
                    <div class="col-sm-11 mx-auto">
                      <label class="form-label col-sm-3">Tài khoản</label>
                      <Field
                        class="form-control"
                        name="taikhoan"
                        type="text"
                        v-model="nhanvien.taikhoan"
                        placeholder="Nhập tài khoản"
                      />
                      <ErrorMessage name="taikhoan" class="text-danger" />
                    </div>
                  </div>
                  <div class="mt-4 mb-3">
                    <div class="col-sm-11 mx-auto">
                      <label class="form-label col-sm-4">Số điện thoại</label>
                      <Field
                        class="form-control"
                        name="phone"
                        type="text"
                        v-model="nhanvien.sdt"
                        placeholder="Nhập số điện thoại nhà cung cấp"
                      />
                      <ErrorMessage name="phone" class="text-danger" />
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  
                  <div class="mt-4 mb-3">
                    <div class="col-sm-11 mx-auto">
                      <label class="form-label">Email</label>
                      <Field
                        class="form-control"
                        name="email"
                        type="email"
                        v-model="nhanvien.email"
                        placeholder="Nhập email"
                      />
                      <ErrorMessage name="email" class="text-danger" />
                    </div>
                  </div>
                  <div class="mb-4">
                    <div class="col-sm-11 mx-auto">
                      <label class="form-label">Địa chỉ</label>
                      <Field
                        as="textarea"
                        rows="3"
                        class="form-control"
                        name="diachi"
                        v-model="nhanvien.diachi"
                        placeholder="Nhập địa chỉ"
                      />
                      <ErrorMessage name="diachi" class="text-danger" />
                    </div>
                  </div>
                  <div class="mb-4">
                    <div class="col-sm-11 mx-auto">
                      <label>Role: </label>
                      <div class="form-check form-check-inline ms-3">
                        <Field
                          class="form-check-input"
                          type="radio"
                          v-model="nhanvien.role"
                          name="role"
                          value="Nhân viên"
                        />
                        <label class="form-check-label">Nhân viên</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <Field
                          class="form-check-input"
                          type="radio"
                          v-model="nhanvien.role"
                          name="role"
                          value="Admin"
                        />
                        <label class="form-check-label">Admin</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div class="mb-3">
                <div class="col-sm-8 mx-auto">
                  <button class="btn btn-primary form-control">
                    Cập nhật nhân viên
                  </button>
                </div>
              </div>
            </Form>
            </div>
            
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
  import nhanvienService from '../../services/nhanvien.service';
  export default {
    components: {
      Sidebar,
      AppNav,
      Form,
      Field,
      ErrorMessage,
    },
    data() {
      const addNhanVienFormSchema = yup.object().shape({
        hoten: yup.string().required('Tên không được để trống.'),
        taikhoan: yup.string().required('Tài khoản không được để trống.'),
        // matkhau: yup.string().required('Mật khẩu không được để trống.'),
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
        nhanvien: {
          hoten: '',
          taikhoan: '',
          //matkhau: '',
          email: '',
          sdt: '',
          diachi: '',
          role: 'Nhân viên',
        },
        nhaplaimatkhau: '',
        checkmk: false,
  
        addNhanVienFormSchema,
      };
    },
    async created() {
        const getNhanVien = await nhanvienService.getOneNhanVien(this.$route.params.id);
        console.log(getNhanVien)
        if(getNhanVien?.data?.code == 1){
            this.nhanvien = getNhanVien.data.nhanvien;
        }
    },
    methods: {
      async handleEditNhanVien() {
        
          const respone = await nhanvienService.updateNhanVien(this.$route.params.id, this.nhanvien);
          console.log(respone);
            if (respone.data.code == 1) {
              alert(respone.data.message);
              this.$router.push("/admin/nhanvien");
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
  