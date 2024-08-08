<template>
  <div class="container">
    <loading-page v-if="loading"></loading-page>
    <div>
      <v-btn color="primary" @click="handleBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>
    <h2 class="text-center mt-2 mb-4">Grocery Detail</h2>
    <div class="d-flex justify-center">
      <v-col cols="12" sm="10" v-if="grocery">
        <v-row class="mx-1 mb-3" justify="center">
          <img v-if="grocery.ProfileImage" :src="grocery.ProfileImage" width="200" height="200" alt="Grocery Profile Image" />
          <img src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1719187200&semt=sph" width="200" height="150" alt="Grocery Profile Image" />
        
        </v-row>
        <v-row class="mx-1 mb-3">
          <v-col cols="2">ชื่อร้านค้า</v-col>
          <v-col cols="10">
            <v-text-field
              label="ชื่อร้านค้า"
              dense
              v-model.trim="grocery.StoreName"
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
              v-model.trim="grocery.FirstName"
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
              v-model.trim="grocery.LastName"
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
              v-model.trim="grocery.Email"
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
              v-model.trim="grocery.MobileNo"
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
import SearchFilter from '@/components/SearchFilter';

export default {
  name: 'GroceryDetail',
  components: {
    SearchFilter,
  },
  data() {
    return {
      loading: false,
      grocery: null,
    }
  },
  computed: {
    ...mapGetters('grocery', {
      doneFetchDetailGrocery: 'detailGrocery',
    }),
  },
  watch: {
    doneFetchDetailGrocery(newValue) {
      this.grocery = newValue;
    },
  },
  async created() {
    console.log(this.$route.query.GroceryId);
    this.loading = true;
    try{
      let response = await this.fetchDetailGrocery(this.$route.query.GroceryId);
      if(response.isSuccessful){
        this.grocery = {
          ...response.data,
          StoreName: this.$route.query.GroceryName
        }
        console.log(this.grocery);
        this.loading = false;
      }
    }catch(error){
      this.$router.back();
    }
  },
  methods: {
    ...mapActions('grocery', {
      fetchDetailGrocery: 'fecthGrocery',
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