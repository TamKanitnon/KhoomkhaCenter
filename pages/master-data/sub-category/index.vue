<template>
  <div class="container">
    <loading-page v-if="loading"></loading-page>
    <h2 class="text-center mt-2 mb-4">Sub Category</h2>
    <!-- Search filter -->
    <v-form ref="form">
      <v-row class="mx-1">
        <v-col cols="6" sm="4">
          <v-autocomplete
            v-model="selectedCategory"
            :items="categories"
            item-text="Tiltle"
            label="Category"
            hide-details="auto"
            return-object
            outlined
            clearable
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
          <v-btn color="success" @click="handleAddItem">
            <v-icon class="mr-1">mdi-plus</v-icon> เพิ่ม
          </v-btn>
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
          :items="filteredSubCategory"
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
          <template v-slot:[`item.IsActive`]="{ item }">
            <span v-if="item.IsActive" class="text-success">เปิด</span>
            <span v-else class="text-error">ปิด</span>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn @click="handleEditItem(item)" color="primary"> แก้ไข </v-btn>
            <v-btn @click="openDeleteDialog(item)" color="error"> ปิด </v-btn>
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
    <AddSubCategory v-if="addModal" @add="handleUpdateAdd" @close="handleCloseAdd" :isDialogOpen="addModal" />
    <EditSubCategory v-if="isEdit"  @edit="handleUpdateEdit" @close="handleCloseEdit" :isDialogOpen="isEdit" :editingItem="editingItem" />
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
</template>


<script>
import { mapActions, mapGetters } from 'vuex';
import AddSubCategory from './components/AddSubCategory.vue';
import EditSubCategory from './components/EditSubCategory.vue';

export default {
  name: 'SubCategoryPage',
  components: {
    AddSubCategory,
    EditSubCategory,
  },
  data() {
    return {
      loading: false,
      headers: [
        { text: '#', value: 'index', sortable: false },
        { text: 'Title', value: 'Tiltle', sortable: false },
        { text: 'Id', value: 'ProductSubCategoryId', sortable: false },
        { text: 'หมวดหมู่', value: 'ProductCategoryName', sortable: false },
        { text: 'IsActive', value: 'IsActive', sortable: false },
        { text: '', value: 'actions', sortable: false },
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
      totalItems: 0,
      filterKeyword: '',
      categories: [],
      selectedCategory: null,
      subCategories: [],
      addModal: false,
      isEdit: false,
      editingItem: null,
      deleteDialog: false,
      itemToDelete: null,
    };
  },
  computed: {
    ...mapGetters("product", {
      doneFetchCats: "categories",
      doneFetchSubCats: "subCategories",
      doneFetchSubCatsPage: "subCategoriesPage",
    }),
    filteredSubCategory() {
      return this.subCategories.filter(_subCategory => {
        const searchTerm = this.filterKeyword.toLowerCase();
        return _subCategory.Tiltle.toLowerCase().includes(searchTerm);
      });
    }
  },
  created() {
    this.categories = this.doneFetchCats;
    this.totalItems = this.subCategories.length;
  },
  watch: {
    doneFetchCats(newValue) {
      this.categories = newValue;
    },
  },
  methods: {
    ...mapActions('product', {
      fetchSubCategoryFilter: 'fetchSubCategoriesFilter',
      fetchSubCategoryAll: 'fetchSubCategoriesAll',
      disableSubCategory: 'patchSubCategory'
    }),
    validateForm() {
      if(!this.selectedCategory) return false;
      return true;
    },
    async search() {
      if (!this.validateForm()) {
        this.loading = true;
        try{
          this.fetchSubCategoryAll();
          this.subCategories = this.doneFetchSubCatsPage;
          this.totalItems = this.subCategories.length;
        } catch (error) {
          console.error('Error fetching subCateogries:', error);
        } finally {
          this.loading = false;
        }
      }else{
        this.loading = true;
        try {
          await this.fetchSubCategoryFilter(this.selectedCategory.ProductCategoryId);
          this.subCategories = this.doneFetchSubCatsPage;
          this.totalItems = this.subCategories.length;
        } catch (error) {
          console.error('Error fetching subCateogries:', error);
        } finally {
          this.loading = false;
        }
      }
    },
    onUpdateOptions(options) {
      this.options = options;
    },
    handleAddItem() {
      this.addModal = true;
    },
    handleUpdateAdd() {
      this.addModal = false;
    },
    handleCloseAdd() {
      this.addModal = false;
      this.search();
    },
    handleEditItem(item) {
      this.isEdit = true;
      this.editingItem = item;
      console.log('Editing item:', item);
    },
    handleCloseEdit() {
      this.isEdit = false;
    },
    handleUpdateEdit(){
      this.isEdit = false;
      this.search();
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
        const result = await this.disableSubCategory(this.itemToDelete);
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