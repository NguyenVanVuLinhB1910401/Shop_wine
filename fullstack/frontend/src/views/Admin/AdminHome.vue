<template>
  <div id="HomePage">
    <div class="container-fuild">
      <AppNav/>
      <div class="row m-0 p-0">
        <div class="col-md-2  m-0 p-0">
          <Sidebar/>
        </div>
        <div class="col-md-10" style="padding-top: 40px;">
          <h1>Trang chủ</h1><hr/>
        </div>
      </div>
      <!-- <Footer/> -->
    </div>
  </div>
  
</template>

<script>
  import Sidebar from "@/components/Sidebar.vue";
  import AppNav from "@/components/Navbar.vue";
  import { mapActions, mapGetters } from "vuex";
import Footer from "../../components/FooterKhachHang.vue";
    export default {
      components: {
          Sidebar,
          AppNav,
          Footer
      },
      data() {
        return {
          
        }
      },
      computed: {
        ...mapGetters(['nhanvien']),
      },
  
      // methods: {
      //    async submited(){
      //       try {
      //       this.user = await AuthService.login({email: this.email, password: this.password});
      //       return this.user = this.user.data;
      //       } catch(err) {
      //         console.log(err);
      //       }
      //   },
      //   async getUser(){
      //     try {
      //       this.user = await AuthService.getUser();
      //       return this.user = this.user.data;
      //       } catch(err) {
      //         console.log(err);
      //       }
      //   }
      // }

    }
</script>

<style scoped>
#HomePage {
  min-height: 100vh;
}
</style>