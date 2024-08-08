// src/models/master/SubCategory.js
export default class SubCategory {
  constructor({
    ProductSubCategoryId = null,
    Tiltle = null,
    SubCategoryCode = null,
    ProductCategoryName = null,
    ImgUrl = null,
    IsActive = null,
  } = {}) {
    this.ProductSubCategoryId = ProductSubCategoryId;
    this.Tiltle = Tiltle;
    this.SubCategoryCode = SubCategoryCode;
    this.ProductCategoryName = ProductCategoryName;
    this.ImgUrl = ImgUrl;
    this.IsActive = IsActive;
  }
}