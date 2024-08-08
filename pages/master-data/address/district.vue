<template>
  <div class="container">
    <loading-page v-if="loading"></loading-page>
    <h2 class="text-center mt-2 mb-4">Address : อำเภอ / เขต (District)</h2>
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
            @change="updateProvincesList()"
            hide-details="auto"
            required
            return-object
            outlined
            dense
          ></v-autocomplete>
        </v-col>
        <v-col cols="6" sm="4">
          <v-autocomplete
            v-model="selectedProvince"
            :items="provinces"
            item-text="ProvinceName"
            label="จังหวัด"
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
          :items="filteredDistricts"
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
    <!-- <AddDistrict v-if="addModal" @close="handleCloseAdd" :isDialogOpen="addModal" />
    <EditDistrict v-if="isEdit" @close="handleCloseEdit" :isDialogOpen="isEdit" :district="editingItem" /> -->
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
import District from '@/src/models/master/address/District';
import AddDistrict from './components/AddDistrict.vue';
import EditDistrict from './components/EditDistrict.vue';

export default {
  name: 'DistrictPage',
  components: {
    AddDistrict,
    EditDistrict,
  },
  data() {
    return {
      loading: false,
      headers: [
        { text: '#', value: 'index', sortable: false },
        { text: 'District name', value: 'DistrictName', sortable: false },
        { text: 'District Id', value: 'DistrictId', sortable: false },
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
      selectedProvince: null,
      districts: [],
      addModal: false,
      isEdit: false,
      editingItem: new District(),
      deleteDialog: false,
      itemToDelete: null,
    };
  },
  computed: {
    ...mapGetters('master-data', {
      doneFetchRegion: 'regions',
    }),
    filteredDistricts() {
      return this.districts.filter(_district => {
        const searchTerm = this.filterKeyword.toLowerCase();
        return _district.DistrictName.toLowerCase().includes(searchTerm);
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
      fetchDistrict: 'fetchDistricts',
      addDistric: 'postProvince',
      editDistrict: 'putProvince',
      deleteDistrict: 'deleteProvince',
    }),
    validateForm() {
      this.$refs.form.validate();
      return this.formValid;
    },
    async updateProvincesList(){
      try {
        let responseData = await this.fetchProvince(this.selectedRegion);
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
    async search() {
      if (!this.validateForm()) {
        return;
      }
      this.loading = true;
      try {
        let responseData = await this.fetchDistrict(this.selectedProvince);
        console.log(responseData)
        let listDistricts = responseData.map(item => new District({
          DistrictId: item.DistrictId ?? null,
          DistrictName: item.DistrictName ?? null,
        }));
        this.districts = listDistricts;
        this.totalItems = this.districts.length;
      } catch (error) {
        console.error('Error fetching district:', error);
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
