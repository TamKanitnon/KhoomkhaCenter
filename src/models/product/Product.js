// src/models/product/Product.js
export default class Product {
  constructor({
    ProductId = null,
    ProductDetailId = null,
    ProductName = null,
    ProductCategoryId = null,
    ProductCategoryName = null,
    ProductSubCategoryId = null,
    ProductSubCategoryName = null,
    ProductImageId = null,
    ImgUrl = null,
    ProductDescription = null,
    ProductSummary = null,
    Barcode = null,
    BrandId = null,
    BrandName = null,
    UnitId = null,
    MeasurementValue = null,
    MeasurementId = null,
    SizeWidth = null,
    SizeLong = null,
    SizeHeight = null
  } = {}) {
    this.ProductId = ProductId;
    this.ProductDetailId = ProductDetailId;
    this.ProductName = ProductName;
    this.ProductCategoryId = ProductCategoryId;
    this.ProductCategoryName = ProductCategoryName;
    this.ProductSubCategoryId = ProductSubCategoryId;
    this.ProductSubCategoryName = ProductSubCategoryName;
    this.ProductImageId = ProductImageId;
    this.ImgUrl = ImgUrl;
    this.ProductDescription = ProductDescription;
    this.ProductSummary = ProductSummary;
    this.Barcode = Barcode;
    this.BrandId = BrandId;
    this.BrandName = BrandName;
    this.UnitId = UnitId;
    this.MeasurementValue = MeasurementValue;
    this.MeasurementId = MeasurementId;
    this.SizeWidth = SizeWidth;
    this.SizeLong = SizeLong;
    this.SizeHeight = SizeHeight;
  }
}

export class ProductResponse {
  constructor(Page, PageSize, Total, Data){
    this.Page = Page;
    this.PageSize = PageSize;
    this.Total = Total;
    this.Data = Data;
  }
}
