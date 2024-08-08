<template>
  <div class="container">
    <loading-page v-if="loading"></loading-page>
    <h2 class="text-center mt-2 mb-4">Address : จังหวัด (Province)</h2>
    <!-- Search filter -->
    <v-form ref="form">
      <v-row class="mx-1">
        <v-col cols="6" sm="4">
          <v-autocomplete
            v-model="selectedRegion"
            :items="regions"
            item-text="RegionName"
            label="ภาค"
            :rules="[v => !!v || 'กรุณาเลือก']"
            hide-details="auto"
            required
            return-object
            outlined
            dense
          ></v-autocomplete>
        </v-col>
        <v-col cols="6" sm="4">
          <v-btn color="primary" @click="search">
            <v-icon class="mr-1">mdi-magnify</v-icon> ค้นหา 
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <div class="row">
      <div class="col-12 pa-2">
        <v-row class="my-3 mx-1" justify="space-between" align="center">
          <div>Total item found: {{ totalItems }} item</div>
          <!-- <v-btn color="success" @click="handleAddItem">
            <v-icon class="mr-1">mdi-plus</v-icon> เพิ่ม
          </v-btn> -->
        </v-row>
        <v-row class="my-3 mx-1">
          <v-text-field
            v-model="filterKeyword"
            label="Filter Search"
            outlined
            dense
            hide-details="auto"
          ></v-text-field>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="filteredProvinces"
          :options.sync="options"
          :server-items-length="totalItems"
          :loading="loading"
          :items-per-page="options.itemsPerPage"
          :footer-props="{ 'items-per-page-options': [] }"
          @update:options="onUpdateOptions"
          hide-default-footer
        >
          <template v-slot:[`item.index`]="{ index }">
            {{ index + 1 }}
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <v-btn color="primary" @click="handleEditItem(item)">edit</v-btn>
          </template>
        </v-data-table>
        <v-dialog v-model="deleteDialog" max-width="500px">
          <v-card>
            <v-card-title class="headline">Confirm Delete</v-card-title>
            <v-card-text>Are you sure you want to delete this item?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="closeDeleteDialog">Cancel</v-btn>
              <v-btn color="success" @click="confirmDelete">Confirm</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
    <AddProvince v-if="addModal" @close="handleCloseAdd" :isDialogOpen="addModal" />
    <EditProvince v-if="isEdit" @close="handleCloseEdit" :isDialogOpen="isEdit" :province="editingItem" />
    <!-- <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirm Delete</v-card-title>
        <v-card-text>Are you sure you want to delete this item?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="closeDeleteDialog">Cancel</v-btn>
          <v-btn color="success" @click="confirmDelete">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';
import Region from '@/src/models/master/address/Region';
import Province from '@/src/models/master/address/Province';
import AddProvince from './components/AddProvince.vue';
import EditProvince from './components/EditProvince.vue';

export default {
  name: 'ProvincePage',
  components: {
    AddProvince,
    EditProvince,
  },
  data() {
    return {
      loading: false,
      headers: [
        { text: '#', value: 'index', sortable: false },
        { text: 'Province name', value: 'ProvinceName', sortable: false },
        { text: 'Province Id', value: 'ProvinceId', sortable: false },
        // { text: '', value: 'action', sortable: false },
      ],
      options: {
        page: 1,
        itemsPerPage: 20,
        sortBy: [],
        sortDesc: [],
        groupBy: [],
        groupDesc: [],
        multiSort: false,
        mustSort: false,
      },
      formValid: true,
      totalItems: 0,
      filterKeyword: '',
      regions: [],
      selectedRegion: null,
      provinces: [],
      addModal: false,
      isEdit: false,
      editingItem: new Region(),
      deleteDialog: false,
      itemToDelete: null,
    };
  },
  computed: {
    ...mapGetters('master-data', {
      doneFetchRegion: 'regions',
    }),
    filteredProvinces() {
      return this.provinces.filter(_province => {
        const searchTerm = this.filterKeyword.toLowerCase();
        return _province.ProvinceName.toLowerCase().includes(searchTerm);
      });
    }
  },
  created() {
    this.regions = this.doneFetchRegion;
    this.totalItems = this.regions.length;
  },
  watch: {
    doneFetchRegion(newValue) {
      this.regions = newValue;
    },
  },
  methods: {
    ...mapActions('master-data', {
      fetchProvince: 'fetchProvinces',
      addProvince: 'postProvince',
      editProvince: 'putProvince',
      deleteProvince: 'deleteProvince',
    }),
    validateForm() {
      this.$refs.form.validate();
      return this.formValid;
    },
    async search() {
      if (!this.validateForm()) {
        return;
      }
      this.loading = true;
      try {
        let responseData = await this.fetchProvince(this.selectedRegion);
        let listProvinces = responseData.map(item => new Province({
          ProvinceId: item.ProvinceId ?? null,
          ProvinceName: item.ProvinceName ?? null,
        }));
        this.provinces = listProvinces;
        this.totalItems = this.provinces.length;
      } catch (error) {
        console.error('Error fetching provinces:', error);
      } finally {
        this.loading = false;
      }
    },
    onUpdateOptions(options) {
      this.options = options;
    },
    handleAddItem() {
      this.addModal = true;
    },
    handleCloseAdd() {
      this.addModal = false;
    },
    handleEditItem(item) {
      this.isEdit = true;
      this.editingItem = item;
    },
    handleCloseEdit() {
      this.isEdit = false;
    },
    openDeleteDialog(item) {
      this.itemToDelete = item;
      this.deleteDialog = true;
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
      this.itemToDelete = null;
    },
    async confirmDelete() {
      try {
        const result = await this.deleteProvince(this.itemToDelete);
        if (result.isSuccessful) {
          this.$swal({
            icon: "success",
            title: "Deleted successfully",
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 1500,
          });
          this.closeDeleteDialog();
          this.search(); // Refresh the list
        } else {
          this.$swal({
            icon: "error",
            title: result.status,
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 5000,
          });
        }
      } catch (error) {
        this.$swal({
          icon: "error",
          title: 'Error deleting province',
          text: error.message,
          allowOutsideClick: false,
          showConfirmButton: true,
        });
      }
    },
  }
}
</script>
