// src/models/Brand.js
export default class Brand {
  constructor({
    BrandId = null,
    BrandTitle = null,
    BrandImgUrl = null,
  } = {}) {
    this.BrandId = BrandId;
    this.BrandTitle = BrandTitle;
    this.BrandImgUrl = BrandImgUrl;
  }
}

export class BrandResponse {
  constructor(Page, PageSize, Total, Data){
    this.Page = Page;
    this.PageSize = PageSize;
    this.Total = Total;
    this.Data = Data;
  }
}
