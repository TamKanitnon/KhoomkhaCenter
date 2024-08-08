<template>
  <div class="container">
    <loading-page v-if="loading"></loading-page>
    <div>
      <v-btn color="primary" @click="handleBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>
    <h2 v-if="this.order" class="text-center mt-2 mb-4">Order Detail : {{ order.OrderNumber }}</h2>
    <h2 v-else class="text-center mt-2 mb-4">Order Detail : Error fetch</h2>
    <v-container class="d-flex justify-center">
      <v-col cols="12" v-if="order">
        <v-row >
          <!-- ORDER ID -->
          <v-col cols="12" sm="6" class="d-flex" >
            <v-row align="center">
            <div class='labelTitle'>Order Number</div>
              <v-col class="pr-4">
                <v-text-field
                  dense
                  v-model.trim="order.OrderNumber"
                  outlined
                  readonly
                  hide-details="auto"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <!-- STATUS -->
          <v-col cols="12" sm="6" class="d-flex">
            <v-row align="center">
              <div class='labelTitle'>สถานะ</div>
              <v-col >
                <v-text-field
                  dense
                  v-model.trim="order.OrderStatus"
                  outlined
                  readonly
                  hide-details="auto"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row >
          <!-- DATE -->
          <v-col cols="12" sm="6" class="d-flex" >
            <v-row align="center">
            <div class="labelTitle">Order Date</div>
              <v-col class="pr-4">
                <v-text-field
                  dense
                  v-model.trim="order.OrderIn"
                  outlined
                  readonly
                  hide-details="auto"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row >
          <!-- GROCERY NAME -->
          <v-col cols="12" sm="6" class="d-flex" >
            <v-row align="center">
            <div class='labelTitle'>ชื่อร้าน</div>
              <v-col class="pr-4">
                <v-text-field
                  dense
                  v-model.trim="order.Grocery.GroceryName"
                  outlined
                  readonly
                  hide-details="auto"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <!-- GROCERY ID -->
          <v-col cols="12" sm="6" class="d-flex">
            <v-row align="center">
              <div class='labelTitle'>ID</div>
              <v-col >
                <v-text-field
                  dense
                  v-model.trim="order.Grocery.GroceryId"
                  outlined
                  readonly
                  hide-details="auto"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row >
          <!-- PHONE -->
          <v-col cols="12" sm="6" class="d-flex" >
            <v-row align="center">
            <div class="labelTitle">เบอร์ติดต่อ</div>
              <v-col class="pr-4">
                <v-text-field
                  dense
                  v-model.trim="order.Grocery.PhoneNo"
                  outlined
                  readonly
                  hide-details="auto"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row >
          <!-- PAYMENT METHOD -->
          <v-col cols="12" sm="6" class="d-flex" >
            <v-row align="center">
            <div class="labelTitle">ชำระโดย</div>
              <v-col class="pr-4">
                <v-text-field
                  dense
                  v-model.trim="order.PaymentMethod"
                  outlined
                  readonly
                  hide-details="auto"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <!-- PAYMNET STATUS -->
          <v-col cols="12" sm="6" class="d-flex" >
            <v-row align="center">
            <div class="labelTitle">สถานะการจ่ายเงิน</div>
              <v-col class="pr-4">
                <div v-if="order.IsPaid" class="success--text">จ่ายแล้ว</div>
                <div v-else class="error--text">รอการชำระ</div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row >
          <!-- SHIPPING ADDRESS -->
          <v-col cols="12" class="d-flex" >
            <v-row align="center">
            <div class='labelTitle'>ที่อยู่จัดส่ง</div>
              <v-col class="pr-4">
                <v-text-field
                  dense
                  v-model.trim="order.ShippingAddress"
                  outlined
                  readonly
                  hide-details="auto"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <!-- DELIVERY VIZUALIZATION -->
        <v-card class="pa-5 my-5">
          <h3 class="pb-3">ติดตาม</h3>
          <div v-for="(step, index) in order.DeliverProcess" :key="index" class="status-item">
            <div class="status-icon" :class="{ 'active': index === 0 }"></div>
            <div class="status-content">
              <div class="status-date">{{ step.date }}</div>
              <div class="status-info">
                <div class="status-title">{{ step.deliveryStatus }}</div>
                <div class="status-detail">{{ step.deliveryDetail }}</div>
              </div>
            </div>
          </div>
        </v-card>
        <!-- ORDER PRODUCT -->
        <v-row>
          <v-col
            v-for="(order, index) in order.Order"
            :key="index"
            cols="12"
          >
            <v-card class="pa-3">
              <div class="d-flex justify-space-between align-center">
                <div class="supplier-name font-weight-bold">{{ order.SupplierName }}</div>
                <v-btn text color="primary" class="ml-3">ไปยังร้านค้า</v-btn>
              </div>
              <v-divider></v-divider>
              <v-row v-for="(product, pIndex) in order.Product" :key="pIndex" class="mt-3">
                <v-col cols="4">
                  <v-img
                    :src="product.ProductImageUrl || 'default-image-url'"
                    alt="Product Image"
                    height="100px"
                    contain
                  ></v-img>
                </v-col>
                <v-col cols="8">
                  <div class="product-name font-weight-bold">{{ product.ProductName }}</div>
                  <div class="product-price green--text">฿{{ product.DiscountPrice }}</div>
                  <div class="product-quantity grey--text">x{{ product.Quantity }}</div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <v-row >
          <!-- TOTAL PRICE -->
          <v-col cols="12" sm="6" class="d-flex" >
            <v-row align="center">
            <div class='labelTitle'>รวมราคาสินค้า</div>
              <v-col class="pr-4">
                <v-text-field
                  dense
                  v-model.trim="order.TotalPrice"
                  outlined
                  readonly
                  hide-details="auto"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <!-- SHIPPING FEE -->
          <v-col cols="12" sm="6" class="d-flex">
            <v-row align="center">
              <div class='labelTitle'>ค่าจัดส่ง</div>
              <v-col >
                <v-text-field
                  dense
                  v-model.trim="order.DelieveryPrice"
                  outlined
                  readonly
                  hide-details="auto"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row >
          <!-- DISCOUNT CODE -->
          <v-col cols="12" sm="6" class="d-flex" >
            <v-row align="center">
            <div class='labelTitle'>ส่วนลดค่าสินค้า</div>
              <v-col class="pr-4">
                <v-text-field
                  dense
                  v-model.trim="order.DiscountProduct"
                  outlined
                  readonly
                  hide-details="auto"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <!-- DISCOUNT SHIPPING -->
          <v-col cols="12" sm="6" class="d-flex">
            <v-row align="center">
              <div class='labelTitle'>ส่วนลดค่าจัดส่ง</div>
              <v-col >
                <v-text-field
                  dense
                  v-model.trim="order.DiscountDelivery"
                  outlined
                  readonly
                  hide-details="auto"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row >
          <!-- DISCOUNT SYSTEM FEE -->
          <v-col cols="12" sm="6" class="d-flex" >
            <v-row align="center">
            <div class='labelTitle'>ส่วนลดค่าธรรมเนียม</div>
              <v-col class="pr-4">
                <v-text-field
                  dense
                  v-model.trim="order.DiscountSystemFee"
                  outlined
                  readonly
                  hide-details="auto"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <!-- FINAL PRICE -->
          <v-col cols="12" sm="6" class="d-flex">
            <v-row align="center">
              <div class='labelTitle'>ยอดสุทธิ</div>
              <v-col >
                <v-text-field
                  dense
                  v-model.trim="order.FinalPrice"
                  outlined
                  readonly
                  hide-details="auto"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'OrderDetail',
  data() {
    return {
      loading: false,
      order: null,
    }
  },
  computed: {
    // ...mapGetters('wholesale', {
    //   doneFetchDetailWholesale: 'detailWholesale',
    // }),
  },
  watch: {
    // doneFetchDetailWholesale(newValue) {
    //   this.wholesale = newValue;
    // },
  },
  async created() {
    // console.log(this.$route.query.SupplierId);
    // this.loading = true;
    // try{
    //   let response = await this.fetchDetailWholesale(this.$route.query.SupplierId);
    //   if(response.isSuccessful){
    //     this.wholesale = {
    //       ...response.data,
    //       StoreName: this.$route.query.SupplierName
    //     }
    //     console.log(this.wholesale);
    //     this.loading = false;
    //   }
    //   console.log(response);
    // }catch(error){
    //   this.$router.back();
    // }
    this.mockData();
  },
  methods: {
    ...mapActions('wholesale', {
      fetchDetailWholesale: 'fetchWholesale',
    }),
    // --- MOCK DATA ---
    mockData() {
      this.order = {
        OrderNumber: '221109MAR2CEL3',  // order number / ordre id
        OrderIn: '26 พ.ย. 2023 10:00',
        Grocery:{
          GroceryName: 'Coffee by Dao',
          GroceryId: 'grocery-001',
          PhoneNo: '081-111-2222'
        },
        ShippingAddress: 'อาคาร Liberty Plaza ชั้น 20 เลขที่ 1000 ซอยสุขุมวิท 55 ถนนสุขุมวิท แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110',
        OrderStatus: 'จัดส่งสำเร็จแล้ว',
        OrderHeader: 'ตรวจสอบสินค้าทุกชิ้นในคำสั่งซื้อก่อนกดยืนยันการรับสินค้า หากพบปัญหา คุณสามารถยื่นคำขอคืนเงิน/คืนสินค้าได้ภายใน 24 พ.ย. 2024',
        DeliverProcess: [
          { date: '11 พ.ย. 15:23', deliveryStatus: 'นำส่งสำเร็จ', deliveryDetail: 'พัสดุของท่านอยู่ระหว่างการคัดแยก เพื่อนำส่งไปยัง สถานีปลายทาง (บางปะกง)'},
          { date: '11 พ.ย. 09:39', deliveryStatus: 'พนักงานทำการนำส่ง', deliveryDetail: 'พัสดุของท่านอยู่ระหว่างการคัดแยก เพื่อนำส่งไปยัง สถานีปลายทาง (บางปะกง)'},
          { date: '10 พ.ย. 17:04', deliveryStatus: 'พัสดุถึงสถานีปลายทาง', deliveryDetail: 'พัสดุของท่านอยู่ระหว่างการคัดแยก เพื่อนำส่งไปยัง สถานีปลายทาง (บางปะกง)'},
          { date: '8 พ.ย. 12:21', deliveryStatus: 'พัสดุถึงสถานีคัดแยก', deliveryDetail: 'พัสดุของท่านอยู่ระหว่างการคัดแยก เพื่อนำส่งไปยัง สถานีปลายทาง (บางปะกง)'},
          { date: '8 พ.ย. 08:46', deliveryStatus: 'ร้านค้าจัดเตรียมสินค้าเรียบร้อย', deliveryDetail: ''},
        ],
        PaymentMethod: 'บัตรเครดิต/บัตรเดบิต',
        IsPaid: true,
        Order: [
          {
            SupplierName: 'Jason Roaster',
            Product: [
              {
                ProductImageUrl: 'data:image/jpeg;base64,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',
                ProductName: 'Geisha Ethopia - light roast - water process - 100g',
                Price: 379,
                DiscountPrice: 350,
                Quantity: 3
              },
              {              
                ProductImageUrl: 'data:image/jpeg;base64,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',
                ProductName: 'Costa Rica - light roast - honey process - 200g',
                Price: 599,
                DiscountPrice: 580,
                Quantity: 2
              }
            ]
          },
          {
            SupplierName: 'Finite9',
            Product: [
              {       
                ProductImageUrl: 'data:image/jpeg;base64,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',
                ProductName: 'Mischief Espresso maker MK.4',
                Price: 8800,
                DiscountPrice: 7000,
                Quantity: 1
              }
            ]
          }
        ],
        TotalPrice: 9850,
        DelieveryPrice: 0,
        DiscountProduct: 800,
        DiscountDelivery: 10,
        DiscountSystemFee: 50,
        FinalPrice: 8990
      };
    },
    // --- FORMATTER ----
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

    // --- REDIRECT PAGE ---
    handleBack(){
      this.$router.back();
    },
  }
}
</script>

<style scoped>
.labelTitle{
  width: 120px;
}

.order-status {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 10px;
}

.status-item {
  display: flex;
  align-items: start;
  margin-bottom: 20px; /* increased spacing to accommodate lines */
  position: relative;
}

.status-icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 10px;
  position: relative;
  z-index: 1;
}

.status-icon.active {
  background-color: #28a745;
}

.status-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  margin-top: 12px;
  height: calc(100% + 30px); /* line height adjustment */
  background-color: #ccc;
  transform: translate(-50%);
  z-index: 0;
}

.status-content {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.status-date {
  font-size: 0.8rem;
  color: #888;
}

.status-title {
  font-weight: bold;
  font-size: 1rem;
}

.status-detail {
  font-size: 0.9rem;
  color: #666;
}

.status-icon:last-child .status-icon::before {
  display: none; /* remove the line after the last item */
}
</style>