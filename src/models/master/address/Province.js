// src/models/master/address/Province.js
export default class Province {
  constructor({
    ProvinceId = null,
    ProvinceName = null,
  } = {}) {
    this.ProvinceId = ProvinceId;
    this.ProvinceName = ProvinceName;
  }
}