// src/models/grocery/Grocery.js
export default class Grocery {
  constructor({
    GroceryId = null,
    GroceryName = null,
    ContactName = null,
    ContactphoneNo = null,
    Address = null,
    Address2 = null,
    SubDistrictId = null,
    SubDistrictName = null,
    DistrictId = null,
    DistrictName = null,
    ProvinceId = null,
    ProvinceName = null,
    RegionId = null,
    RegionName = null,
    ZipCode = null,
  } = {}) {
    this.GroceryId = GroceryId;
    this.GroceryName = GroceryName;
    this.ContactName = ContactName;
    this.ContactphoneNo = ContactphoneNo;
    this.Address = Address;
    this.Address2 = Address2;
    this.SubDistrictId = SubDistrictId;
    this.SubDistrictName = SubDistrictName;
    this.DistrictId = DistrictId;
    this.DistrictName = DistrictName;
    this.ProvinceId = ProvinceId;
    this.ProvinceName = ProvinceName;
    this.RegionId = RegionId;
    this.RegionName = RegionName;
    this.ZipCode = ZipCode;
  }
}

export class GroceryResponse {
  constructor(Page, PageSize, Total, Data){
    this.Page = Page;
    this.PageSize = PageSize;
    this.Total = Total;
    this.Data = Data;
  }
}
