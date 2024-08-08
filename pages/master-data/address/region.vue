<template>
  <div class="container">
    <loading-page v-if="loading"></loading-page>
    <h2 class="text-center mt-2 mb-4">Address : ภาค(Region)</h2>
    <div class="row my-5">
      <div class="col-12 pa-2">
        <v-row class="my-3 mx-1" justify="space-between" align="center">
          <div> Total item found: {{ totalItems }} item</div>
          <!-- <v-btn color="success" @click="handleAddItem">
            <v-icon class="mr-1"> mdi-plus</v-icon> เพิ่ม
          </v-btn> -->
        </v-row>
        <v-data-table
          :headers="headers"
          :items="regions"
          :options.sync="options"
          :server-items-length="totalItems"
          :loading="loading"
          :items-per-page="options.itemsPerPage"
          :footer-props="{ 'items-per-page-options': [] }"
          @update:options="onUpdateOptions"
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
    <AddRegion v-if="addModal" @close="handleCloseAdd" :isDialogOpen="addModal" />
    <EditRegion v-if="isEdit" @close="handleCloseEdit" :isDialogOpen="isEdit" :editingItem="editingItem" />
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
import AddRegion from './components/AddRegion.vue'
import EditRegion from './components/EditRegion.vue'

export default {
  name: 'RegionPage',
  components: {
    AddRegion,
    EditRegion
  },
  data() {
    return {
      loading: false,
      headers: [
        { text: '#', value: 'index' , sortable: false},
        { text: 'Region name', value: 'RegionName', sortable: false },
        { text: 'Region Id', value: 'RegionId', sortable: false },
        // { text: '', value: 'action' , sortable: false},
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
      totalItems: 0,
      regions: [
      ],
      addModal: false,
      isEdit: false,
      editingItem: new Region(),
      editingDialog: false,
      itemToDelete: null,
      deleteDialog: false,
    }
  },
  computed: {
    ...mapGetters('master-data', {
      doneFetchRegion: 'regions',
    })
  },
  created(){
    this.regions = this.doneFetchRegion;
    this.totalItems = this.regions.length;
  },
  watch: {
    doneFetchRegion(newValue) {
      this.regions = newValue;
      this.totalItems = this.regions.length
    },
    refreshTotalItem(newValue) {
      this.totalItems = newValue;
    }
  },
  methods: {
    ...mapActions('master-data', {
      fetchRegion: 'fetchRegions',
      addRegion: 'postRegion',
      editRegion: 'putRegion',
      deleteRegion: 'deleteRegion',
    }),
    onUpdateOptions(options) {
      this.options = options;
      // this.fetchProducts(); // Fetch new page data
    },
    handleAddItem(){
      this.addModal = true;
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
      const result = await this.deleteRegion(this.itemToDelete)
      if (result.isSuccessful) {
          this.$swal({
            icon: "success",
            title: "แก้ไขข้อมูลสำเร็จ",
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 1500,
          });
          this.closeDeleteDialog(); // Close the modal after successful update
          this.fetchRegion(); 
        } else {
          this.$swal({
            icon: "error",
            title: result.status,
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 5000,
          });
        }
    },
  }
}
</script>
