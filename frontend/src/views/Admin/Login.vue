<template>
  <div id="AdminLoginPage">
    <Form class="col-sm-4 p-3" id="formLogin" @submit="handleDangNhap" :validation-schema="loginFormSchema">
        <h1 class="text-center">ĐĂNG NHẬP</h1>
        <div class="mt-4 mb-3" >
            <div class="col-sm-8 mx-auto">
                <label class="form-label col-sm-3">Tài khoản</label>
                <Field class="form-control" name="taikhoan" type="text" v-model="taikhoan" placeholder="Nhập tài khoản"/>
                <ErrorMessage name="taikhoan" class="text-danger" />
            </div>
        </div>
        <div class="mb-4">
            <div class="col-sm-8 mx-auto">
                <label class="form-label col-sm-3">Mật khẩu</label>
                <Field class="form-control" name="matkhau" type="password" v-model="matkhau" placeholder="Nhập mật khẩu"/>
                <ErrorMessage name="matkhau" class="text-danger" />
            </div>  
        </div>
        <div class="mb-3">
            <div class="col-sm-8 mx-auto">
                <button class="btn btn-primary form-control">Đăng nhập</button>
            </div>
        </div>
        
    </Form> 
  </div>
</template>

<script>
import * as yup from "yup"; 
import { Form, Field, ErrorMessage } from "vee-validate";
import { mapGetters, mapActions } from "vuex";
import AuthNhanVienService from "@/services/authNhanVien.service";
export default {
    name: "login",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const loginFormSchema = yup.object().shape({ 
            taikhoan: yup 
                .string() 
                .required("Tên khoản không được để trống.") 
                .min(4, "Tài khoản phải ít nhất 4 ký tự.") 
                .max(20, "Tài có nhiều nhất 20 ký tự."), 
            matkhau: yup 
                .string() 
                .required("Mật khẩu không được để trống.")
                .max(30, "Mật khẩu tối đa 30 ký tự."),
        });
        return {
            loginFormSchema,
            taikhoan: '',
            matkhau: '',
            
        }
    },
    methods: {
        async handleDangNhap() {
            const respone = await this.$store.dispatch("nhanVienDangNhap",{taikhoan: this.taikhoan,matkhau: this.matkhau});
            console.log(respone);
            if(respone?.code == 1){
                
                this.$router.push("/admin");
            }
        }
    }
}
</script>

<style scoped>
#AdminLoginPage {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>