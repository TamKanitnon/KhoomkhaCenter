<template>
  <div class="container">
    <loading-page v-if="isLoading"></loading-page>
    <h2 class="text-center mt-2 mb-4">Promotion</h2>
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
            <!-- <template v-slot:[`item.WholesaleProfileImageUrl`]="{ item }">
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
            </template>-->
            <template v-slot:[`item.isActive`]="{ item }" >
              <span :class="item.isActive ? 'text-success': 'text-error'">
                {{ item.isActive ? 'เปิด' : 'ปิด' }}
              </span>
            </template>
            <template v-slot:[`item.startDate`]="{ item }">
              {{ formatDate2(item.startDate) }}
            </template>
            <template v-slot:[`item.endDate`]="{ item }">
              {{ formatDate2(item.endDate) }}
            </template>
            <template v-slot:[`item.actions`]="{}">
              <v-btn color="primary" >ดูเพิ่มเติม</v-btn>
              <v-btn color="success" >แก้ไข</v-btn>
              <v-btn color="error" >ลบ</v-btn>
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
        { text: 'Promotion Name', value: 'PromotionName', align: 'center', align: 'center' },
        { text: 'Promotion Code', value: 'PromotionCode', align: 'center' },
        { text: 'Discount', value: 'Discount', align: 'center' },
        { text: 'isActive', value: 'isActive', align: 'center' },
        { text: 'Start', value: 'startDate', align: 'center' },
        { text: 'End', value: 'endDate', align: 'center' },
        { text: '', value: 'actions', align: 'center' },
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
    formatDate2(date) {
      const options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(new Date(date));
      return formattedDate.replace(',', '\n');
    },
    // -- MOCK --
    mockLoadData(){
      this.WholesaleIncomeList = [
        { PromotionName: 'Promotion 1', PromotionCode: 'CODE-001', Discount: '50',
          isActive: true, startDate: Date(-1), endDate: Date(), },
        { PromotionName: 'Promotion 2', PromotionCode: 'CODE-002', Discount: '100',
          isActive: false, startDate: Date(-5), endDate: Date(-3), },
        { PromotionName: 'Promotion 3', PromotionCode: 'CODE-003', Discount: '20',
          isActive: false, startDate: Date(-10), endDate: Date(-3), },
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
