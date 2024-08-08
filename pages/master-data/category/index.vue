<template>
  <div class="container">
    <loading-page v-if="isLoading"></loading-page>
    <h2 class="text-center mt-2 mb-4">Category</h2>
    <div class="row my-5">
      <v-row class="pa-2">
        <v-col cols="12">
          <div class="d-flex justify-space-between align-center mb-3">
            <div> Total item found : {{ totalItems }} </div>
            <div>
              <v-btn @click="handleAddItem" color="success">
                <v-icon class="pr-1"> mdi-plus</v-icon> เพิ่ม
              </v-btn>
            </div>
          </div>
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
            :items="filteredCategory"
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
            <template v-slot:[`item.IsActive`]="{ item }">
              <span v-if="item.IsActive" class="text-success">เปิด</span>
              <span v-else class="text-error">ปิด</span>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn @click="handleEditItem(item)" color="primary"> แก้ไข </v-btn>
              <v-btn @click="openDeleteDialog(item)" color="error"> ปิด </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </div>
    <AddCategory v-if="addModal" @add="handleUpdateAdd" @close="handleCloseAdd" :isDialogOpen="addModal" />
    <EditCategory v-if="isEdit"  @edit="handleUpdateEdit" @close="handleCloseEdit" :isDialogOpen="isEdit" :editingItem="editingItem" />
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
import { mapGetters, mapActions } from "vuex";
import AddCategory from './components/AddCategory.vue';
import EditCategory from './components/EditCategory.vue';

export default {
  name: 'CategoryPage',
  components: {
    AddCategory,
    EditCategory,
  },
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
        { text: 'Index', value: 'index', align: 'left' },
        { text: 'Title', value: 'Tiltle', align: 'center' },
        { text: 'Id ', value: 'ProductCategoryId', align: 'center' },
        { text: 'Status', value: 'IsActive', align: 'center' },
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
      itemToDelete: null,
      filterKeyword: '',
      categories: [],
      addModal: false,
      isEdit: false,
      deleteDialog: false,
    };
  },
  computed: {
    ...mapGetters("product", {
      doneFetchCats: "categories",
      doneFetchSubCats: "subCategories",
      doneFetchUnit: "units",
    }),
    filteredCategory() {
      return this.categories.filter(_category => {
        const searchTerm = this.filterKeyword.toLowerCase();
        return _category.Tiltle.toLowerCase().includes(searchTerm);
      });
    }
  },
  watch: {
    doneFetchCats(newValue){
      this.categories = newValue;
    }
  },
  
  created() {
    this.categories = this.doneFetchCats 
    this.totalItems = this.categories.length; // Set totalItems based on the already fetched data
  },
  methods: {
    ...mapActions( 'product',{
        fetchCategories: "fetchCategories",
        disableCategroy: "patchCategory"
      }),
    onUpdateoptions(options) {
      this.options = options;
      // Add your fetch logic here if needed
    },
    handleViewDetail() {
      console.log('View detail');
    },
    handleAddItem() {
      this.addModal = true;
    },
    handleUpdateAdd() {
      this.addModal = false;
    },
    handleCloseAdd() {
      this.addModal = false;
      this.fetchCategories();
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
      this.fetchCategories();
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
        const result = await this.disableCategroy(this.itemToDelete);
        if (result.isSuccessful) {
          this.$swal({
            icon: "success",
            title: "Deleted successfully",
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 1500,
          });
          this.closeDeleteDialog();
          this.fetchCategories(); // Refresh the list
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
