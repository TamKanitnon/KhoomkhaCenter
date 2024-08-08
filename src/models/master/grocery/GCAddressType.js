// src/models/master/grocery/GCAddressType.js
export default class GCAddressType {
  constructor({
    AddressTypeName = null,
    AddressTypeCode = null,
  } = {}) {
    this.AddressTypeName = AddressTypeName;
    this.AddressTypeCode = AddressTypeCode;
  }
}