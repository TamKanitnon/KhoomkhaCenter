<template>
  <v-dialog :value="isDialogOpen" max-width="800px" @input="updateDialogOpen" persistent>
    <v-card>
      <v-card-title justify-center class="mt-2">
        <v-row justify="center" class="mt-2">
          <span align="center" justify="center">Add Brand test</span>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation class="mt-3">
          <v-row justify="center" v-if="isLoading">
            <v-col cols="12" class="text-center">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-col>
          </v-row>
          <v-container v-else>
            <!-- Brand Image -->
            <v-row class="mb-4" align="center" justify="center">
              <v-col cols="3">
                <v-img :src="imagePreviewUrl || defaultImageUrl" alt="Image Preview" max-width="300" @click="triggerFileInput" style="cursor: pointer"></v-img>
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
            <!-- ชื่อสินค้า -->
            <v-row>
              <v-col cols="3">
                <v-col>ชื่อแบรน :</v-col>
              </v-col>
              <v-col cols="9">
                <v-text-field 
                  v-model="form.BrandTitle" 
                  placeholder="ชื่อแบรน" 
                  :rules="[v => !!v || 'กรอกข้อมูล']" 
                  hide-details="auto" 
                  solo dense clearable required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-row justify="center" class="mt-3 mb-1">
          <v-btn color="success " @click="submitForm" :disabled="isLoading">Add</v-btn>
          <v-btn color="error ml-2" @click="closeModal" :disabled="isLoading">Cancel</v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Brand from '@/src/models/Brand';

export default {
  name: 'AddBrand',
  props: {
    isDialogOpen: { type: Boolean, required: true } // Prop to control dialog visibility
  },
  data() {
    return {
      isLoading: false,
      newBrand: new Brand(),
      form: {
        BrandTitle: '',
        BrandId: '',
        BrandImgUrl: '',
      },
      fileInput: null,
      selectedImage: null,
      imagePreviewUrl: null,
      uploadedImageUrl: null,
      imageError: '',
      defaultImageUrl: 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1719187200&semt=sph',
      valid: false,
    };
  },
  computed: {
    ...mapGetters("brand", {
      doneFetchBrands: "brands"
    }),
  },
  created() {
  },
  watch: {
  },
  methods: {
    ...mapActions("brand", {
      uploadBrandImage: "uploadBrandImage",    
    }),
    ...mapActions("brand", {
      addBrand: "postBrand",
    }),
    // --- IMAGE FUNCTIONs ---
    onImageSelected(file) {
      console.log(file)
      if (file) {
        this.selectedImage = file;
        this.imagePreviewUrl = URL.createObjectURL(this.selectedImage);
        this.imageError = '';
      } else {
        this.imagePreviewUrl = null;
        this.imageError = 'เพิ่มรูปภาพ';
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
      this.selectedImage = null;
      this.imagePreviewUrl = null;
      this.imageError = 'เพิ่มรูปภาพ';
    },

    async uploadImage() {
      const formData = new FormData();
      formData.append('file', this.selectedImage);

      const response = await this.uploadBrandImage(formData);
      if (response.status) {
        this.uploadedImageUrl = response.uploadedImageUrl;
        this.form.BrandImgUrl = response.uploadedImageUrl;
        return true;
      } else {
        return false;
      }
    },

    // --- FORM FUNCTION ---
    validateForm() {
      this.$refs.form.validate();
      const { BrandTitle } = this.form;
      if (!this.selectedImage) {
        this.imageError = 'เพิ่มรูปภาพ';
        return false;
      }
      if (!BrandTitle) {
        console.log('Brand title is required');
        return false;
      }
      if (!this.selectedImage) {
        console.log('Image is required');
        return false;
      }
      return true;
    },
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }
      // Call POST api
      try {
        this.isLoading = true;
        // UPLOAD IMAGE
        let isSuccessUpload = await this.uploadImage();
        if (!isSuccessUpload) return;

        // UPLOAD BRAND

        let modifyBrand = {
          BrandTitle: this.form.BrandTitle,
          BrandId: '',
          BrandImgUrl: this.form.BrandImgUrl,
        };

        
        const result = await this.addBrand(modifyBrand);
        console.log(result);
        if (result.isSuccessful) {
          this.$swal({
            icon: "success",
            title: "เพิ่มแบรนสำเร็จ",
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 1500,
          });
          this.$emit('update:isDialogOpen', false);
          this.$emit('add'); 
          this.closeModal(); // Close the modal after successful update
        } else {
          this.$swal({
            icon: "error",
            title: "เพิ่มแบรนไม่สำเร็จ",
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        this.isLoading = false;
        // Handle successful form submission
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        this.isLoading = false;
      }
    },

    // --- OTHER FUNCTION ---
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

<style scoped>
.v-btn {
  min-width: 100px;
}

.v-messages__message {
  text-align: start;
}
</style>
