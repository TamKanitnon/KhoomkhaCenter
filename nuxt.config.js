import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "KK BO FRONTEND",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  mode: "spa",
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/axios", "~/plugins/formatter"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/axios"
  ],
  axios: {
    baseURL: '/',
    proxy: true
  },
  proxy: {
    "/v1alpha": {
      target: "https://kong-api-proxy-qlws7pv5wa-as.a.run.app",
      changeOrigin: true
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "vue-sweetalert2/nuxt","@nuxtjs/dayjs"],
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  env: {
    ALL_SUPPORT_V2: process.env.ALL_SUPPORT_V2,
    CLUSTER_URL: process.env.CLUSTER_URL,
    GROCERY: process.env.GROCERY,
    GROCERY_USER: process.env.GROCERY_USER,
    SUPPLIER: process.env.SUPPLIER,
    SUPPLIER_USER: process.env.SUPPLIER_USER,
    SUPPLIER_INVENTORY: process.env.SUPPLIER_INVENTORY,
    SUPPLIER_FINANCE: process.env.SUPPLIER_FINANCE,
    PRODUCT: process.env.PRODUCT,
    MASTER_DATA: process.env.MASTER_DATA,
  }
};
