// src/models/master/bank/Bank.js
export default class Bank {
  constructor({
    BankName = null,
    BankCode = null,
  } = {}) {
    this.BankCode = BankCode;
    this.BankName = BankName;
  }
}