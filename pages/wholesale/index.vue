<template>
  <div class="container">
    <loading-page v-if="loading"></loading-page>
    <h2 class="text-center mt-2 mb-4">Wholesale</h2>
    <div class="row">
      <div class="col-12">
        <!-- SEARCH BAR -->
        <v-card width="100%" class="elevation-4 pa-5 rounded-lg">
          <v-row>
            <!-- SEARCH BY Wholesale Name -->
            <v-col cols="12" md="4" lg="4">
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    label="Wholesale Name"
                    placeholder="กรอกคำค้นหา"
                    dense
                    v-model.trim="filter.SupplierName"
                    outlined
                    clearable
                    hide-details="auto"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <!-- SEARCH BY Contact Name -->
            <v-col cols="12" md="4" lg="4">
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    label="Contact Name"
                    placeholder="กรอกคำค้นหา"
                    dense
                    v-model.trim="filter.ContactName"
                    outlined
                    clearable
                    hide-details="auto"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <!-- SEARCH BY Phone No  -->
            <!-- <v-col cols="12" md="4" lg="4">
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    label="Phone Number"
                    placeholder="กรอกเลข"
                    dense
                    v-model.trim="filter.PhoneNo"
                    outlined
                    clearable
                    hide-details="auto"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col> -->
            <!-- FILTER BY REGION -->
            <v-col cols="12" sm="4">
              <v-autocomplete
                v-model="filter.selectedRegion"
                :items="regions"
                item-text="RegionName"
                label="ภาค"
                @change="updateProvincesList"
                hide-details="auto"
                return-object
                outlined
                dense
                clearable
              ></v-autocomplete>
            </v-col>
            <!-- FILTER BY PROVINCE -->
            <v-col cols="12" sm="4">
              <v-autocomplete
                v-model="filter.selectedProvince"
                :items="provinces"
                item-text="ProvinceName"
                label="จังหวัด"
                @change="updateDistrictList"
                hide-details="auto"
                required
                return-object
                outlined
                dense
                clearable
              ></v-autocomplete>
            </v-col>
            <!-- FILTER BY DISTRICT -->
            <v-col cols="12" sm="4">
              <v-autocomplete
                v-model="filter.selectedDistrict"
                :items="districts"
                item-text="DistrictName"
                label="อำเภอ / เขต"
                hide-details="auto"
                return-object
                outlined
                dense
                clearable
              ></v-autocomplete>
            </v-col>
            <!-- SEARCH BUTTON -->
            <v-col cols="12" sm="4">
              <v-btn color="primary" @click="search">
                <v-icon>mdi-magnify</v-icon>
                Search
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-data-table
          :headers="headers"
          :items="wholesales"
          :options.sync="options"
          :server-items-length="totalItems"
          :loading="loading"
          :items-per-page="options.itemsPerPage"
          :footer-props="{ 'items-per-page-options': [] }"
          @update:options="onUpdateOptions"
          @click:row="goToWholesaleDetail"
        >
          <template v-slot:[`item.ProfileImageUrl`]="{ item }">
            <img :src="item.ProfileImageUrl" alt="Product Image" width="50" height="50" />
          </template>
          <template v-slot:[`item.WholesaleId`]="{ item }">
            <div style="min-width: 150px;">
              {{ item.WholesaleId }}
            </div>
          </template>
          <template v-slot:[`item.SupplierName`]="{ item }">
            <div style="min-width: 100px;">
              {{ item.SupplierName ?? 'N/a' }}
            </div>
          </template>
          <template v-slot:[`item.Address`]="{ item }">
            <div style="min-width: 250px;">
              {{ item.Address }} {{ item.Address2 }} {{ item.ProvinceName }} 
              {{ item.DistrictName }} {{ item.SubDistrictName }} {{ item.ZipCode }}
            </div>
          </template>
          <template v-slot:[`item.User`]="{ item }">
            <v-col cols="12">
              <div v-for="(owner, index) in item.OwnerName" :key="index" style="min-width: 200px;">
                <div>{{ item.Role == 'AM' ? 'owner' : 'assistance' }}: {{ formatName(item.ContactName) }}</div>
              </div>
            </v-col>
          </template>
          <template v-slot:[`item.MobileNo`]="{ item }">
            <v-col cols="12" style="min-width: 120px;">
              <div v-for="(phone, index) in item.MobileNo" :key="index">
                {{ formatMobileNo(phone) }}
              </div>
            </v-col>
          </template>
          <template v-slot:[`item.BusinessType`]="{ item }">
            <v-col cols="12" v-if="item.taxId" style="min-width: 120px;">
              นิติบุคคล
            </v-col>
            <v-col v-else>
              บุคคลธรรมดา
            </v-col>
          </template>
          <template v-slot:[`item.BankAccount`]="{ item }">
            <v-col cols="12" style="min-width: 200px;">
              <div> Bank : {{ item.BankAccount.Bank }}</div>
              <div> เลขบัญชี : {{ formatCitizenId(item.BankAccount.Account) }}</div>
            </v-col>
          </template>
          <template v-slot:[`item.actions`]="{ }">
            <v-btn color="primary" @click="goToOrderDetail">ดูเพิ่มเติม</v-btn>
          </template>
        </v-data-table>
        Content
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Province from '@/src/models/master/address/Province';
import District from '@/src/models/master/address/District';

