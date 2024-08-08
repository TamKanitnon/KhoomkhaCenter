<template>
  <div class="container">
    <loading-page v-if="isLoading"></loading-page>
    <h2 class="text-center mt-2 mb-4">Finance Summary</h2>
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
        <v-col cols="12" sm="6">
          <div class="mb-2"> Total item found : {{ totalItemsIn }} </div>
          <v-data-table
            :headers="headersIn"
            :items="payIn"
            :options.sync="optionIn"
            :server-items-length="totalItemsIn"
            :loading="loadingIn"
            :items-per-page="optionIn.itemsPerPage"
            :footer-props="{ 'items-per-page-options': [] }"
            @update:options="onUpdateOptionIn"
          >
            <template v-slot:[`item.PayAmount`]="{ item }">
              <div v-if="item.PayStatus == 'Approved'" class="text-success" >{{ item.PayAmount ?? '0' }}</div>
              <span v-if="item.PayStatus == 'Not Approved'" class="text-error">{{ item.PayAmount ?? '0' }}</span>
              <span v-if="item.PayStatus == 'Pending'" class="text-warning">{{ item.PayAmount ?? '0' }}</span>
            </template>
            <template v-slot:[`item.PayStatus`]="{ item }">
              <div v-if="item.PayStatus == 'Approved'" class="text-success" >{{ item.PayStatus ?? 'N/a' }}</div>
              <span v-if="item.PayStatus == 'Not Approved'" class="text-error">{{ item.PayStatus ?? 'N/a' }}</span>
              <span v-if="item.PayStatus == 'Pending'" class="text-warning">{{ item.PayStatus ?? 'N/a' }}</span>
            </template>
            <template v-slot:[`item.PayDate`]="{ item }">
              {{ formatDate(item.PayDate) }}
            </template>
          </v-data-table>
          <v-row>
            <v-col cols="12" align="center"><h3> Pay In </h3></v-col>
            <v-col cols="6">
              <PayCard />
              <PayCard />
            </v-col>
            <v-divider vertical class="display-sm"></v-divider>
            <v-col cols="6">
              <PayCard />
            </v-col>
          </v-row>
        </v-col>
        <v-divider vertical class="display-sm"></v-divider>
        <v-col cols="12" sm="6">
          <div class="mb-2"> Total item found : {{ totalItemsOut }} </div>
          <v-data-table
            :headers="headersOut"
            :items="payOut"
            :options.sync="optionOut"
            :server-items-length="totalItemsOut"
            :loading="loadingOut"
            :items-per-page="optionOut.itemsPerPage"
            :footer-props="{ 'items-per-page-options': [] }"
            @update:options="onUpdateOptionOut"
          >
            <template v-slot:[`item.BrandImgUrl`]="{ item }">
              <div class="" align="center">
                <img :src="item.BrandImgUrl" alt="Brand Image" width="50" height="50" />
              </div>
            </template>
            <template v-slot:[`item.PayAmount`]="{ item }">
              <div v-if="item.PayStatus == 'Approved'" class="text-success" >{{ item.PayAmount ?? '0' }}</div>
              <span v-if="item.PayStatus == 'Not Approved'" class="text-error">{{ item.PayAmount ?? '0' }}</span>
              <span v-if="item.PayStatus == 'Pending'" class="text-warning">{{ item.PayAmount ?? '0' }}</span>
            </template>
            <template v-slot:[`item.PayStatus`]="{ item }">
              <div v-if="item.PayStatus == 'Approved'" class="text-success" >{{ item.PayStatus ?? 'N/a' }}</div>
              <span v-if="item.PayStatus == 'Not Approved'" class="text-error">{{ item.PayStatus ?? 'N/a' }}</span>
              <span v-if="item.PayStatus == 'Pending'" class="text-warning">{{ item.PayStatus ?? 'N/a' }}</span>
            </template>
            <template v-slot:[`item.PayDate`]="{ item }">
              {{ formatDate(item.PayDate) }}
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Pay from '@/src/models/finance/Pay';
import SearchFilterReport from '@/components/SearchFilterReport';
import PayCard from './components/PayCard.vue';

export default {
  name: 'SummaryPage',
  components:{
    SearchFilterReport,
    PayCard,
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
      totalItemsIn: 0,
      loadingIn: false,
      headersIn: [
        { text: 'From', value: 'PayFrom', align: 'center' },
        { text: 'Amount', value: 'PayAmount' },
        { text: 'Status', value: 'PayStatus' },
        { text: 'By', value: 'PayBy' },
        { text: 'Date', value: 'PayDate', align: 'center' },
      ],
      optionIn: {
        page: 1,
        itemsPerPage: 50,
        sortBy: [],
        sortDesc: [],
        groupBy: [],
        groupDesc: [],
        multiSort: false,
        mustSort: false,
      },
      payIn : [],
      totalItemsOut: 0,
      loadingOut: false,
      headersOut: [
        { text: 'To', value: 'PayTo', align: 'center' },
        { text: 'Amount', value: 'PayAmount' },
        { text: 'Status', value: 'PayStatus' },
        { text: 'By', value: 'PayBy' },
        { text: 'Date', value: 'PayDate', align: 'center' },
      ],
      optionOut: {
        page: 1,
        itemsPerPage: 50,
        sortBy: [],
        sortDesc: [],
        groupBy: [],
        groupDesc: [],
        multiSort: false,
        mustSort: false,
      },
      payOut: [],
    };
  },
  created() {
    this.mockIn();
    this.mockOut();
    console.log(this.payIn);
    console.log(this.payOut);
  },
  watch: {
  },
  methods: {
    ...mapActions("finance", {
      // fetchOptionIn: 'fetchOptionOutMock',
      // fetchOptionOut: 'fetchOptionInMock',
    }),
    // --- SEARCH FUNCTION ---
    handleSearch(params) {
      console.log('Search params:', params);
      // Handle the search logic here, for example, call an API with the params
    },
    handleYesterday(params) {
      console.log('Yesterday params:', params);
      // Handle the logic for yesterday's filter here
    },
    handleToday(params) {
      console.log('Today params:', params);
      // Handle the logic for today's filter here
    },
    onUpdateOptionIn(options){
      this.optionIn = options;
      // this.fetchOptionIn(); // Fetch new page data
    },
    onUpdateOptionOut(options){
      this.optionOut = options;
      // this.fetchOptionOut(); // Fetch new page data
    },
    // --- OTHER FUNCTION ---
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
      this.payIn = [
        new Pay({ PayFrom: 'Customer 1', PayAmount: 10000, PayBy: 'Auto', PayStatus: 'Approved', PayDate: new Date() }),
        new Pay({ PayFrom: 'Customer 2', PayAmount: 5000, PayBy: 'Auto', PayStatus: 'Not Approved', PayDate: new Date() }),
        new Pay({ PayFrom: 'Customer 3', PayAmount: 20000, PayBy: 'Manual', PayStatus: 'Pending', PayDate: new Date() }),
      ];
      this.totalItemsIn = this.payIn.length;
    },
    mockOut(){
      this.payOut = [
        new Pay({ PayTo: 'Supplier 1', PayAmount: 10000, PayBy: 'Auto', PayStatus: 'Approved', PayDate: new Date() }),
        new Pay({ PayTo: 'Supplier 2', PayAmount: 5000, PayBy: 'Auto', PayStatus: 'Not Approved', PayDate: new Date() }),
        new Pay({ PayTo: 'Supplier 3', PayAmount: 20000, PayBy: 'Manual', PayStatus: 'Pending', PayDate: new Date() }),
      ];
      this.totalItemsOut = this.payOut.length;
    }
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
