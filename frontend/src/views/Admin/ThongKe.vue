<template>
  <div id="HomePage">
    <div class="container-fuild">
      <AppNav />
      <div class="row m-0 p-0">
        <div class="col-md-2 m-0 p-0">
          <Sidebar />
        </div>
        <div class="col-md-10" style="padding-top: 40px">
            <h1>Thống Kê Doanh Thu</h1><hr/>
          <div id="bieudo">
            <Bar
              :chart-options="chartOptions"
              :chart-data="chartData"
              :chart-id="chartId"
              :dataset-id-key="datasetIdKey"
              :plugins="plugins"
              :css-classes="cssClasses"
              :styles="styles"
              :width="width"
              :height="height"
            />
          </div>
        </div>
      </div>
      <!-- <Footer/> -->
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import AppNav from '@/components/Navbar.vue';
import { mapActions, mapGetters } from 'vuex';
import Footer from '../../components/FooterKhachHang.vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import orderNhanVienService from '../../services/orderNhanVien.service';
import moment from 'moment';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: 'BarChart',
  components: { Bar, Sidebar, AppNav, Footer },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [Title],
    },
  },
  data() {
    return {
      chartData: {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
          {
            data: [],
            backgroundColor: '#f87979',
            label: 'đơn vị (triệu đồng)',
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text:
              'Thống kê doanh thu trong năm ' +
              new Date().getFullYear() +
              ' theo tháng ',
          },
        },
      },
    };
  },
  async created() {
    const respone = await orderNhanVienService.getAllDonHangDaGiaoHang();
    console.log(respone);
    if (respone.data.code == 1) {
      const dh = respone.data.donhang;
      const namHienTai = new Date().getFullYear();
      console.log(typeof namHienTai);
      const newDH = [];
      for (let i = 0; i <= dh.length; i++) {
        //console.log(new Date(dh[i]?.createAt).getFullYear())
        const getNamDonHang = new Date(dh[i]?.createAt).getFullYear();
        if (getNamDonHang == namHienTai) {
          newDH.push(dh[i]);
        }
      }
      //console.log(this.chartData.datasets[0].data[0])
      for (let i = 0; i <= 11; i++) {
        this.chartData.datasets[0].data[i] = 0;
        for (let j = 0; j <= newDH.length; j++) {
          const getThangDH = new Date(newDH[j]?.createAt).getMonth();
          if (getThangDH == i) {
            this.chartData.datasets[0].data[i] +=
              parseFloat(newDH[j].tongtien) / 1000000;
          }
        }
        console.log(
          'Tổng tiền của tháng ' + i + ': ' + this.chartData.datasets[0].data[i]
        );
      }
    }
  },
};
</script>
<style>
#thongke {
  height: auto;
  width: 100%;
}
#bieudo {
  height: 100vh;
  overflow-y: auto;
  width: 100%;
  padding: 0 10px;
}
</style>
