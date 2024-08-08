//store/brand/state.js
import Brand from "@/src/models/Brand";

export default function() {
return {
    brands: [],
    page: 1,
    pageSize: 50,
    total: 0,
    params: {},
    editingBrand: new Brand(),
  };
}
