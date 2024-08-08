// src/models/master/address/District.js
export default class District {
  constructor({
    DistrictId = null,
    DistrictName = null,
  } = {}) {
    this.DistrictId = DistrictId;
    this.DistrictName = DistrictName;
  }
}