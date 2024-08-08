export default class Pay {
  constructor({
    PayTo = null,
    PayFrom = null,
    PayAmount = null,
    PayBy = null,
    PayStatus = null,
    PayDate = null,
  } = {}) {
    this.PayTo = PayTo;
    this.PayFrom = PayFrom;
    this.PayAmount = PayAmount;
    this.PayBy = PayBy;
    this.PayStatus = PayStatus;
    this.PayDate = PayDate;
  }
}
