<template>
  <v-dialog :value="isDialogOpen" max-width="700px" @input="updateDialogOpen" persistent>
    <v-card>
      <v-card-title justify-center>
        <v-row justify="center" class="mt-1" >
          <span align="center" justify="center">Edit Category</span>
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
            <!-- Banner Image -->
            <v-row class="mb-4" align="center" justify="center">
              <v-col cols="3">
                <v-img 
                  :src="bannerImagePrivew || defaultBannerImage" 
                  alt="Image Preview" 
                  max-width="400"
                  @click="triggerfileBannerInput" 
                  style="cursor: pointer;"
                ></v-img>
              </v-col>
              <v-col cols="6" align="center">
                <v-file-input
                  ref="fileBannerInput"
                  v-model="selectedBanner"
                  label="Banner image"
                  accept="image/*"
                  prepend-icon="mdi-image"
                  @change="onBannerImageSelected"
                  @click:clear="clearImageBanner"
                  :error-messages="bannerError"
                  outlined
                  dense
                ></v-file-input>
              </v-col>
            </v-row>
            <!-- Icon Image -->
            <v-row class="mb-4" align="center" justify="center">
              <v-col cols="3">
                <v-img 
                  :src="iconImagePreview || defaultIconImage" 
                  alt="Image Preview" 
                  max-width="400"
                  @click="triggerfileIconInput" 
                  style="cursor: pointer;"
                ></v-img>
              </v-col>
              <v-col cols="6" align="center">
                <v-file-input
                  ref="fileIconInput"
                  v-model="selectedIcon"
                  label="Icon image"
                  accept="image/*"
                  prepend-icon="mdi-image"
                  @change="onIconImageSelected"
                  @click:clear="clearImageIcon"
                  :error-messages="iconError"
                  outlined
                  dense
                ></v-file-input>
              </v-col>
            </v-row>
            <!-- DETAIL INPUT -->
            <v-row class="mt-3 mb-1">
              <!-- CATEGORY NAME -->
              <v-col cols="3" class="py-0 mt-2 text-center ">
                ชื่อ หมวดหมู่ :
              </v-col>
              <v-col cols="9" class="py-0">
                <v-text-field
                  v-model="form.Title"
                  placeholder="Eg. อาหาร อุปกรณ์ อื่นๆ"
                  :rules="[v => !!v || 'กรอกข้อมูล']"
                  solo
                  dense
                  clearable
                  required
                ></v-text-field>
              </v-col>
              <!-- CATEGORY CODE -->
              <v-col cols="3" class="py-0 mt-2 text-center">
                Code(Optional) :
              </v-col>
              <v-col cols="9" class="py-0">
                <v-text-field
                  v-model="form.CategoryCode"
                  placeholder="Eg. : MEAT_PROD, OFFICE_PROD"
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
import Category from '@/src/models/master/Category';

