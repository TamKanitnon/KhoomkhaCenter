// src/models/master/Category.js
export default class Category {
  constructor({
    ProductCategoryId = null,
    Tiltle = null,
    IsActive = null,
    // ImgUrl = null,
    ImageBanner = null,
    ImageIcon = null,
    CategoryCode = null,
  } = {}) {
    this.ProductCategoryId = ProductCategoryId;
    this.Tiltle = Tiltle;
    this.IsActive = IsActive;
    // this.ImgUrl = ImgUrl;
    this.ImageBanner = ImageBanner;
    this.ImageIcon = ImageIcon;
    this.CategoryCode = CategoryCode;
  }
}