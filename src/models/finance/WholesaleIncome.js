export default class WholesaleIncome {
  constructor({
    OrderId = null,
    WholesaleProfileImageUrl = null,
    WholesaleId = null,
    WholesaleName = null,
    WholesalePhone = null,
    WholesaleBankAcc = null,
    DeliveryStatus = null,
    WholesaleIncome = null,
    PayStatus = null,
  } = {}) {
    this.OrderId = OrderId;
    this.WholesaleProfileImageUrl = WholesaleProfileImageUrl;
    this.WholesaleId = WholesaleId;
    this.WholesaleName = WholesaleName;
    this.WholesalePhone = WholesalePhone;
    this.WholesaleBankAcc = WholesaleBankAcc;
    this.DeliveryStatus = DeliveryStatus;
    this.WholesaleIncome = WholesaleIncome;
    this.PayStatus = PayStatus;
  }
}
