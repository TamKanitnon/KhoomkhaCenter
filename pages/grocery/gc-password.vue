<template>
  <div class="container">
    <loading-page v-if="loading"></loading-page>
    <h2 class="text-center mt-2 mb-4">Grocery Password</h2>
    <div class="row">
      <div class="col-12 ">
        <v-row class="mx-1 mb-3">
            <v-text-field
              v-model="searchKeyword"
              label="ค้นหา"
              hide-details="auto"
              dense
              outlined
            ></v-text-field>
            <v-btn class="ml-2" color="primary"><v-icon class="mr-1">mdi-magnify</v-icon> search</v-btn>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="mockData"
          :options.sync="options"
          :server-items-length="totalItems"
          :loading="loading"
          :items-per-page="options.itemsPerPage"
          :footer-props="{ 'items-per-page-options': [] }"
          @update:options="onUpdateOptions"
        >
        <!-- <v-data-table
          :headers="headers"
          :items="orders"
          :options.sync="options"
          :server-items-length="totalItems"
          :loading="loading"
          :items-per-page="options.itemsPerPage"
          :footer-props="{ 'items-per-page-options': [] }"
          @update:options="onUpdateOptions"
        > -->
          <template v-slot:[`item.LogoUrl`]="{ item }">
            <img :src="item.LogoUrl" alt="Product Image" width="50" height="50" />
          </template>
          <template v-slot:[`item.GroceryId`]="{ item }">
            <div style="min-width: 150px;">
              {{ item.GroceryId }}
            </div>
          </template>
          <template v-slot:[`item.GroceryName`]="{ item }">
            <div style="min-width: 100px;">
              {{ item.GroceryName }}
            </div>
          </template>          
          <template v-slot:[`item.BankAccount`]="{ item }">
            <v-col cols="12" style="min-width: 200px;">
              <div> Bank : {{ item.BankAccount.Bank }}</div>
              <div> เลขบัญชี : {{ formatCitizenId( item.BankAccount.Account ) }}</div>
            </v-col>
          </template>
        </v-data-table>
        Content
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapActions, mapGetters } from 'vuex';
import SearchFilter from '@/components/SearchFilter';

export default {
  name: 'GroceryPassword',
  components: {
    SearchFilter,
  },

  data() {
    return {
      loading: false,
      searchKeyword: '',
      headers: [
        { text: 'Logo', value: 'LogoUrl' , sortable: false},
        { text: 'ร้านค้า Id', value: 'GroceryId' , sortable: false},
        { text: 'ชื่อร้านค้าขายส่ง', value: 'GroceryName' , sortable: false},
        { text: 'Login โดย', value: 'LoginBy' , sortable: false},
        { text: 'Username', value: 'User' , sortable: false},
        { text: 'Password ปัจจุบัน', value: 'CurrentPassword' , sortable: false},
        { text: 'วันที่แก้ไข password ล่าสุด', value: 'UpdatedAt' , sortable: false},
        { text: '', value: 'action' , sortable: false},

      ],
      mockData: [
        { 
          LogoUrl: '',
          GroceryId: '12xx-xxxx-xxxx-1111',
          GroceryName: 'ทองชำทองดี มีโชค',
          LoginBy: 'Email / Google / Facebook',
          User: 'mock@data.com',
          CurrentPassword: 'xxxxpass',
          UpdatedAt : new Date() ,
        },
        { 
          LogoUrl: '',
          GroceryId: '12xx-xxxx-xxxx-1111',
          GroceryName: 'ทองชำทองดี มีโชค',
          LoginBy: 'Phone',
          User: '08x-xxx-xxxx',
          CurrentPassword: 'xxxxpass',
          UpdatedAt : new Date() ,
        },,
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
      filter: {
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
        inputfilter: '',
      },
      totalItems: 2,
      orders: [],

    }
  },
  computed: {
    ...mapGetters('product', {
      doneFetchProducts: 'products',
      refreshTotalItem: 'totalItem'
    })
  },
  watch: {

  },
  created() {
  },
  methods: {
    ...mapActions('product', {
      deleteProduct: 'deleteProductItem',
    }),
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
    onUpdateOptions(options) {
      this.options = options;
      // this.fetchOrder(); // Fetch new page data
    },
    formatName(name) {
      let [firstName, lastName] = name.split(' ');
      if (!lastName) lastName = '';
      return `${firstName} xxxx`;
    },
    formatCitizenId(citizenId) {
      if (!citizenId || citizenId.length < 4) return citizenId;
      const firstTwo = citizenId.slice(0, 2);
      const lastTwo = citizenId.slice(-2);
      const masked = 'X'.repeat(citizenId.length - 4);
      return `${firstTwo}${masked}${lastTwo}`;
    },
    formatMobileNo(phone) {
      if (!phone || phone.length < 4) return phone;
      const firstThree = phone.slice(0, 3);
      const masked = 'X'.repeat(phone.length - 3);
      return `${firstThree}-${masked}`;
    },
  }
}
</script>