export default {
  name: 'WholesaleDetail',
  data() {
    return {
      loading: false,
      searchKeyword: '',
      regions: [],
      provinces: [],
      districts: [],
      filter: {
        SupplierName: '',
        ContactName: '',
        PhoneNo: '',
        selectedRegion: null,
        selectedProvince: null,
        selectedDistrict: null,
      },
      headers: [
        { text: 'Profile', value: 'ProfileImageUrl' , sortable: false},
        { text: 'ชื่อร้านค้าขายส่ง', value: 'SupplierName' , sortable: false},
        { text: 'ประเภทธุรกิจ', value: 'BusinessType' , sortable: false},
        { text: 'ที่อยู่', value: 'Address' , sortable: false},
        { text: 'ข้อมูลติดต่อ', value: 'ContactName' , sortable: false},
        { text: 'รายการสั่งซื้อ', value: 'actions', sortable: false },
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
      totalItems: 0,
      wholesales: [],
    }
  },
  computed: {
    ...mapGetters('wholesale', {
      doneFetchWholesale: 'wholesaleList',
    }),
    ...mapGetters('master-data', {
      doneFetchRegion: 'regions',
    }),
  },
  watch: {
    doneFetchRegion(newValue) {
      this.regions = newValue;
    },
    doneFetchWholesale(newValue) {
      this.wholesales = newValue;
      this.totalItems = this.wholesales.length;
    },
    'filter.selectedRegion'(newVal) {
      if (!newVal) {
        this.filter.selectedProvince = null;
        this.filter.selectedDistrict = null;
      }
    },
    'filter.selectedProvince'(newVal) {
      if (!newVal) {
        this.filter.selectedDistrict = null;
      }
    },
  },
  async created() {
    this.regions = await this.doneFetchRegion;
    this.wholesales = await this.doneFetchWholesale;
    this.totalItems = this.wholesales.length;
    if(this.doneFetchWholesale.length == 0){
      this.search();
    }
  },
  methods: {
    ...mapActions('master-data', {
      fetchProvince: 'fetchProvinces',
      fetchDistrict: 'fetchDistricts',
    }),
    ...mapActions('wholesale',{
      fetchWholesale: 'fetchWholesales',
    }),
    // --- FILTER ADDRESS ----
    async updateProvincesList(){
      try {
        let responseData = await this.fetchProvince(this.filter.selectedRegion);
        let listProvinces = responseData.map(item => new Province({
          ProvinceId: item.ProvinceId ?? null,
          ProvinceName: item.ProvinceName ?? null,
        }));
        this.provinces = listProvinces;        
      } catch (error) {
        console.error('Error fetching provinces:', error);
      } finally {
        this.loading = false;
      }
    },
    async updateDistrictList(){
      try {
        let responseData = await this.fetchDistrict(this.filter.selectedProvince);
        let listDistricts = responseData.map(item => new District({
          DistrictId: item.DistrictId ?? null,
          DistrictName: item.DistrictName ?? null,
        }));
        this.districts = listDistricts;        
      } catch (error) {
        console.error('Error fetching districts:', error);
      } finally {
        this.loading = false;
      }
    },
    // --- SEARCH FUNCTION ---
    async search() {
      this.loading = true;
      let modifyParam = {
        ContactName: this.filter.ContactName ?? null,
        SupplierName: this.filter.SupplierName ?? null,
        DistrictId: this.filter.selectedDistrict ? this.filter.selectedDistrict.DistrictId : null,
        ProvinceId: this.filter.selectedProvince ? this.filter.selectedProvince.ProvinceId : null,
        RegionId: this.filter.selectedRegion ? this.filter.selectedRegion.RegionId : null,
        page: 1,
        pageSize: 50,
      };
      try {
        let responseData = await this.fetchWholesale(modifyParam);
        console.log(responseData)
      } catch (error) {
        console.error('Error fetching sub - district:', error);
      } finally {
        this.loading = false;
      }
    },

    onUpdateOptions(options) {
      this.options = options;
      // this.fetchOrder(); // Fetch new page data
    },

    // --- FORMAT / MASKING ---
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

    // --- REDIRECT FUNCTION ---
    goToOrderDetail(item) {
      console.log(item)
      this.$router.push({ name: 'order', params: { SupplierName: item.SupplierName } });
    },
    goToWholesaleDetail(item) {
      console.log(item)
      this.$router.push({ 
        path: '/wholesale/ws-detail', 
        query: { 
          SupplierName : item.SupplierName,
          SupplierId: item.SupplierId, 
        } 
      });
},
  }
}
</script>