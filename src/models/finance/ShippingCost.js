export default class ShippingCost {
  constructor({
    OrderId = null,
    RiderProfileImageUrl = null,
    RiderId = null,
    RiderName = null,
    RiderPhone = null,
    RiderFrom = null,
    RiderBankAcc = null,
    DeliveryStatus = null,
    ShippingCost = null,
    PayStatus = null,
  } = {}) {
    this.OrderId = OrderId;
    this.RiderProfileImageUrl = RiderProfileImageUrl;
    this.RiderId = RiderId;
    this.RiderName = RiderName;
    this.RiderPhone = RiderPhone;
    this.RiderFrom = RiderFrom;
    this.RiderBankAcc = RiderBankAcc;
    this.DeliveryStatus = DeliveryStatus;
    this.ShippingCost = ShippingCost;
    this.PayStatus = PayStatus;
  }
}