export default {
  name: 'EditCategory',
  props: {
    editingItem: { type: Category, required: true },
    isDialogOpen: { type: Boolean, required: true } // Prop to control dialog visibility
  },
  data() {
    return {
      isLoading: false,
      editingCategory: new Category(),
      form: {
        Title: '',
        CategoryCode: '',
        IsActive: false,
        ImageBanner: '',
        ImageIcon: '',
      },
      isEditBanner: false,
      fileBannerInput: null,
      selectedBanner: null,
      bannerImagePrivew: null,
      uploadedBannerImage: null,
      bannerError: '',
      defaultBannerImage: 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1719187200&semt=sph',
      isEditIcon: false,
      fileIconInput: null,
      selectedIcon: null,
      iconImagePreview: null,
      uploadedIconImage: null,
      iconError: '',
      defaultIconImage: 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1719187200&semt=sph',
      valid: false,
    };
  },
  computed: {
  },
  created() {
  },
  watch: {
    editingItem: {
      immediate: true,
      async handler(newValue) {
          this.isLoading = true;
          try {
            this.editingCategory = this.editingItem;
            console.log(this.editingCategory);
            this.form.Title = this.editingCategory.Tiltle;
            if(this.editingCategory.ImageBanner){
              this.form.ImageBanner= this.editingCategory.ImageBanner;
              this.defaultBannerImage = this.editingCategory.ImageBanner;
            }
            if(this.editingCategory.ImageIcon){
              this.form.ImageIcon= this.editingCategory.ImageIcon;
              this.defaultIconImage = this.editingCategory.ImageIcon;
            }
            if(this.editingCategory.CategoryCode){
              this.form.CategoryCode = this.editingCategory.CategoryCode;
            }
            if(this.editingCategory.IsActive){
              this.form.IsActive = this.editingCategory.IsActive;
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
      editCategory: "putCategory",
    }),
    // --- IMAGE FUNCTIONs ---
    // -- BANNER IMAGE
    onBannerImageSelected(file) {
      console.log(file)
      if (file) {
        this.selectedBanner = file;
        this.bannerImagePrivew = URL.createObjectURL(this.selectedBanner);
        this.bannerError = '';
        this.isEditBanner = true;
      } else {
        this.isEditBanner = false;
        this.bannerImagePrivew = null;
        // this.bannerError = 'เพิ่มรูปภาพ';
      }
    },
    triggerfileBannerInput() {
      console.log('image clicked');
      const fileBannerInputElement = this.$refs.fileBannerInput.$el.querySelector('input[type="file"]');
      if (fileBannerInputElement) {
        fileBannerInputElement.click();
      }
    },
    clearImageBanner() {
      this.isEditBanner = false;
      this.selectedBanner = null;
      this.bannerImagePrivew = null;
      // this.bannerError = 'เพิ่มรูปภาพ';
    },
    async uploadBannerImage() {
      const formData = new FormData();
      formData.append('file', this.selectedBanner);

      const response = await this.uploadProductImage(formData);
      if (response.status) {
        this.uploadedBannerImage = response.uploadedImageUrl;
        this.form.ImageBanner = response.uploadedImageUrl;
        return true;
      } else {
        return false;
      }
    },
    // -- ICON IMAGE
    onIconImageSelected(file) {
      console.log(file)
      if (file) {
        this.selectedIcon = file;
        this.iconImagePreview = URL.createObjectURL(this.selectedIcon);
        this.iconError = '';
        this.isEditIcon = true;
      } else {
        this.isEditIcon = false;
        this.iconImagePreview = null;
      }
    },
    triggerfileIconInput() {
      console.log('image clicked');
      const fileIconInputElement = this.$refs.fileIconInput.$el.querySelector('input[type="file"]');
      if (fileIconInputElement) {
        fileIconInputElement.click();
      }
    },
    clearImageIcon() {
      this.isEditIcon = false;
      this.selectedIcon = null;
      this.iconImagePreview = null;
    },
    async uploadIconImage() {
      const formData = new FormData();
      formData.append('file', this.selectedIcon);

      const response = await this.uploadProductImage(formData);
      if (response.status) {
        this.uploadedIconImage = response.uploadedImageUrl;
        this.form.ImageIcon = response.uploadedImageUrl;
        return true;
      } else {
        return false;
      }
    },

    // --- FORM  FUNCTION ---
    validateForm() {
      this.$refs.form.validate();
      const { Title } = this.form;
      if(this.isEditBanner){
        if(!this.selectedBanner){
          this.bannerError = 'เพิ่มรูปภาพ';
          return false;
        } 
      }
      if(this.isEditIcon){
        if(!this.selectedIcon){
          this.iconError = 'เพิ่มรูปภาพ';
          return false;
        } 
      }
      console.log('test');
      if(!Title){
        console.log('Title is required');
        return false;
      } 
      
      return true;
    },
    async submitForm() {
      // VALIDATE BEFOR UPDATE
      if (!this.validateForm()) {
        return;
      }
      // Call POST product
      try {
        this.isLoading = true;
        // TRY UPLOAD IMAGE
        if(this.isEditBanner){
          let isSuccessUpload = await this.uploadBannerImage();
          if (!isSuccessUpload) return;
        }
        if(this.isEditIcon){
          let isSuccessUploadIcon = await this.uploadIconImage();
          if (!isSuccessUploadIcon) return;
        }
        let modifyCategory = {
          ProductCategoryId: this.editingItem.ProductCategoryId,
          Tiltle: this.form.Title,
          CategoryCode: this.form.CategoryCode || null,
          IsActive: this.form.IsActive,
          ImageBanner: this.form.ImageBanner,
          ImageIcon: this.form.ImageIcon,
        };
        const result = await this.editCategory(modifyCategory);
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
