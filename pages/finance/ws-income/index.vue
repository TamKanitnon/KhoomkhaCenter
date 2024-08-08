<template>
  <div class="container">
    <loading-page v-if="isLoading"></loading-page>
    <h2 class="text-center mt-2 mb-4">Wholesale Income</h2>
    <div class="row my-5">
      <v-row class="pa-2">
        <v-col cols="12">
          <SearchFilterReport
            :filter="filter"
            :searchinput="true"
            :showLastWeek="true"
            @search="handleSearch"
            @yesterday="handleYesterday"
            @week="handleWeek"
            @today="handleToday"
          />
        </v-col>
        <v-col cols="12">
          <div class="mb-2"> Total item found : {{ totalItems }} </div>
          <v-data-table
            :headers="headers"
            :items="WholesaleIncomeList"
            :options.sync="options"
            :server-items-length="totalItems"
            :loading="loading"
            :items-per-page="options.itemsPerPage"
            :footer-props="{ 'items-per-page-options': [] }"
            @update:options="onUpdateoptions"
          >
            <template v-slot:[`item.WholesaleProfileImageUrl`]="{ item }">
              <img :src="item.WholesaleProfileImageUrl" style="width: 50px; height: 50px;"/>
            </template>
            <template v-slot:[`item.WholesaleBankAcc`]="{ item }">
              <div>ธนาคาร : {{ item.WholesaleBankAcc.bank }}</div>
              <div>เลขบัญชี : {{ item.WholesaleBankAcc.accNumber }}</div>
            </template>
            <template v-slot:[`item.DeliveryStatus`]="{ item }">
              <div v-if="item.PayStatus == 'Approved'" class="text-success" >{{ item.DeliveryStatus ?? 'N/a' }}</div>
              <span v-if="item.PayStatus == 'Not Approved'" class="text-error">{{ item.DeliveryStatus ?? 'N/a' }}</span>
              <span v-if="item.PayStatus == 'Pending'" class="text-warning">{{ item.DeliveryStatus ?? 'N/a' }}</span>
            </template>
            <template v-slot:[`item.WholesaleIncome`]="{ item }">
              <div v-if="item.PayStatus == 'Approved'" class="text-success" >{{ item.WholesaleIncome ?? '0' }}</div>
              <span v-if="item.PayStatus == 'Not Approved'" class="text-error">{{ item.WholesaleIncome ?? '0' }}</span>
              <span v-if="item.PayStatus == 'Pending'" class="text-warning">{{ item.WholesaleIncome ?? '0' }}</span>
            </template>
            <template v-slot:[`item.PayStatus`]="{ item }">
              <div v-if="item.PayStatus == 'Approved'" class="text-success" >{{ item.PayStatus ?? 'N/a' }}</div>
              <span v-if="item.PayStatus == 'Not Approved'" class="text-error">{{ item.PayStatus ?? 'N/a' }}</span>
              <span v-if="item.PayStatus == 'Pending'" class="text-warning">{{ item.PayStatus ?? 'N/a' }}</span>
            </template>
            <template v-slot:[`item.action`]="{}">
              <v-btn color="primary" @click="handleViewDetail">ดูเพิ่มเติม</v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import WholesaleIncome from '@/src/models/finance/WholesaleIncome';
import SearchFilterReport from '@/components/SearchFilterReport';

