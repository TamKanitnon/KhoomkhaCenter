<template>
  <div class="container">
    <loading-page v-if="isLoading"></loading-page>
    <h2 class="text-center mt-2 mb-4">Refund</h2>
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
            :headers="headersRefund"
            :items="refundList"
            :options.sync="optionRefund"
            :server-items-length="totalItems"
            :loading="loading"
            :items-per-page="optionRefund.itemsPerPage"
            :footer-props="{ 'items-per-page-options': [] }"
            @update:options="onUpdateOptionRefund"
          >
            <template v-slot:[`item.Status`]="{ item }">
              <div v-if="item.Status == 'Approved'" class="text-success" >{{ item.Status ?? 'N/a' }}</div>
              <span v-if="item.Status == 'Not Approved'" class="text-error">{{ item.Status ?? 'N/a' }}</span>
              <span v-if="item.Status == 'Pending'" class="text-warning">{{ item.Status ?? 'N/a' }}</span>
            </template>
            <template v-slot:[`item.RefundDate`]="{ item }">
              {{ formatDate(item.RefundDate) }}
            </template>
            <template v-slot:[`item.action`]="{ }">
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
import Refund from '@/src/models/finance/Refund';
import SearchFilterReport from '@/components/SearchFilterReport';

export default {
  name: 'RefundPage',
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
      headersRefund: [
        { text: 'Order number', value: 'OrderNumber', align: 'center' },
        { text: 'Request', value: 'Customer' },
        { text: 'From', value: 'BuyFrom' },
        { text: 'Status', value: 'Status' },
        { text: 'Date', value: 'RefundDate', align: 'center' },
        { text: '', value: 'action', align: 'center' },
      ],
      optionRefund: {
        page: 1,
        itemsPerPage: 50,
        sortBy: [],
        sortDesc: [],
        groupBy: [],
        groupDesc: [],
        multiSort: false,
        mustSort: false,
      },
      refundList : [],
    };
  },
  created() {
    this.mockIn();
    console.log(this.refundList);
  },
  watch: {
  },
  methods: {
    ...mapActions("finance", {
      // fetchOptionRefund: 'fetchOptionOutMock',
      // fetchOptionOut: 'fetchOptionRefundMock',
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
    onUpdateOptionRefund(options){
      this.optionRefund = options;
      // this.fetchOptionRefund(); // Fetch new page data
    },
    onUpdateOptionOut(options){
      this.optionOut = options;
      // this.fetchOptionOut(); // Fetch new page data
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
    mockIn(){
      this.refundList = [
        new Refund({ OrderNumber: 'order-x001', Customer: 'Customer 1', BuyFrom: 'Shop 1', Status: 'Approved', RefundDate: new Date() }),
        new Refund({ OrderNumber: 'order-x002', Customer: 'Customer 2', BuyFrom: 'Shop 2', Status: 'Not Approved', RefundDate: new Date() }),
        new Refund({ OrderNumber: 'order-x003', Customer: 'Customer 3', BuyFrom: 'Shop 1', Status: 'Pending', RefundDate: new Date() }),
      ];
      this.totalItems = this.refundList.length;
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
