<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="font-weight-bold" />
      
      <span v-if="user" style="color:gold;">   USER : </span><span style="color:white;"> {{ user }}  </span> 
      <span style="color:gold;" class="mx-2">   ระดับ : </span><span style="color:white;"> {{$store.state.auth.role}}</span> 
      <v-spacer />
    
      <v-speed-dial direction="bottom" transition="slide-y-transition">
        <template v-slot:activator>
          <v-chip btn > <v-icon left> mdi-account-circle </v-icon>{{ user }} </v-chip>
        </template>

        <v-tooltip left color="blue">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              v-bind="attrs"
              v-on="on"
              small
              color="red"
              @click="chagepassword()"
            >
              <v-icon>mdi-lock-reset</v-icon>
            </v-btn>
          </template>
          <span>เปลี่ยนรหัสผ่าน</span>
        </v-tooltip>

        

        <v-tooltip left color="red">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              v-bind="attrs"
              v-on="on"
              small
              color="red"
              @click="logout()"
            >
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
          <span>ออกจากระบบ</span>
        </v-tooltip>
      </v-speed-dial>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      app
      fixed
      width="280"
    >
      <v-toolbar-title class="font-weight-bold pa-3" align-center>
        <h1>Menu</h1>
        <h3 class="warning--text">Khoomkha Center</h3>
      </v-toolbar-title>
      <v-list nav dense>
        <div v-for="(link, i) in items" :key="i">
          <v-list-item
            v-if="!link.subLinks"
            :to="link.to"
            class="pa-1 font-weight-bold"
            active-class="bg-primary-grediaun"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title :inner-text.prop="link.title" />
          </v-list-item>
          <v-list-group
            color="deep-purple lighten-2 "
            v-else
            :key="link.title"
            no-action
            :prepend-icon="link.icon"
            :value="false"
          >
            <template v-slot:activator>
              <v-list-item-title>{{ link.title }}</v-list-item-title>
            </template>
            <v-list-item
              class="pa-1 ml-5"
              v-for="sublink in link.subLinks"
              :to="sublink.to"
              :key="sublink.text"
              active-class="bg-primary-grediaun"
            >
              <v-list-item-icon>
                <v-icon>{{ sublink.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title :inner-text.prop="sublink.text" />
            </v-list-item>
          </v-list-group>
        </div>
        <div>
          <v-list-item @click="logout()" class="pa-1">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout </v-list-item-title>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <v-slide-x-transition>
        <v-container>
          <div class="mainshow py-sm-4 px-2 rounded-xl">
            <Nuxt />
          </div>
        </v-container>
      </v-slide-x-transition>
    </v-main>
  </v-app>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  middleware: "auth",
  computed: {
    ...mapState("auth", ["user"]),
  },
  created(){
    this.loadBrands();
    this.loadUnits();
    this.loadCategories();
    this.loadRegions();
    // this.loadGCAddressType();
    // this.loadGCBusinessType();
    // this.loadWSAddressType();
    // this.loadWSBusinessType();
  },
  data() {
    return {
      clipped: false,
      drawer: true,
      items: [
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard",
          to: "/dashboard",
        },
        {
          title: "Order",
          icon: "mdi-cart-outline",
          name: "order",
          to: "/order",
          // subLinks: [
          //   { text: "Order Detail", icon: "mdi-map-marker", to: "/order/order-detail" },
          //   { text: "Order รอการชำระ ", icon: "mdi-map", to: "/order/order-toPaid" },
          //   { text: "Order ยกเลิก ", icon: "mdi-city", to: "/order/order-cancel" },
          // ],
        },
        {
          title: "Wholesale",
          icon: "mdi-factory",
          to: "/wholesale",
          // subLinks: [
          //   { text: "Wholesale Detail", icon: "mdi-map-marker", to: "/wholesale/ws-detail" },
          //   { text: "Wholesale password? ", icon: "mdi-map", to: "/wholesale/ws-password" },
          // ],
        },
        {
          title: "Grocery",
          icon: "mdi-package-variant",
          to: "/grocery",
          // subLinks: [
          //   { text: "Region", icon: "mdi-map", to: "/master-data/address/region" },
          //   { text: "Grocery Detail", icon: "mdi-map-marker", to: "/grocery/gc-detail" },
          //   // { text: "Grocery password? ", icon: "mdi-map", to: "/grocery/gc-password" },
          // ],
        },
        {
          title: "Logistics",
          icon: "mdi-truck-delivery",
          to: "/logistic",
        },
        {
          title: "Master Data",
          icon: "mdi-database",
          subLinks: [
            { text: "Category", icon: "mdi-map", to: "/master-data/category" },
            { text: "Sub-category", icon: "mdi-map", to: "/master-data/sub-category" },
            // { text: "Address", icon: "mdi-map-marker", to: "/master-data/address" },
            // { text: "Region", icon: "mdi-map", to: "/master-data/address/region" },
            // { text: "Province", icon: "mdi-map-marker-radius", to: "/master-data/address/province" },
            // { text: "District", icon: "mdi-map-marker-circle", to: "/master-data/address/district" },
            // { text: "Sub District", icon: "mdi-map-marker-outline", to: "/master-data/address/sub-district" },
            // { text: "WS Address Type", icon: "mdi-mailbox", to: "/master-data/WS/address-type" },
            // { text: "GC Address Type", icon: "mdi-mailbox", to: "/master-data/GC/address-type" },
            // { text: "WS Business Type", icon: "mdi-mailbox", to: "/master-data/WS/business-type" },
            // { text: "GC Business Type", icon: "mdi-mailbox", to: "/master-data/GC/business-type" },            
          ],
        },
        {
          title: "System Product",
          icon: "mdi-package-variant",
          to: "/product",
        },
        {
          title: "Brand",
          icon: "mdi-package-variant",
          to: "/brand",
        },
        {
          title: "Finance",
          icon: "mdi-cash-multiple",
          // to: "/finance",
          subLinks: [
            { text: "Summary", icon: "mdi-map-marker", to: "/finance/summary" },
            { text: "Refund List", icon: "mdi-map-marker", to: "/finance/refund" },
            { text: "Shipping Cost", icon: "mdi-city", to: "/finance/shipping" },
            { text: "Wholesale Income", icon: "mdi-map-marker-radius", to: "/finance/ws-income" },
            { text: "Fee / GP", icon: "mdi-map-marker-circle", to: "/finance/fee" },
            { text: "Promotion", icon: "mdi-map-marker-outline", to: "/finance/promotion" },
          ],
        },
        {
          title: "Report",
          icon: "mdi-chart-bar",
          to: "/report",
        },
        {
          title: "Help",
          icon: "mdi-lightbulb-question",
          // to: "/help",
          subLinks: [
            { text: "KK", icon: "mdi-account-question-outline", to: "/help/kk" },
            { text: "KK Wholesale", icon: "mdi-account-question-outline", to: "/help/kk-ws" },
          ],
        },
        {
          title: "User / Role",
          icon: "mdi-account-group",
          to: "/role",
        },
        {
          title: "Support",
          icon: "mdi-face-agent",
          to: "/support",
        },
        {
          title: "พนักงาน",
          icon: "mdi-android",
          to: "/Staff",
          status: true
        },
        {
          title: "Staff logs",
          icon: "mdi-android",
          to: "/StaffLog",
          status: true
        }

      ],
    };
  },
  methods: {
    ...mapActions('product', {
      loadCategories: 'fetchCategories',
      loadUnits: 'fetchUnits'
    }),
    ...mapActions('brand', {
      loadBrands: 'fetchBrands'
    }),
    ...mapActions('master-data', {
      loadRegions: 'fetchRegions',
      loadWSAddressType: 'getWholesaleAddressType',
      loadWSBusinessType: 'getWholesaleBusinessType',
      loadGCAddressType: 'getGroceryAddressType',
      loadGCBusinessType: 'getGroceryBusinessType',
    }),
    logout() {
      this.$router.push("/login");
    },
    chagepassword(){
      this.$router.push("/changepassword");
    }
  }
};
</script>
