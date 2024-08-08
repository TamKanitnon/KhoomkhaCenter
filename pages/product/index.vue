<template>
  <div class="container">
    <loading-page v-if="loading"></loading-page>
    <h2 class="text-center mt-2 mb-4">System Product</h2>
    <div class="row my-5">
      <div class="col-12 pa-2">
        <SearchBar @search-click="handleSearch"/>
        <v-row class="my-3 mx-1" justify="space-between" align="center">
          <div> Total item found: {{ totalItems }} item</div>
          <v-btn color="success" @click="handleAddItem">
            <v-icon class="mr-1"> mdi-plus</v-icon> เพิ่มสินค้า
          </v-btn>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="products"
          :options.sync="options"
          :server-items-length="totalItems"
          :loading="loading"
          :items-per-page="options.itemsPerPage"
          :footer-props="{ 'items-per-page-options': [] }"
          @update:options="onUpdateOptions"
        >
          <template v-slot:[`item.ImgUrl`]="{ item }">
            <img :src="item.ImgUrl" alt="Product Image" width="50" height="50" />
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
        <AddProduct v-if="addModal" @close="handleCloseAdd" @add="handleUpdateAdd" :isDialogOpen="addModal" />
        <EditProduct v-if="isEdit" @close="handleCloseEdit" @edit="handleUpdateEdit" :isDialogOpen="isEdit" :editingItem="editingItem" />
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
import SearchBar from './components/SearchBar';
import AddProduct from './components/AddProduct.vue';
import EditProduct from '../product/components/EditProduct.vue';
import Product from '@/src/models/product/Product';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'GroceryPage',
  components: {
    SearchBar,
    AddProduct,
    EditProduct
  },

  data() {
    return {
      loading: false,
      snackbar: {
        visible: false,
        message: '',
        color: 'red'
      },
      headers: [
        { text: 'Image', value: 'ImgUrl' , sortable: false},
        { text: 'Product Name', value: 'ProductName', sortable: false },
        { text: 'Category', value: 'ProductCategoryName', sortable: false },
        { text: 'Sub Category', value: 'ProductSubCategoryName', sortable: false },
        { text: 'Brand', value: 'BrandName', sortable: false },
        { text: 'Action', value: 'action', sortable: false }
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
      products: [],
      addModal: false,
      isEdit: false,
      editingItem: new Product(),
      editingDialog: false,
      itemToDelete: null,
      deleteDialog: false,
    }
  },
  computed: {
    ...mapGetters('product', {
      doneFetchProducts: 'products',
      refreshTotalItem: 'totalItem',
      refreshPage: 'currentPage',
    })
  },
  watch: {
    doneFetchProducts(newValue) {
      this.products = newValue;
    },
    refreshTotalItem(newValue) {
      this.totalItems = newValue;
    },
    refreshPage(newValue) {
      this.options.page = newValue
    }
  },
  async created() {
    this.products = await this.doneFetchProducts;
    this.totalItems = this.refreshTotalItem;
    this.options.page = this.refreshPage;
    if(this.doneFetchProducts.length == 0){
      this.loadProduct({page:1 , pageSize: 50})
    }
  },
  methods: {
    ...mapActions('product', {
      loadProductData: 'fetchProductsPage',
      loadProduct: 'fetchProducts',
      deleteProduct: 'deleteProductItem',
    }),
    handleSearch() {
      this.options.page = 1;
    },
    async fetchProducts() {
      this.loading = true;
      try {
        let params = {
          page: this.options.page.toString(),
          pageSize: this.options.itemsPerPage.toString()
        }
        let response = await this.loadProductData(params);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        this.loading = false;
      }
    },
    onUpdateOptions(options) {
      this.options = options;
      if(this.count != 0){
        this.fetchProducts(); // Fetch new page data
      }      
      this.count += 1;
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
      this.fetchProducts();
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
      this.fetchProducts();
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
      const result = await this.deleteProduct(this.itemToDelete)
      if (result.isSuccessful) {
          this.$swal({
            icon: "success",
            title: "แก้ไขข้อมูลสำเร็จ",
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 1500,
          });
          this.closeDeleteDialog(); // Close the modal after successful update
          this.fetchProducts(); 
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
