// src/models/master/address/Region.js
export default class Region {
  constructor({
    RegionId = null,
    RegionName = null,
  } = {}) {
    this.RegionId = RegionId;
    this.RegionName = RegionName;
  }
}