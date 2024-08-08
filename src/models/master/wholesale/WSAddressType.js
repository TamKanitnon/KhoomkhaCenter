// src/models/master/wholesale/WSAddressType.js
export default class WSAddressType {
  constructor({
    AddressTypeName = null,
    AddressTypeCode = null,
  } = {}) {
    this.AddressTypeName = AddressTypeName;
    this.AddressTypeCode = AddressTypeCode;
  }
}