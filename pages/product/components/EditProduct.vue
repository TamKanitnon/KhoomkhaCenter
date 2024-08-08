<template>
  <v-dialog :value="isDialogOpen" max-width="800px" @input="updateDialogOpen" persistent>
    <v-card>
      <v-card-title justify-center class="mt-2">
        <v-row justify="center" class="mt-2">
          <span align="center" justify="center" >Edit Item</span>
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
            <!-- Product Image -->
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
                <v-col>ชื่อสินค้า :</v-col>
              </v-col>
              <v-col cols="9">
                <v-text-field v-model="form.ProductName" placeholder="ชื่อสินค้า" :rules="[v => !!v || 'กรอกข้อมูล']" solo dense clearable required></v-text-field>
              </v-col>
            </v-row>
            <!-- รายละเอียดสินค้า -->
            <v-row>
              <v-col cols="3">
                <v-col>รายละเอียดสินค้า :</v-col>
              </v-col>
              <v-col cols="9">
                <v-textarea rows="2" v-model="form.ProductDescription" placeholder="รายละเอียดสินค้า" solo dense hide-details clearable></v-textarea>
              </v-col>
            </v-row>
            <!-- หมวดหมู่และหมวดหมู่ย่อย -->
            <v-row>
              <!-- หมวดหมู่ -->
              <v-col cols="2">
                <v-col>หมวดหมู่ :</v-col>
              </v-col>
              <v-col cols="4">
                <v-select 
                  v-model="form.Category" 
                  :items="categories" 
                  item-text="Tiltle"
                  :rules="[v => !!v || 'เลือกหมวดหมู่']" 
                  label="Category" 
                  @change="handleCategoryChange()" 
                  hide-details="auto" 
                  return-object 
                  dense outlined 
                />
              </v-col>
              <!-- หมวดหมู่ย่อย -->
              <v-col cols="2">
                <v-col>หมวดหมู่ย่อย :</v-col>
              </v-col>
              <v-col cols="4">
                <v-select 
                  v-model="form.SubCategory" 
                  :items="subCategories" 
                  item-text="Tiltle"
                  :rules="[v => !!v || 'เลือกหมวดหมู่ย่อย']" 
                  label="Sub Category"
                  hide-details="auto" 
                  return-object 
                  dense outlined 
                />
              </v-col>
            </v-row>
            <!-- แบรนด์ + Unit -->
            <v-row>
              <!-- แบรนด์ -->
              <v-col cols="2">
                <v-col>Brand :</v-col>
              </v-col>
              <v-col cols="4">
                <v-autocomplete 
                  v-model="form.Brand" 
                  :items="brands" 
                  item-text="BrandTitle"
                  label="Brand" 
                  hide-details="auto" 
                  return-object 
                  dense outlined 
                />
              </v-col>
              <!-- Unit -->
              <v-col cols="2">
                <v-col>หน่วยสินค้า :</v-col>
              </v-col>
              <v-col cols="4">
                <v-autocomplete 
                  v-model="form.Unit" 
                  :items="units" 
                  item-text="UnitTitle"
                  :rules="[v => !!v || 'เลือกหน่วยสินค้า']" label="หน่วยสินค้า" 
                  hide-details="auto" 
                  return-object
                  dense outlined
                />
              </v-col>
            </v-row>

            <v-row>
              <!-- Weight -->
              <v-col cols="2">
                <v-col>น้ำหนัก (กก.)</v-col>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="form.MeasurementValue" type="text" placeholder="น้ำหนัก" solo dense hide-details hide-spin-buttons required @keypress="isNumberKey"></v-text-field>
              </v-col>
              <!-- Width -->
              <v-col cols="2">
                <v-col>กว้าง (cm)</v-col>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="form.SizeWidth" type="text" placeholder="กว้าง" solo dense hide-details hide-spin-buttons required @keypress="isNumberKey" ></v-text-field>
              </v-col>
              <!-- Length -->
              <v-col cols="2">
                <v-col>ยาว (cm)</v-col>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="form.SizeLong" type="text" placeholder="ยาว" solo dense hide-details hide-spin-buttons required @keypress="isNumberKey" ></v-text-field>
              </v-col>
              <!-- Height -->
              <v-col cols="2">
                <v-col>สูง (cm)</v-col>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="form.SizeHeight" type="text" placeholder="สูง" solo dense hide-details hide-spin-buttons required @keypress="isNumberKey" ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-row justify="center" class="mt-3 mb-1">
          <v-btn color="success " @click="submitForm" :disabled="isLoading">Update</v-btn>
          <v-btn color="error ml-2" @click="closeModal" :disabled="isLoading">Cancel</v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Product from '@/src/models/product/Product';
