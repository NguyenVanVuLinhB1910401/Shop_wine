import { createStore } from 'vuex';
import nhanvien from './modules/nhanvien';
import khachhang from './modules/khachhang';
export default createStore({
  modules: {
    nhanvien,
    khachhang,
  }
})
