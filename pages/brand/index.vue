<template>
  <div class="container">
    <loading-page v-if="loading"></loading-page>
    <h2 class="text-center mt-2 mb-4">Brand</h2>
    <div class="row my-5">
      <div class="col-12 pa-2">
        <v-row class="mx-1 mb-3">
          <v-text-field
            v-model="searchKeyword"
            label="ค้นหา"
            hide-details="auto"
            dense
            outlined
          ></v-text-field>
          <v-btn @click="handleSearch" class="ml-2" color="primary"><v-icon class="mr-1">mdi-magnify</v-icon> search</v-btn>
        </v-row>
        <v-row justify="space-between" align="center" class="mx-1 mb-3">
          <div> Total item found : {{totalItems}} </div>
          <v-btn color="success" @click="handleAddItem"><v-icon>mdi-plus</v-icon> เพิ่ม Brand </v-btn>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="brands"
          :options.sync="options"
          :server-items-length="totalItems"
          :loading="loading"
          :items-per-page="options.itemsPerPage"
          :footer-props="{ 'items-per-page-options': [] }"
          @update:options="onUpdateOptions"
        >
          <template v-slot:[`item.BrandImgUrl`]="{ item }">
            <div class="" align="center">
              <img :src="item.BrandImgUrl" alt="Brand Image" width="50" height="50" />
            </div>
          </template>
          <template v-slot:[`item.BrandName`]="{ item }">
            {{ item.BrandName ?? 'N/a' }}
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <v-row>
              <v-btn color="primary" @click="handleEditItem(item)">Edit</v-btn>
              <v-btn color="error" class="ml-3" @click="openDeleteDialog(item)">Delete</v-btn>
            </v-row>
          </template>
        </v-data-table>
        <AddBrand v-if="addModal" @close="handleCloseAdd" @add="handleUpdateAdd" :isDialogOpen="addModal" />
        <EditBrand v-if="isEdit" @close="handleCloseEdit" @edit="handleUpdateEdit" :isDialogOpen="isEdit" :editingItem="editingItem" />
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
  </div>
</template>

<script>
import AddBrand from './components/AddBrand';
import EditBrand from './components/EditBrand';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'BrandPage',
  components: {
    AddBrand,
    EditBrand
  },
  data() {
    return {
      loading: false,
      headers: [
        { text: 'Brand image', value: 'BrandImgUrl', align: 'center' },
        { text: 'Name', value: 'BrandTitle' },
        { text: 'Id', value: 'BrandId' },
        { text: '', value: 'action' },
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
      count: 0,
      totalItems: 0,
      brands: [],
      addModal: false,
      isEdit: false,
      editingItem: null,
      editingDialog: false,
      itemToDelete: null,
      deleteDialog: false,
      searchKeyword: '',
    }
  },
  computed: {
    ...mapGetters('brand', {
      doneFetchBrands: 'brands',
      refreshTotalItem: 'totalItem',
      refreshPage: 'currentPage',
    })
  },
  watch: {
    doneFetchBrands(newValue) {
      this.brands = newValue;
    },
    refreshTotalItem(newValue) {
      this.totalItems = newValue;
    },
    refreshPage(newValue) {
      this.options.page = newValue
    }
  },
  created() {
    this.brands = this.doneFetchBrands;
    this.totalItems = this.refreshTotalItem;
    this.options.page = this.refreshPage;
    if(this.doneFetchBrands.length == 0){
      this.loadBrand({page:1 , pageSize: 50})
    }
  },
  methods: {
    ...mapActions('brand', {
      loadBrandData: 'fetchBrandsPage',
      loadBrand: 'fetchBrands',
      deleteBrand: 'deleteBrand',
    }),
    handleSearch() {
      this.options.page = 1;
      this.fetchBrands();
    },
    async fetchBrands() {
      this.loading = true;
      try {
        let params = {
          BrandName: this.searchKeyword,
          page: this.options.page.toString(),
          pageSize: this.options.itemsPerPage.toString()
        }
        let response = await this.loadBrandData(params);
        console.log(response)
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        this.loading = false;
      }
    },
    onUpdateOptions(options) {
      this.options = options;
      this.fetchBrands(); // Fetch new page data
    },
    showSnackbar(message , color ){
      this.snackbar.message = message
      this.snackbar.color = color
      this.snackbar.visible = true
      setTimeout(() => {
        snackbar.value.visible = false
      }, 3000)
    },
    handleAddItem(){
      this.addModal = true;
    },
    handleUpdateAdd() {
      this.addModal = close;
      this.fetchBrands();
    },
    handleCloseAdd(){
      this.addModal = false;
    },
    handleEditItem(item) {
      this.isEdit = true;
      this.editingItem = item;
      console.log('Editing item:', item);
    },
    handleCloseEdit(){
      this.isEdit = false;
    },
    handleUpdateEdit(){
      this.isEdit = false;
      this.fetchBrands();
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
      // Call the API to delete the item
      const result = await this.deleteBrand(this.itemToDelete)
      if (result.isSuccessful) {
          this.$swal({
            icon: "success",
            title: "แก้ไขข้อมูลสำเร็จ",
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 1500,
          });
          this.closeDeleteDialog(); // Close the modal after successful update
          this.fetchBrands(); 
        } else {
          this.$swal({
            icon: "error",
            title: result.status,
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 3000,
          });
        }
    },
  }
}
</script>
