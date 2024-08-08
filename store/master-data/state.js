//store/product/state.js
import Product from "../../src/models/product/Product";
import Category  from "../../src/models/master/Category";
import SubCategory  from "../../src/models/master/SubCategory";
import Unit  from "../../src/models/master/Unit";
import { categories, subCategories } from "./getters";
import WSAddressType from "../../src/models/master/wholesale/WSAddressType";

export default function() {
return {
    regions: [],
    WSAddressTypeList: [],
    WSBusinessTypeList: [],
    GCAddressTypeList: [],
    GCBusinessTypeList: [],
  };
}
