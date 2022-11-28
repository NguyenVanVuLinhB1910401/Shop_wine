<template>
    <div class="container-fuild">
      <div>
          <NavbarKH/>
      </div>
      <div style="padding-top: 80px" class="px-3 pb-3">
          <h1>Lịch sử đặt hàng</h1><hr/>
          <div style="background:#E6E6FA" class="mt-3 p-2">
          <table class="table table-hover " >
            <tr>
              <th class="text-center">STT</th>
              <th id="tensp">Họ tên</th>
              <th>Tổng tiền</th>
              <th>Ngày đặt</th>
              <th>Trạng thái</th>
              <th>Action</th>
            </tr>
            <tr v-for="(dh, index) in lichsudathang" :key="dh._id">
              <td class="text-center">{{ index + 1 }}</td>
              <td>{{ dh.hoten }}</td>
              <td>
                {{
                  Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(dh.tongtien)
                }}
              </td>
              <td>{{ moment(dh.createAt).format('DD/MM/YYYY, h:mm:ss a') }}</td>
              <td>
                {{dh.trangthai}}
              </td>
              <td>
                <div class="">
                  <button @click="goToDetailDonHang(dh._id)" class="btn btn-secondary">
                    Chi tiết
                  </button>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div>
          <FooterKH/>
      </div>
    </div>
  </template>
  
  <script>
  import NavbarKH from "@/components/NavbarKhachHang.vue";
  import FooterKH from "@/components/FooterKhachHang.vue";
  import moment from 'moment';
import { mapGetters } from 'vuex';
  export default {
      components: {
          NavbarKH,
          FooterKH,
      },
      data(){
        return{
            moment,
            
        }
      },
      async created() {
        const respone = await this.$store.dispatch('lichSuDatHang',sessionStorage.getItem('taikhoan'))
      },
      computed: {
        ...mapGetters(['lichsudathang'])
      },
      methods: {
        goToDetailDonHang(id){
          this.$router.push({name: 'chitietdonhang', params: {id: id}})
        }
      }
  }
  </script>
  
  <style>
  
  </style>