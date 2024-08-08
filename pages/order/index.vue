<template>
  <div class="container">
    <loading-page v-if="loading"></loading-page>
    <h2 class="text-center mt-2 mb-4">Order</h2>
    <div class="row">
      <div class="col-12 ">
        <!-- SEARCH BAR -->
        <v-card width="100%" class="elevation-4 pa-5 rounded-lg">
          <v-row>
            <!-- SEARCH BY ORDER -->
            <v-col cols="12" md="4" lg="4">
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    label="Order Number"
                    placeholder="กรอกคำค้นหา"
                    dense
                    v-model.trim="filter.orderNumber"
                    outlined
                    clearable
                    hide-details="auto"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <!-- SEARCH BY WHOLESALE ID -->
            <v-col cols="12" md="4" lg="4">
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    label="Wholesale Name"
                    placeholder="กรอกคำค้นหา"
                    dense
                    v-model.trim="filter.wholesaleName"
                    outlined
                    clearable
                    hide-details="auto"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <!-- SEARCH BY GROCERY ID -->
            <v-col cols="12" md="4" lg="4">
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    label="Grocery Number"
                    placeholder="กรอกคำค้นหา"
                    dense
                    v-model.trim="filter.groceryName"
                    outlined
                    clearable
                    hide-details="auto"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <!-- SELECTE FILTER STATUS -->
            <v-col cols="12" md="4" lg="4">
              <v-row>
                <v-col cols="12" md="12">
                  <v-select
                    v-model="filter.orderStatus"
                    :items="listOrderStatus"
                    label="Order status"
                    hide-details="auto"
                    required
                    outlined
                    dense
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="8"></v-col>
            <v-col cols="12" md="6" lg="6">
              <v-row>
                <!-- START DATE -->
                <v-col cols="12">
                  <v-row align="baseline" class="pl-4">
                    <p>เริ่ม</p>
                    <v-col cols="7">
                      <el-date-picker
                        class="full-width"
                        v-model.trim="filter.startDate"
                        arrow-control
                        placeholder="วันที่"
                        style="width: 100%"
                      />
                    </v-col>
                    <v-col>
                      <el-time-picker
                        class="full-width"
                        v-model.trim="filter.startTime"
                        format="HH:mm"
                        arrow-control
                        placeholder="เวลา"
                        style="width: 100%"
                      >
                      </el-time-picker>
                    </v-col>
                  </v-row>
                </v-col>
                <!-- END DATE -->
                <v-col cols="12">
                  <v-row align="baseline"  class="pl-4">
                    <p>ถึง</p>
                    <v-col cols="7">
                      <el-date-picker
                        class="full-width"
                        v-model.trim="filter.endDate"
                        arrow-control
                        placeholder="วันที่"
                        style="width: 100%"
                      />
                    </v-col>
                    <v-col>
                      <el-time-picker class="full-width" v-model.trim="filter.endTime" format="HH:mm" arrow-control
                        placeholder="เวลา" style="width: 100%">
                      </el-time-picker>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-divider vertical class="display-mb"></v-divider>
            <v-col cols="12" md="6" lg="6">
              <v-row>
                <!-- AUTO FILL - DATE FILTER -->
                <v-col cols="12" class="d-flex">
                  <v-btn color="success" class="mx-1" dark @click="setLastweek()">
                    <v-icon left>mdi-menu-left</v-icon>อาทิตย์
                  </v-btn>
                  <v-btn color="success" class="mx-1" dark @click="setYesterday()">
                    <v-icon left>mdi-menu-left</v-icon> เมื่อวาน
                  </v-btn>
                  <v-btn color="warning" class="mx-1" @click="setToday()">
                    วันนี้<v-icon right>mdi-circle-medium</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="4" md="3" class="d-flex">
                  <v-btn color="primary" @click="search()">
                    <v-icon left dark> mdi-magnify </v-icon> ค้นหา
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
        <!-- DATA TABLE -->
        <v-data-table
          :headers="headers"
          :items="orders"
          :options.sync="options"
          :server-items-length="totalItems"
          :loading="loading"
          :items-per-page="options.itemsPerPage"
          :footer-props="{ 'items-per-page-options': [] }"
          @update:options="onUpdateOptions"
        >
          <!-- <template v-slot:[`item.ImgUrl`]="{ item }">
            <img :src="item.ImgUrl" alt="Product Image" width="50" height="50" />
          </template> -->
        </v-data-table>
        <v-btn @click="goToOrderDetail">order detail view</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'OrderPage',
  components: {
  },
  props: {
    inputOrderNumber: {
      type: String,
      default: null
    },
    inputOrderStatus: {
      type: String,
      default: null
    },
    inputWholesaleName: {
      type: String,
      default: null
    },
    inputGroceryName: {
      type: String,
      default: null
    },
    keyword: ""
  },
  data() {
    return {
      loading: false,
      headers: [
        { text: 'Order Id', value: 'OrderNumber' , sortable: false},
        { text: 'Customer Id', value: 'CustomerId' , sortable: false},
        { text: 'ชื่อร้านค้า/ชื่อลูกค้า', value: 'CustomerName' , sortable: false},
        { text: 'ร้านค้า Id', value: 'StoreId' , sortable: false},
        { text: 'ชื่อร้านค้าขายส่ง', value: 'StoreName' , sortable: false},
        { text: 'วันที่สั่งซื้อ', value: 'OrderDate' , sortable: false},
        { text: 'สถานะการจ่ายเงิน', value: 'PaymentStatus' , sortable: false},
        { text: 'ขนส่งโดย', value: 'DeliveryBy' , sortable: false},
        { text: 'วันที่ส่งของ', value: 'DeliveryStartDate' , sortable: false},
        { text: 'สถานะการจัดส่ง', value: 'DeliveryStatus' , sortable: false},
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
        orderNumber: '',
        orderStatus: null,
        wholesaleName: '',
        groceryName: '',
      },
      totalItems: 0,
      orders: [],
      listOrderStatus: [
        'All',
        'Cancel',
        'Unpaid',
        'Pending',
      ],
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
    if(this.inputOrderNumber) this.filter.orderNumber = this.inputOrderNumber;
    if(this.inputOrderStatus) this.filter.orderStatus = this.inputOrderStatus;
    if(this.inputWholesaleName) this.filter.wholesaleName= this.inputWholesaleName;
    if(this.inputGroceryName) this.filter.groceryName = this.inputGroceryName;
  },
  methods: {
    ...mapActions('order', {
    }),
    // --- SEARCH BAR FUNCTION ----
    getDateTime(date, time) {
      let dateFormat = "YYYY-MM-DD";
      let timeFormat = "HH:mm:ss";
      return this.$moment(
        `${this.$moment(date).format(dateFormat)} ${this.$moment(time).format(
          timeFormat
        )}`,
        "YYYY-MM-DD HH:mm:ss"
      )
        .utc()
        .format(`${dateFormat} ${timeFormat}`);
    },
    getFilterParameter() {
      let start = undefined;
      let end = undefined;
      if (this.filter.startDate) {
        if (this.filter.startTime) {
          start = this.getDateTime(
            this.filter.startDate,
            this.filter.startTime
          );
        } else {
          start = this.getDateTime(
            this.filter.startDate,
            new Date().setHours(0, 0, 0, 0)
          );
        }
      }
      if (this.filter.endDate) {
        if (this.filter.endTime) {
          end = this.getDateTime(this.filter.endDate, this.filter.endTime);
        } else {
          end = this.getDateTime(
            this.filter.endDate,
            new Date().setHours(23, 59, 59, 999)
          );
        }
      }
      let params = {
        startDate: this.$moment(start).format("YYYY-MM-DD HH:mm:ss") + "Z",
        endDate: this.$moment(end).format("YYYY-MM-DD HH:mm:ss") + "Z",
        search: this.filter.orderNumber
      };
      return params;
    },
    setLastweek() {
      let params = {
        startDate: dayjs()
          .add(-7, "day")
          .startOf("day")
          .toISOString(),
        endDate: dayjs()
          .add(0,"day")
          .endOf("day")
          .toISOString(),
        search: this.filter.orderNumber
      };
      this.filter.startDate = params.startDate;
      this.filter.startTime = params.startDate;
      this.filter.endDate = params.endDate;
      this.filter.endTime = params.endDate;
      return params;
    },
    setYesterday() {
      let params = {
        startDate: dayjs()
          .add(-1, "day")
          .startOf("day")
          .toISOString(),
        endDate: dayjs()
          .add(0 , "day")
          .endOf("day")
          .toISOString(),
        search: this.filter.orderNumber
      };
      this.filter.startDate = params.startDate;
      this.filter.startTime = params.startDate;
      this.filter.endDate = params.endDate;
      this.filter.endTime = params.endDate;
      return params;
    },
    setToday() {
      let params = {
        startDate: dayjs()
          .startOf("day")
          .toISOString(),
        endDate: dayjs()
          .endOf("day")
          .toISOString(),
        search: this.filter.orderNumber
      };
      this.filter.startDate = params.startDate;
      this.filter.startTime = params.startDate;
      this.filter.endDate = params.endDate;
      this.filter.endTime = params.endDate;
      return params;
    },
    search() {
      let response = this.getFilterParameter();
      console.log(response);
      this.$emit("search", response);
    },


    //  --- DATA TABLE FUNCTION ---
    onUpdateOptions(options) {
      this.options = options;
      // this.fetchOrder(); // Fetch new page data
    },

    // --- REDIRECT PAGE ---
    goToOrderDetail(item) {
      console.log(item)
      this.$router.push({ 
        path: '/order/order-detail', 
        query: { 
          OrderName : 'order-x001',
          OrderId: 'Order-X001', 
        } 
      });
    },
  }
}
</script>