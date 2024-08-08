<template>
  <div class="container">
    <loading-page v-if="isLoading"></loading-page>
    <h2 class="text-center mt-2 my-4">staff log</h2>
    <v-card class=" pa-3">
      <div  class="mt-2 pa-3">
        <date-filter-transaction
        :filter="dateFilter"
        :timeDisable="true"
      ></date-filter-transaction>
      </div>

 


  <div class="mt-4 pa-3">
    <v-btn color="primary" @click="getStaffLogs()">
      <v-icon left dark> mdi-magnify </v-icon>
      ค้นหา</v-btn
    >
  </div>
</v-card>
<v-card class="mt-4">
  <div v-if="result">
    <!-- <v-card class="pa-4 mt4 text-right">
     รวมยอดเงิน : {{ result.total_income | numberFormat  }}
    </v-card> -->
   
    <v-card class="elevation-3">
      <v-data-table
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :headers="header"
        :items="result.data"
        :server-items-length="result.total"
        :options.sync="options"
        :footer-props="{
          showFirstLastPage: true,
          'items-per-page-text': '',
          'items-per-page-options': [20, 50, 100],
        }"
      >
        <template #[`item.username`]="{ item }">
          <div>
            {{ item.username }}
          </div>
          <div v-if="item.ip">{{ item.ip }}</div>
        </template>
        <template #[`item.action`]="{ item }">
          <div class="d-flex justify-center">
          {{ item.action }}
          </div>
        
        </template>

        <template #[`item.device`]="{ item }">
        
          <div >
            {{ item.device }}
          </div>
        </template>
        <template #[`item.path`]="{ item }">
         
          <div >
            {{ item.path }}
          </div>
        </template>
        <template #[`item.created_at`]="{ item }">
        {{ item.created_at | dateFormat }}
        </template>
        <template #[`item.operator`]="{ item }">
          <div>
            {{ item.operator }}
          </div>
          <div>ล็อคอิน/แก้ไข ล่าสุด: {{ item.update_at | dateFormat }}</div>
          <div>สร้างเมื่อ: {{ item.created_at | dateFormat }}</div>
        </template>

     
      </v-data-table></v-card
    >
  </div>
</v-card>
   
 

  </div>
</template>

<script>
import { saveExcel } from "@progress/kendo-vue-excel-export";
import dayjs from "dayjs";
import DateFilterTransaction from "../components/DateFilterTransaction.vue";

