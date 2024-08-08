<template>
  <div>
    <v-container>
      <v-row align="center">
        <!-- TITLE -->
        <v-col cols="12" sm="6" md="6">
          Title
          <v-text-field v-model="formSearch.ProductTitle" label="Product Title" hide-details="auto" outlined dense />
        </v-col>
        <!-- BRAND -->
        <v-col cols="12" sm="6" md="6">
          Brand
            <v-autocomplete v-model="formSearch.Brand" :items="brands" item-text="BrandTitle" return-object  label="Brand" hide-details="auto" outlined dense/>
            <!-- <v-btn class="ml-2" color="primary" @click="refreshBrand">refresh</v-btn> -->
        </v-col>
      </v-row>
      <v-row align="end">
        <!-- CATEGORY -->
        <v-col cols="12" md="4">
          Category
          <v-select v-model="formSearch.Category" :items="categories" item-text="Tiltle" @change="handleSelectCategory" return-object label="Category" hide-details="auto"  outlined dense />
        </v-col>
        <!-- SUB CATEGORY -->
        <v-col cols="12" md="4">
          Sub Category
          <v-select v-model="formSearch.SubCategory" :items="subCategories" item-text="Tiltle" return-object label="Sub Category" hide-details="auto"  outlined dense />
        </v-col>
        <!-- SEARCH BUTTON -->
        <v-col cols="12" md="4">
          <v-btn @click="fetchData" color="primary">Search</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions ,mapMutations, mapGetters } from "vuex";
import Brand from '@/src/models/Brand';
import Category from '@/src/models/master/Category';
import SubCategory from '@/src/models/master/SubCategory';

export default {
  name: 'SearchBar',
  data() {
    return {
      formSearch: {
        ProductTitle: null,
        Brand: new Brand(),
        Category: new Category(),
        SubCategory: new SubCategory(),
        page: '1', // Ensure these are always included
        pageSize: '50',
      },
      brands: [],
      categories: [],
      subCategories: [],
    };
  },
  computed: {
    ...mapGetters("brand", {
      doneFetchBrands: "brands"
    }),
    ...mapGetters("product", {
      doneFetchCats: "categories",
      doneFetchSubCats: "subCategories",
    }),
  },
  watch: {
    doneFetchBrands(newValue){
      this.brands = newValue
    },
    doneFetchCats(newValue) {
      this.categories = newValue;
    },
    doneFetchSubCats(newValue){
      this.subCategories = newValue
    }
  },
  created() {
    this.brands = this.doneFetchBrands;
    this.categories = this.doneFetchCats;
    console.log(this.brands)
  },
  methods: {
    ...mapActions("product", {
      fetchSubCategory: "fetchSubCategories",
      searchProduct: "fetchProducts",
    }),
    async fetchData() {
      try {
        let params = {
          ProductTitle: this.formSearch.ProductTitle,
          BrandId: this.formSearch.Brand.BrandId,
          CategoryId: this.formSearch.Category.ProductCategoryId,
          SubCategoryId: this.formSearch.SubCategory.ProductSubCategoryId,
          page: '1',
          pageSize: '50',
        }
        this.searchProduct(params);
        this.$emit('search-click', this.searchQuery)
        return
      } catch (error) {
        console.log(error);
      }
    },
    async handleSelectCategory( _category ) {
      try{
        let res = await this.fetchSubCategory(_category.ProductCategoryId);
        this.subCategories = this.doneFetchSubCats;
        // console.log('--- data ---',res.data)
        console.log('--- data ---',this.subCategories)
        return
      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>

<style></style>
