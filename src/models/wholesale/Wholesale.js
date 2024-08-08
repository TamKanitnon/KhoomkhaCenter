// src/models/wholesale/Wholesale.js
export default class Wholesale {
  constructor({
    SupplierId = null,
    SupplierName = null,
    CitizenId = null,
    TaxId = null,
    ContactName = null,
    SupplierProfileImage = null,
    SupplierAddressId = null,
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
    this.SupplierId = SupplierId;
    this.SupplierName = SupplierName;
    this.CitizenId = CitizenId;
    this.TaxId = TaxId;
    this.ContactName = ContactName;
    this.SupplierProfileImage = SupplierProfileImage;
    this.SupplierAddressId = SupplierAddressId;
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

export class WholesaleResponse {
  constructor(Page, PageSize, Total, Data){
    this.Page = Page;
    this.PageSize = PageSize;
    this.Total = Total;
    this.Data = Data;
  }
}
