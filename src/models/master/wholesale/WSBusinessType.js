// src/models/master/wholesale/WSBusinessType.js
export default class WSBusinessType {
  constructor({
    BusinessType = null,
    BusinessTypeId = null,
  } = {}) {
    this.BusinessType = BusinessType;
    this.BusinessTypeId = BusinessTypeId;
  }
}