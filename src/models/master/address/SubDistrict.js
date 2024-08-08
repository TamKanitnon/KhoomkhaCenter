// src/models/master/address/SubDistrict.js
export default class SubDistrict {
  constructor({
    SubDistrictId = null,
    SubDistrictName = null,
    ZipCode = null,
  } = {}) {
    this.SubDistrictId = SubDistrictId;
    this.SubDistrictName = SubDistrictName;
    this.ZipCode = ZipCode;
  }
}