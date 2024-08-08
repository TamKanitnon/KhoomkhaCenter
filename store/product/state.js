//store/product/state.js
import Product from "../../src/models/product/Product";
import Category  from "../../src/models/master/Category";
import SubCategory  from "../../src/models/master/SubCategory";
import Unit  from "../../src/models/master/Unit";
import { categories, subCategories } from "./getters";

export default function() {
return {
    products: [],
    page: 1,
    pageSize: 50,
    total: 0,
    params: {},
    editingProduct: new Product(),
    categories: [],
    category: new Category(),
    subCategories: [],
    subCategoriesPage: [],
    subCategory: new SubCategory(),
    units: [],
    unit: new Unit(),
  };
}
