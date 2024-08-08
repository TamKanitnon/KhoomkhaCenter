<template>
  <div class="container">
    <loading-page v-if="isLoading"></loading-page>
    <h2 class="text-center mt-2 my-4">พนักงาน</h2>

    <!-- <div class="mt-4 pa-2">
      <v-radio-group v-model="type" label="ประเภท" inline>
        <v-radio label="ทั้งหมด" value="ALL"></v-radio>
        <v-radio label="เติม" value="DEPOSIT"></v-radio>
        <v-radio label="ตัด" value="WITHDRAW"></v-radio>
      </v-radio-group>
    </div> -->

    <!-- <div class="mt-4 pa-2 col-sm-6">
      <v-btn color="green lighten-1" dark depressed @click="search">
        ค้นหา
      </v-btn>
    </div> -->

    <div v-if="result">
      <!-- <v-card class="pa-4 mt4 text-right">
       รวมยอดเงิน : {{ result.total_income | numberFormat  }}
      </v-card> -->
      <v-card class="pa-3 mt-2">
        <v-btn class="mt-4 mb-2" color="blue" @click="addUser"
          >สร้างพนักงาน</v-btn
        >
      </v-card>
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
            <div v-if="item.ip">IP: {{ item.ip }}</div>
          </template>
          <template #[`item.status`]="{ item }">
            <div class="d-flex justify-center">
              <v-switch
                :disabled="isEdit(item)"
                hide-details="auto"
                v-model="item.status"
                :label="` ${item.status ? 'เปิด' : 'ปิด'}`"
              ></v-switch>
            </div>
            <div v-if="!isEdit(item)">
              <v-btn
                color="black"
                @click="changepassword(item)"
                dark
                rounded
                small
                class="my-2"
              >
                <v-icon left>mdi-lock-reset</v-icon>เปลี่ยนรหัส
              </v-btn>
            </div>
          </template>

          <template #[`item.role`]="{ item }">
            <div v-if="!isEdit(item)">
              <v-select
                :items="role_options"
                v-model="item.role"
                label="role"
              ></v-select>
            </div>
            <div v-else>
              {{ item.role }}
            </div>
          </template>
          <template #[`item.permission`]="{ item }">
            <div v-if="!isEdit(item)">
              <v-select
                clearable
                multiple
                :items="permission_options"
                v-model="item.permission"
                label="permission"
              ></v-select>
            </div>
            <div v-else>
              {{ item.permission }}
            </div>
          </template>
          <template #[`item.phone`]="{ item }">
            <div v-if="!isEdit(item)">
              <v-text-field
                clearable
                v-model="item.phone"
                label="phone"
              ></v-text-field>
            </div>
            <div v-else>
              {{ item.phone }}
            </div>
          </template>
          <template #[`item.operator`]="{ item }">
            <div>
              {{ item.operator }}
            </div>
            <div>ล็อคอิน/แก้ไข ล่าสุด: {{ item.update_at | dateFormat }}</div>
            <div>สร้างเมื่อ: {{ item.created_at | dateFormat }}</div>
          </template>

          <template #[`item.action`]="{ item }">
            <span v-if="!isEdit(item)" class="mt-2"
              ><v-btn color="blue" class="mt-2" @click="saveItem(item)"
                >save</v-btn
              ></span
            >
            <span v-if="!isEdit(item)" class="mt-2"
              ><v-btn color="red" class="mt-2" @click="cancleItem(item)"
                >cancle</v-btn
              ></span
            >
            <span v-if="isEdit(item)" class="mt-2"
              ><v-btn color="yellow" class="mt-2" @click="editItem(item)"
                >แก้ไข</v-btn
              ></span
            >
            <span v-if="isEdit(item)" class="mt-2"
              ><v-btn color="grey" class="mt-2" @click="deleteItem(item)"
                >ลบ</v-btn
              ></span
            >
          </template>
        </v-data-table></v-card
      >
    </div>
    <v-dialog width="50%" v-model="changePasswordDialog">
      <v-card>
        <h2 class="text-center">change password</h2>
        <div class="text-center pa-4" style="width: 300px">
          <v-text-field
            label="รหัสใหม่"
            type="password"
            outlined
            v-model="tempEdit.password"
            dense
            hide-details="auto"
            rounded
          ></v-text-field>
        </div>
        <div class="pa-4">
          <v-btn color="success" @click="saveItem(tempEdit)" rounded
            >เปลี่ยนรหัสผ่าน</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
    <v-dialog width="80%" v-model="createStaffDialog">
      <v-card class="pa-4">
        <v-card-title> <h4>เพิ่มพนักงาน</h4></v-card-title>
        <v-form fast-fail @submit.prevent>
          <v-row>
            <v-col cols="2">
              <div>
                <v-text-field
                  :rules="[rules.required, rules.counterUsernamePassword]"
                  name="USERNAME"
                  dense
                  outlined
                  clearable
                  required
                  v-model="userData.username"
                  label="USERNAME"
                  hide-details="auto"
                ></v-text-field>
              </div>
            </v-col>
            <v-col cols="2">
              <div>
                <v-text-field
                  :rules="[rules.required, rules.counterUsernamePassword]"
                  name="password"
                  dense
                  outlined
                  clearable
                  required
                  v-model="userData.password"
                  label="password"
                  hide-details="auto"
                ></v-text-field>
              </div>
            </v-col>
            <v-col cols="2">
              <div>
                <v-text-field
                  :rules="[rules.required, rules.counterPhone, rules.phone]"
                  name="phone"
                  dense
                  outlined
                  clearable
                  required
                  v-model="userData.phone"
                  label="phone"
                  hide-details="auto"
                ></v-text-field>
              </div>
            </v-col>
            <v-col cols="2">
              <div>
                <v-select
                  :rules="[rules.required]"
                  required
                  :items="role_options"
                  v-model="userData.role"
                  label="role"
                ></v-select>
              </div>
            </v-col>
            <v-col cols="4">
              <div>
                <v-select
                  clearable
                  multiple
                  :rules="[rules.required]"
                  required
                  :items="permission_options"
                  v-model="userData.permission"
                  label="permission"
                ></v-select>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="d-flex justify-center">
              <v-btn
                type="submit"
                color="green"
                @click="createUser"
                class="mt-2"
                >ยืนยัน</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
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
          text: "สถานะ",
          value: "status",
          align: "center",
          sortable: true,
          cellClass: "font-weight-bold",
        },
        {
          text: "role",
          value: "role",
          align: "center",
          sortable: false,
          cellClass: "font-weight-bold",
        },
        {
          text: "permission",
          value: "permission",
          align: "center",
          sortable: true,
          cellClass: "font-weight-bold",
        },
        {
          text: "phone",
          value: "phone",
          align: "center",
          sortable: true,
          cellClass: "font-weight-bold",
        },


        {
          text: "ผู้แก้ไข/สร้าง",
          value: "operator",
          align: "center",
          sortable: false,
          cellClass: "font-weight-bold",
        },


        {
          text: "action",
          value: "action",
          align: "center",
          sortable: false,
          cellClass: "font-weight-bold",
        },
      ],
      tempEdit:{id:''},
      changePasswordDialog:false
    };
  },
  watch: {
    options: {
      handler(context) {
        console.log("test", context);
        // if (this.select) {
        //   this.getCreditLog(context.page, context.itemsPerPage);
        // }
      },
    },
  },
  computed:{

  },
  async created() {
   await this.getUserData()

  },
  methods: {

    async   changepassword(item) {
   this.tempEdit = item
   this.changePasswordDialog = true
    },
    async getUserData(){
      this.isLoading = true
      try {
      let param = await this.getParameterHistory()
      const res = await this.$store.dispatch("setting/getSupportUser",param);
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
