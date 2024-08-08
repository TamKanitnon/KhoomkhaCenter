<template>
  <div class="container">
    <loading-page v-if="isLoading"></loading-page>
    <h2 class="text-center mt-2 mb-4">Wholesale Business Type</h2>
    <div class="row my-5">
      <v-row class="pa-2">
        <v-col cols="12">
          <!-- Additional content if needed -->
        </v-col>
        <v-col cols="12">
          <div class="d-flex justify-space-between align-center mb-3">
            <div> Total item found : {{ totalItems }} </div>
            <div><v-btn color="success"><v-icon class="pr-1"> mdi-plus</v-icon> เพิ่ม</v-btn></div>
          </div>
          <v-data-table
            :headers="headers"
            :items="businessTypeList"
            :options.sync="options"
            :server-items-length="totalItems"
            :loading="loading"
            :items-per-page="options.itemsPerPage"
            :footer-props="{ 'items-per-page-options': [] }"
            @update:options="onUpdateoptions"
          >
            <template v-slot:[`item.index`]="{ index }">
              {{ index + 1 }}
            </template>
            <template v-slot:[`item.actions`]="{}">
              <v-btn color="primary"> แก้ไข </v-btn>
              <v-btn color="error"> ลบ </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'ShippingPage',
  data() {
    return {
      isLoading: false,
      filter: {
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
        inputfilter: '',
      },
      totalItems: 0,
      loading: false,
      headers: [
        { text: 'Index', value: 'index', align: 'center' },
        { text: 'Name', value: 'BusinessType', align: 'center' },
        { text: 'Code ', value: 'BusinessTypeId', align: 'center' },
        { text: '', value: 'actions', align: 'center' },
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
    };
  },
  computed: {
    ...mapGetters('master-data', {
      businessTypeList: 'WSBusinessTypes',
    }),
  },
  watch: {
    businessTypeList(newValue) {
      this.totalItems = newValue.length;
    },
  },
  created() {
    this.totalItems = this.businessTypeList.length; // Set totalItems based on the already fetched data
  },
  methods: {
    onUpdateoptions(options) {
      this.options = options;
      // Add your fetch logic here if needed
    },
    handleViewDetail() {
      console.log('View detail');
    },
    closeModal() {
      this.$emit('update:isDialogOpen', false); // Emit event to close dialog
      this.$emit('close'); // Emit close event to parent
    },
    updateDialogOpen(value) {
      this.$emit('update:isDialogOpen', value);
    },
    formatDate(date) {
      const options = {
        day: '2-digit', month: 'long', year: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      };
      const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(new Date(date));
      return formattedDate.replace(',', '\n');
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 100%;
}
.text-success {
  color: #33720d;
}
.text-warning {
  color: rgb(253, 128, 2);
}
.text-error {
  color: red;
}
</style>