import LoadingPage from "../components/LoadingPage.vue";
export default {
  components: {
    LoadingPage,
    DateFilterTransaction,
  },
  data() {
    return {
      rules: {
          required: value => !!value || 'กรุฯากรอกข้อมูล.',
          counterUsernamePassword: value => value.length <= 20 || 'ห้ามมากกว่า 20 ตัวอักษร',
          counterPhone: value => value.length > 10 || 'กรุณากรอกเบอร์โทรศัพท์ ให้ถูกต้อง อย่างน้อย 10 ตัวอักษร',
          phone: value => {
            const pattern = /[0-9]/
            return pattern.test(value) || 'กรุณากรอกเป็นตัวเลข'
          },
        },
      createStaffDialog:false,
  userData:{
    username:'',
    password:'',
    isAdmin:true,
    status:true,
    menu_permission:null,
    role:null,
    permission:null,
    phone:'',
    tfa_secret:null,
    tfa_status:true,
    ip:null,

operator:this.$store.state.auth.user
  },
      imgDialog:false,
      tempImg:"",
      isLoading: false,
      type: "DEPOSIT",
      dateFilter: {
        startDate: dayjs().toDate(),
        endDate: dayjs().toDate(),
      },
      role_options:[

      {text:'OWNER',value:'OWNER'},
      {text:'ADMIN',value:'ADMIN'}
    ],
    permission_options:[

        {text:'ดูข้อมูล',value:'read'},
        {text:'แก้ไข เปิดปิด  ระบบ / ฟีเจอร์ / lockdown',value:'write'},
        {text:'ผูก SCB',value:'scb'},
        {text:'ผูก AUTO',value:'deploy'},
        {text:'เติมเครดิต',value:'topup'},
        {text:'ตัดเครดิต',value:'deduct'},
        {text:'แก้ไขหน้าเว็บ',value:'dev'},
        {text:'ลงบันทึกค่าใช้จ่าย',value:'acc'},
      ],
      options: {},
      sortBy: "date",
      sortDesc: true,
      result: null,
      header: [
        {
          text: "username",
          value: "username",
          align: "center",
          sortable: false,
          cellClass: "font-weight-bold",
        },
        {
          text: "กระทำการ",
          value: "action",
          align: "center",
          sortable: true,
          cellClass: "font-weight-bold",
        },
        {
          text: "อุปกรณ์",
          value: "device",
          align: "center",
          sortable: false,
          cellClass: "font-weight-bold",
        },
        {
          text: "api path",
          value: "path",
          align: "center",
          sortable: true,
          cellClass: "font-weight-bold",
        },
        {
          text: "วัน/เวลา",
          value: "created_at",
          align: "center",
          sortable: true,
          cellClass: "font-weight-bold",
        },


      
      ],
      tempEdit:{id:''},
      changePasswordDialog:false
    };
  },
  watch: {
    options: {
    async  handler(context) {
        console.log("test", context);
        
       await this.getStaffLogs(context.page, context.itemsPerPage);
      
      },
    },
  },
  computed:{

  },
  async created() {
   await this.getStaffLogs()

  },
  methods: {

    async   changepassword(item) {
   this.tempEdit = item
   this.changePasswordDialog = true
    },
    async getStaffLogs(){
      this.isLoading = true
      try {
      let param = await this.getParameterHistory()
      const res = await this.$store.dispatch("setting/getStaffLogs",param);
      this.result = res
      this.isLoading = false
    } catch (error) {
      console.log(error);
      this.isLoading = false
    }
    },
    async saveUserData(item){
      this.isLoading = true
      try {

      await this.$store.dispatch("setting/saveUserData",item);
      this.$swal({
          icon: "success",
          title: "ดำเนินการสำเร็จ",
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 1500,
        });
      this.isLoading = false
    } catch (error) {
      console.log(error);
      this.isLoading = false
    }
  },
 async deleteUser(item){
  this.isLoading = true
      try {

      await this.$store.dispatch("setting/deleteUserData",item);
  
      this.isLoading = false
    } catch (error) {
      console.log(error);
      this.isLoading = false
    }
 },
   async createUser(){

    console.log(this.userData)
    this.isLoading = true
      try {

       await this.$store.dispatch("setting/createUserSupport",this.userData);
       this.$swal({
          icon: "success",
          title: "ดำเนินการสำเร็จ",
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 1500,
        });
        await this.getUserData()
      this.isLoading = false
    } catch (error) {
      console.log(error);
      this.isLoading = false
    }
   },
    addUser(){
      this.createStaffDialog = true
    },
   async saveItem(item){

  await this.saveUserData(this.tempEdit)
  item.id = null
this.isEdit(item)
this.changePasswordDialog = false
await this.getUserData()

    },
   async cancleItem(item){
    item.id = null

      await this.getUserData()
      this.isEdit(item)
    },
    editItem(item){
      this.tempEdit = item
    },
   async deleteItem(item){
await this.deleteUser(item)
this.$swal({
          icon: "success",
          title: "ดำเนินการสำเร็จ",
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 1500,
        });
await this.getUserData()
    },

    isEdit(item){
      if(!item) return true
      if(item.id == this.tempEdit.id) return false
      return true
    },
    showImage(img){
      this.tempImg = img
      this.imgDialog = true

    },
    async search() {
      let param = this.getParameterHistory();

      this.isLoading = true;

      try {
        let res = await this.$store.dispatch("setting/getTopupLogs", param);
        console.log(res);
        this.result = res;
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },

    getParameterHistory() {
      let params = {
        take: this.options.itemsPerPage ? this.options.itemsPerPage : 20,
        page: this.options.page ? this.options.page : 1,
        type: this.type ? this.type : "DEPOSIT",
        start: dayjs(this.dateFilter.startDate).format("YYYY-MM-DD"),
        end: dayjs(this.dateFilter.endDate).format("YYYY-MM-DD"),
      };
      return params;
    },
  },
};
</script>

<style></style>
