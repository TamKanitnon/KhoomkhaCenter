<template>
  <v-dialog :value="isDialogOpen" max-width="700px" @input="updateDialogOpen" persistent>
    <v-card>
      <v-card-title justify-center>
        <v-row justify="center" class="mt-1" >
          <span align="center" justify="center">Edit Sub Category</span>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" class="mt-3">
          <v-row justify="center" v-if="isLoading">
            <v-col cols="12" class="text-center">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-col>
          </v-row>
          <div v-else>
            <!-- Product Image -->
            <v-row class="mb-4" align="center" justify="center">
              <v-col cols="3">
                <v-img 
                  :src="imagePreviewUrl || defaultImageUrl" 
                  alt="Image Preview" 
                  max-width="400"
                  @click="triggerFileInput" 
                  style="cursor: pointer;"
                ></v-img>
              </v-col>
              <v-col cols="6" align="center">
                <v-file-input
                  ref="fileInput"
                  v-model="selectedImage"
                  label="Choose an image"
                  accept="image/*"
                  prepend-icon="mdi-image"
                  @change="onImageSelected"
                  @click:clear="clearImage"
                  :error-messages="imageError"
                  outlined
                  dense
                  required
                ></v-file-input>
              </v-col>
            </v-row>
            <!-- DETAIL INPUT -->
            <v-row class="mt-3 mb-1">
              <!--  CATEGORY NAME -->
              <v-col cols="3" class="py-0 mt-2 text-center ">
                หมวดหมู่หลัก :
              </v-col>
              <v-col cols="9" class="py-0 mb-3">
                <v-select
                  v-model="selectedCategory"
                  :items="categories"
                  item-text="Tiltle"
                  label="Category"
                  :rules="[v => !!v || 'เลือกหมวดหมู่']"
                  hide-details="auto"
                  return-object
                  required
                  outlined
                  clearable
                  dense
                ></v-select>
              </v-col>
              <!-- SUB CATEGORY NAME -->
              <v-col cols="3" class="py-0 mt-2 text-center ">
                ชื่อ หมวดหมู่ย่อย :
              </v-col>
              <v-col cols="9" class="py-0 mb-3">
                <v-text-field
                  v-model="form.Title"
                  placeholder="Eg. อาหาร อุปกรณ์ อื่นๆ"
                  :rules="[v => !!v || 'กรอกข้อมูล']"
                  hide-details="auto"
                  solo
                  dense
                  clearable
                  required
                ></v-text-field>
              </v-col>
              <!-- SUB CATEGORY CODE -->
              <v-col cols="3" class="py-0 mt-2 text-center">
                Code(Optional) :
              </v-col>
              <v-col cols="9" class="py-0 mb-3">
                <v-text-field
                  v-model="form.CategoryCode"
                  placeholder="Eg. : MEAT_PROD, OFFICE_PROD"
                  hide-details="auto"
                  solo
                  dense
                  clearable
                ></v-text-field>
              </v-col>
              <!-- IS_ACTIVE -->
              <v-col cols="3" class="py-0 mt-2 text-center">
                Active :
              </v-col>
              <v-col cols="9" class="py-0">
                <v-switch
                  hide-details="auto"
                  v-model="form.IsActive"
                  :label="` ${form.IsActive? 'เปิด' : 'ปิด'}`"
                ></v-switch>
              </v-col>
            </v-row>
          </div>
        </v-form>
        <v-row justify="center" class="mt-0 mb-1">
          <v-btn color="success" @click="submitForm" :disabled="isLoading">Update</v-btn>
          <v-btn color="error ml-2" @click="closeModal" :disabled="isLoading">Cancel</v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import SubCategory from '@/src/models/master/SubCategory';