import Brand from '@/src/models/Brand';
import Category from '@/src/models/master/Category';
import SubCategory from '@/src/models/master/SubCategory';
import Unit from '@/src/models/master/Unit';

export default {
  name: 'EditProduct',
  props: {
    editingItem: { type: Product, required: true },
    isDialogOpen: { type: Boolean, required: true } // Prop to control dialog visibility
  },
  data() {
    return {
      isLoading: false,
      editingProduct: new Product(),
      form: {
        ProductName: "",
        ProductDescription: "",
        ImgUrl: "",
        Brand: null,
        Category: null,
        SubCategory: null,
        Unit: null,
        MeasurementValue: 0,
        SizeWidth: 0,
        SizeLong: 0,
        SizeHeight: 0,
      },
      categories: [],
      subCategories: [],
      brands: [],
      units: [],
      isEditImage: false,
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
    ...mapGetters("product", {
      doneFetchCats: "categories",
      doneFetchSubCats: "subCategories",
      doneFetchUnit: "units",
      updateEditingProduct: "editingProduct",
    })
  },
  created() {
    this.brands = this.doneFetchBrands;
    this.categories = this.doneFetchCats
    this.units = this.doneFetchUnit
  },
  watch: {
    editingItem: {
      immediate: true,
      async handler(newValue) {
        
          this.isLoading = true;
          try {
            console.log(newValue)
            await this.fetchProductDetail(newValue.ProductId);
            await this.fetchProductAttribute(newValue.ProductDetailId);
            await this.fetchProductImage(newValue.ProductImageId);
            this.editingProduct = this.updateEditingProduct;

            // Assign general detail
            this.form.ProductName = this.editingProduct.ProductName;
            this.form.ProductDescription = this.editingProduct.ProductDescription;
            this.form.ImgUrl = this.editingProduct.ImgUrl;
            this.form.MeasurementValue = this.editingProduct.MeasurementValue;
            this.form.SizeWidth = this.editingProduct.SizeWidth;
            this.form.SizeLong = this.editingProduct.SizeLong;
            this.form.SizeHeight = this.editingProduct.SizeHeight;
            this.defaultImageUrl = this.form.ImgUrl;

            // Assign category Id + Title
            console.log(this.editingProduct.ProductCategoryId)
            const _selectedCategory = this.categories.find(category => category.ProductCategoryId === this.editingProduct.ProductCategoryId);            
            this.form.Category = _selectedCategory;

            // Get list SubCategory
            await this.fetchSubCategory(this.form.Category.ProductCategoryId);
            this.subCategories = this.doneFetchSubCats;
            // Assign subCategory Id + Title
            const _selectedSubCategory = this.subCategories.find(subCategory => subCategory.ProductSubCategoryId === this.editingProduct.ProductSubCategoryId);
            this.form.SubCategory = _selectedSubCategory;

            // Assign Brand Id + Title
            const _selectedBrand = this.brands.find(brand => brand.BrandId === this.editingProduct.BrandId);
            if(_selectedBrand){
              this.form.Brand = _selectedBrand;
            }

            // Assign unit Id + Title
            const _selectedUnit = this.units.find(unit => unit.UnitId === this.editingProduct.UnitId);
            this.form.Unit = _selectedUnit;
          } catch (error) {
            console.error('Error fetching product details:', error);
          } finally {
            this.isLoading = false;
          }
        
      }
    },
    doneFetchBrands(newValue) {
      this.brands = newValue;
    },
    doneFetchCats(newValue) {
      this.categories = newValue;
    },
    doneFetchSubCats(newValue) {
      this.subCategories = newValue;
    },
    doneFetchUnit(newValue) {
      this.units = newValue;
    }
  },
  methods: {
    ...mapActions("product", {
      fetchSubCategory: "fetchSubCategories",
      fetchProductDetail: "fetchProductDetail",
      fetchProductAttribute: "fetchProductAttribute",
      fetchProductImage: "fetchProductImage",
      uploadProductImage: "uploadProductImage",
      updateProduct: "putProductItem",
    }),
    async handleCategoryChange() {
      console.log('Selected category title', this.form.Category.ProductCategoryTitle);
      await this.fetchSubCategory(this.form.Category.ProductCategoryId);
      this.subCategories = this.doneFetchSubCats;
      this.form.SubCategory = null;
    },
        // --- IMAGE FUNCTIONs ---
    onImageSelected(file) {
      console.log(file)
      if (file) {
        this.selectedImage = file;
        this.imagePreviewUrl = URL.createObjectURL(this.selectedImage);
        this.imageError = '';
        this.isEditImage = true;
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

      const response = await this.uploadProductImage(formData);
      if (response.status) {
        this.uploadedImageUrl = response.uploadedImageUrl;
        this.form.ImgUrl = response.uploadedImageUrl;
        return true;
      } else {
        return false;
      }
    },

    // --- FORM FUNCTION ---
    validateForm() {
      this.$refs.form.validate();
      const { ProductName, Category, SubCategory, Unit } = this.form;

      if (!ProductName) {
        console.log('Product Name is required');
        return false;
      }
      if (!Category || !Category.ProductCategoryId) {
        console.log('Category is required');
        return false;
      }
      if (!SubCategory || !SubCategory.ProductSubCategoryId) {
        console.log('Sub-Category is required');
        return false;
      }
      if (!Unit || !Unit.UnitId) {
        console.log('Unit is required');
        return false;
      }
      return true;
    },
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }

      // Proceed with form submission, e.g., make API call
      try {
        this.isLoading = true;
        if(this.isEditImage){
          let isSuccessUpload = await this.uploadImage();
          if (!isSuccessUpload) return;
        }
        let modifyProduct = {
          ...this.editingItem,
          ProductName: this.form.ProductName,
          ProductCategoryId: this.form.Category.ProductCategoryId,
          ProductSubCategoryId: this.form.SubCategory.ProductSubCategoryId,
          ImgUrl: this.form.ImgUrl,
          ProductDescription: this.form.ProductDescription ?? '',
          BrandId: '',
          BrandTitle: '',
          UnitId: this.form.Unit.UnitId,
          MeasurementValue: this.form.MeasurementValue ?? 0,
          SizeWidth: this.form.SizeWidth ?? 0,
          SizeLong: this.form.SizeLong ?? 0,
          SizeHeight: this.form.SizeHeight ?? 0,
        };
        if(this.form.Brand){
          modifyProduct = {
            ...modifyProduct,
            BrandId: this.form.Brand.BrandId ?? '',
            BrandTitle: this.form.Brand.BrandTitle ?? '',
          }
        }
        const result = await this.updateProduct(modifyProduct);
        console.log(result)
        if (result.isSuccessful) {
          this.$swal({
            icon: "success",
            title: "แก้ไขข้อมูลสำเร็จ",
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 1500,
          });
          this.$emit('edit'); 
          this.closeModal(); // Close the modal after successful update
        } else {
          this.$swal({
            icon: "error",
            title: "แก้ไขข้อมูลไม่สำเร็จ",
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 1500,
          });
        }

        this.isLoading = false
        // Handle successful form submission
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        this.isLoading = false;
      }
    },

    // --- OTHER FUNCTION ---
    isNumberKey(event) {
      const charCode = event.which ? event.which : event.keyCode;
      // Allow numbers (0-9) and one decimal point
      if (
        charCode >= 48 && charCode <= 57 || // Numbers 0-9
        charCode === 46 // Decimal point
      ) {
        // Allow only one decimal point
        if (charCode === 46 && event.target.value.includes('.')) {
          event.preventDefault();
        }
        return true;
      } else {
        event.preventDefault();
        return false;
      }
    },
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