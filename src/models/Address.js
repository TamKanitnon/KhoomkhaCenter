// src/models/Address.js
export default class Address {
  constructor(street, city, province, postalCode, country) {
    this.street = street;
    this.city = city;
    this.province = province;
    this.postalCode = postalCode;
    this.country = country;
  }

  // You can add methods here
  getFullAddress() {
    return `${this.street}, ${this.city}, ${this.province}, ${this.postalCode}, ${this.country}`;
  }
}