export default {
  name: 'EditSubCategory',
  props: {
    editingItem: { type: SubCategory, required: true },
    isDialogOpen: { type: Boolean, required: true } // Prop to control dialog visibility
  },
  data() {
    return {
      isLoading: false,
      editingSubCats: new SubCategory(),
      categories: [],
      selectedCategory: null,
      form: {
        Title: '',
        SubCategoryCode: '',
        IsActive: false,
        ImgUrl: '',
      },
      isEditImage: false,
      fileInput: null,
      selectedImage: null,
      imagePreviewUrl: null,
      uploadedImageUrl: null,
      imageError: '',
      defaultImageUrl: 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1719187200&semt=sph',
    };
  },
  computed: {
    ...mapGetters("product", {
      doneFetchCats: "categories",
    }),
  },
  created() {
    this.categories = this.doneFetchCats;
    this.selectedCategory = this.categories.find(item => item.Tiltle === this.editingSubCats.ProductCategoryName);
  },
  watch: {
    doneFetchCats(newValue) {
      this.categories = newValue;
    },
    editingItem: {
      immediate: true,
      async handler(newValue) {
          this.isLoading = true;
          try {
            this.editingSubCats = this.editingItem;
            console.log(this.editingSubCats);
            this.form.Title = this.editingSubCats.Tiltle;
            if(this.editingSubCats.ImgUrl){
              this.form.ImgUrl= this.editingSubCats.ImgUrl;
              this.defaultImageUrl = this.editingSubCats.ImgUrl;
            }
            if(this.editingSubCats.SubCategoryCode){
              this.form.SubCategoryCode = this.editingSubCats.SubCategoryCode;
            }
            if(this.editingSubCats.IsActive){
              this.form.IsActive = this.editingSubCats.IsActive;
            }
          } catch (error) {
            console.error('Error assign details:', error);
          } finally {
            this.isLoading = false;
          }
        
      }
    },
  },
  methods: {
    ...mapActions("product", {
      uploadProductImage: "uploadProductImage",
      editSubCategory: "putSubCategory",
    }),
    // --- IMAGE FUNCTIONs ---
    onImageSelected(file) {
      console.log(file)
      if (file) {
        this.isEditImage = true;
        this.selectedImage = file;
        this.imagePreviewUrl = URL.createObjectURL(this.selectedImage);
        this.imageError = '';
      } else {
        this.isEditImage = false;
        this.imagePreviewUrl = null;
        // this.imageError = 'เพิ่มรูปภาพ';
      }
    },
    triggerFileInput() {
      console.log('image clicked');
      const fileInputElement = this.$refs.fileInput.$el.querySelector('input[type="file"]');
      if (fileInputElement) {
        fileInputElement.click();
      }
    },
    clearImage() {
      this.isEditImage = false;
      this.selectedImage = null;
      this.imagePreviewUrl = null;
      // this.imageError = 'เพิ่มรูปภาพ';
    },
    async uploadImage() {
      const formData = new FormData();
      formData.append('file', this.selectedImage);

      const response = await this.uploadProductImage(formData);
      if (response.status) {
        this.uploadedImageUrl = response.uploadedImageUrl;
        this.form.ImgUrl = response.uploadedImageUrl;
        return true;
      } else {
        return false;
      }
    },

    // --- FORM  FUNCTION ---
    validateForm() {
      this.$refs.form.validate();
      const { Title } = this.form;
      if(this.isEditImage){
        if(!this.selectedImage){
          this.imageError = 'เพิ่มรูปภาพ';
          return false;
        }
      }
      if(!Title){
        console.log('Title is required');
        return false;
      } 
      if(!this.selectedCategory){
        console.log('Category is required');
        return false;
      }
      return true;
    },
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }

      // Call POST product
      try {
        this.isLoading = true;
        // TRY UPLOAD IMAGE
        if(this.isEditImage){
          let isSuccessUpload = await this.uploadImage();
          if (!isSuccessUpload) return;
        }
        let modifyInput = {
          ProductSubCategoryId: this.editingSubCats.ProductSubCategoryId,
          ProductCategoryId: this.selectedCategory.ProductCategoryId,
          Tiltle: this.form.Title,
          SubCategoryCode: this.form.SubCategoryCode || null,
          IsActive: this.form.IsActive,
          ImgUrl: this.form.ImgUrl
        };
        const result = await this.editSubCategory(modifyInput);
        if(result.isSuccessful){
          this.$emit('edit'); 
          this.closeModal();
        }
        console.log(result);

        this.isLoading = false
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },

    // --- MODAL STATE MANAGEMENT ---
    closeModal() {
      this.$emit('update:isDialogOpen', false); // Emit event to close dialog
      this.$emit('close'); // Emit close event to parent
    },
    updateDialogOpen(value) {
      this.$emit('update:isDialogOpen', value);
    }


  },
};
</script>
