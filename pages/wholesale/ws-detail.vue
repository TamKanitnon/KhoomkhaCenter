<template>
  <div class="container">
    <loading-page v-if="loading"></loading-page>
    <div>
      <v-btn color="primary" @click="handleBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>
    <h2 class="text-center mt-2 mb-4">Wholesale Detail</h2>
    <div class="d-flex justify-center">
      <v-col cols="12" sm="10" v-if="wholesale">
        <v-row class="mx-1 mb-3" justify="center">
          <img v-if="wholesale.ProfileImage" :src="wholesale.ProfileImage" width="200" height="200" alt="Wholesale Profile Image" />
          <img src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1719187200&semt=sph" width="200" height="150" alt="Wholesale Profile Image" />
        </v-row>
        <v-row class="mx-1 mb-3">
          <v-col cols="2">ชื่อร้านค้า</v-col>
          <v-col cols="10">
            <v-text-field
              label="ชื่อร้านค้า"
              dense
              v-model.trim="wholesale.StoreName"
              outlined
              readonly
              hide-details="auto"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row class="mx-1 mb-3">
          <v-col cols="2">ชื่อจริง</v-col>
          <v-col cols="10">
            <v-text-field
              label="ชื่อร้านค้า"
              dense
              v-model.trim="wholesale.FirstName"
              outlined
              readonly
              hide-details="auto"
            >
            </v-text-field> 
          </v-col>
        </v-row>
        <v-row class="mx-1 mb-3">
          <v-col cols="2">นามสกุล</v-col>
          <v-col cols="10">
            <v-text-field
              label="ชื่อร้านค้า"
              dense
              v-model.trim="wholesale.LastName"
              outlined
              readonly
              hide-details="auto"
            >
            </v-text-field> 
          </v-col>
        </v-row>
        <v-row class="mx-1 mb-3">
          <v-col cols="2">Email</v-col>
          <v-col cols="10">
            <v-text-field
              label="ชื่อร้านค้า"
              dense
              v-model.trim="wholesale.Email"
              outlined
              readonly
              hide-details="auto"
            >
            </v-text-field> 
          </v-col>
        </v-row>
        <v-row class="mx-1 mb-3">
          <v-col cols="2">หมายเลขโทรศัพท์</v-col>
          <v-col cols="10">
            <v-text-field
              label="ชื่อร้านค้า"
              dense
              v-model.trim="wholesale.MobileNo"
              outlined
              readonly
              hide-details="auto"
            >
            </v-text-field> 
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'WholesaleDetail',
  data() {
    return {
      loading: false,
      wholesale: null,
    }
  },
  computed: {
    ...mapGetters('wholesale', {
      doneFetchDetailWholesale: 'detailWholesale',
    }),
  },
  watch: {
    doneFetchDetailWholesale(newValue) {
      this.wholesale = newValue;
    },
  },
  async created() {
    console.log(this.$route.query.SupplierId);
    this.loading = true;
    try{
      let response = await this.fetchDetailWholesale(this.$route.query.SupplierId);
      if(response.isSuccessful){
        this.wholesale = {
          ...response.data,
          StoreName: this.$route.query.SupplierName
        }
        console.log(this.wholesale);
        this.loading = false;
      }
      console.log(response);
    }catch(error){
      this.$router.back();
    }
  },
  methods: {
    ...mapActions('wholesale', {
      fetchDetailWholesale: 'fetchWholesale',
    }),
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
    handleBack(){
      this.$router.back();
    },
  }
}
</script>