export default {
  name: 'WholesaleIncomePage',
  components:{
    SearchFilterReport,
  },
  data() {
    return {
      isLoading: false,
      filter: {
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
        inputfilter: '',
      },
      totalItems: 0,
      loading: false,
      headers: [
        { text: 'Order Id', value: 'OrderId', align: 'center', align: 'center' },
        { text: 'Profile', value: 'WholesaleProfileImageUrl', align: 'center' },
        { text: 'Wholesale ID ', value: 'WholesaleId', align: 'center' },
        { text: 'ชื่อ - นามสกุล', value: 'WholesaleName', align: 'center' },
        { text: 'เบอร์โทร', value: 'WholesalePhone', align: 'center' },
        { text: 'บัญชี', value: 'WholesaleBankAcc', align: 'center' },
        { text: 'Status จัดส่ง', value: 'DeliveryStatus', align: 'center' },
        { text: 'ค่าจัดส่ง', value: 'WholesaleIncome', align: 'center' },
        { text: 'Status อนุมัติโอนเงิน', value: 'PayStatus', align: 'center' },
      ],
      options: {
        page: 1,
        itemsPerPage: 50,
        sortBy: [],
        sortDesc: [],
        groupBy: [],
        groupDesc: [],
        multiSort: false,
        mustSort: false,
      },
      WholesaleIncomeList : [],
    };
  },
  created() {
    this.mockLoadData();
    console.log(this.WholesaleIncomeList);
  },
  watch: {
  },
  methods: {
    ...mapActions("finance", {
      // fetchoptions: 'fetchOptionOutMock',
      // fetchOptionOut: 'fetchoptionsMock',
    }),
    // --- SEARCH FUNCTION ---
    handleSearch(params) {
      console.log('Search params:', params);
      // Handle the search logic here, for example, call an API with the params
    },
    handleWeek(params) {
      console.log('Last Week params:', params);
    },
    handleYesterday(params) {
      console.log('Yesterday params:', params);
      // Handle the logic for yesterday's filter here
    },
    handleToday(params) {
      console.log('Today params:', params);
      // Handle the logic for today's filter here
    },
    onUpdateoptions(options){
      this.options = options;
      // this.fetchoptions(); // Fetch new page data
    },
    // --- OTHER FUNCTION ---
    handleViewDetail(){
      console.log('View detail');
    },
    closeModal() {
      this.$emit('update:isDialogOpen', false); // Emit event to close dialog
      this.$emit('close'); // Emit close event to parent
    },
    updateDialogOpen(value) {
      this.$emit('update:isDialogOpen', value);
    },
    formatDate(date) {
      const options = { day: '2-digit', month: 'long', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(new Date(date));
      return formattedDate.replace(',', '\n');
    },
    // -- MOCK --
    mockLoadData(){
      this.WholesaleIncomeList = [
        new WholesaleIncome({ OrderId: 'order-x001', WholesaleProfileImageUrl: 'https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png', WholesaleId: 'Wholesale-x001',
          WholesaleName: 'Sean Wholesale', WholesalePhone: '08x-xxx-xxxx', WholesaleBankAcc: { bank: 'KBANK', accNumber: '75x-x-xxxxx-1'},
          DeliveryStatus: 'Success', WholesaleIncome: 90, PayStatus: 'Approved', }),
        new WholesaleIncome({ OrderId: 'order-x002', WholesaleProfileImageUrl: 'https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png', WholesaleId: 'Wholesale-x002',
          WholesaleName: 'John Pioneer', WholesalePhone: '08x-xxx-xxxx', WholesaleBankAcc: { bank: 'TTB', accNumber: '08x-xxx-xxx8'},
          DeliveryStatus: 'Fail', WholesaleIncome: 90, PayStatus: 'Not Approved', }),
        new WholesaleIncome({ OrderId: 'order-x003', WholesaleProfileImageUrl: 'https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png', WholesaleId: 'Wholesale-x001',
          WholesaleName: 'Sean Wholesale', WholesalePhone: '08x-xxx-xxxx', WholesaleBankAcc: { bank: 'KGB', accNumber: '82x-x-xxxxx-0'},
          DeliveryStatus: 'Delivering', WholesaleIncome: 90, PayStatus: 'Pending', }),
      ];
      this.totalItems = this.WholesaleIncomeList.length;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 100%;
}
.text-success{
  color: #33720d;
}
.text-warning{
  color: rgb(253, 128, 2);
}
.text-error{
  color: red;
}
</style>
