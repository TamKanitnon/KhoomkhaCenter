// src/models/master/grocery/GCBusinessType.js
export default class GCBusinessType {
  constructor({
    BusinessType = null,
    BusinessTypeCode = null,
  } = {}) {
    this.BusinessType = BusinessType;
    this.BusinessTypeCode = BusinessTypeCode;
  }
}