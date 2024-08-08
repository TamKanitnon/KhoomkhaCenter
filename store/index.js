import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import brand from "./brand";
import grocery from "./grocery";
import member from "./member";
import masterData from "./master-data";
import product from "./product";
import promotion from "./promotion";
import setting from "./setting";
import wholesale from "./wholesale";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/th";
// we first import the module
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import moment from "moment";
import VueQRCodeComponent from "vue-qrcode-component";
import VueApexCharts from "vue-apexcharts";

Vue.prototype.$moment = moment;
Vue.use(ElementUI, { locale });
Vue.use(VueSweetalert2);
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

Vue.component("qr-code", VueQRCodeComponent);
Vue.use(Vuex);
export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      bank: [
        {
          value: "KBANK",
          code: "KBANK",
          text: "ธนาคารกสิกรไทย"
        },
        {
          value: "TRUEWALLET",
          code: "TRUEWALLET",
          text: "ทรูวอลเล็ต"
        },
        {
          value: "TMB",
          code: "TMB",
          text: "ธนาคารทหารไทย"
        },
        {
          value: "BBL",
          code: "BBL",
          text: "ธนาคารกรุงเทพ"
        },
        {
          value: "KTB",
          code: "KTB",
          text: "ธนาคารกรุงไทย"
        },
        {
          value: "BAY",
          code: "BAY",
          text: "ธนาคารกรุงศรีอยุธยา"
        },
        {
          value: "KKP",
          code: "KKP",
          text: "ธนาคารเกียรตินาคินภัทร"
        },
        {
          value: "CIMB",
          code: "CIMB",
          text: "ธนาคารซีไอเอ็มบีไทย"
        },
        {
          value: "TISCO",
          code: "TISCO",
          text: "ธนาคารทิสโก้"
        },
        {
          value: "TBANK",
          code: "TBANK",
          text: "ธนาคารธนชาต"
        },
        {
          value: "UOBT",
          code: "UOBT",
          text: "ธนาคารยูโอบี"
        },
        {
          value: "TCD",
          code: "TCD",
          text: "ธนาคารไทยเครดิตเพื่อรายย่อย"
        },
        {
          value: "LHFG",
          code: "LHFG",
          text: "ธนาคารแลนด์แอนด์ เฮ้าส์"
        },
        {
          value: "BAAC",
          code: "BAAC",
          text: "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร"
        },
        {
          value: "GSB",
          code: "GSB",
          text: "ธนาคารออมสิน"
        },
        {
          value: "GHB",
          code: "GHB",
          text: "ธนาคารอาคารสงเคราะห์"
        },
        {
          value: "ISBT",
          code: "ISBT",
          text: "ธนาคารอิสลามแห่งประเทศไทย"
        },
        {
          value: "SCB",
          code: "SCB",
          text: "ธนาคารไทยพานิชย์"
        }
      ]
    },
    modules: { 
      auth, 
      promotion, 
      member, 
      setting, 
      product, 
      brand, 
      'master-data':masterData,
      wholesale,
      grocery,
    },
    strict: process.env.DEV
  });

  return Store;
}