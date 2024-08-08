export default class FeeGP {
  constructor({
    OrderId = null,
    FeeProfileImageUrl = null,
    WholesaleId = null,
    GroceryId = null,
    DeliveryStatus = null,
    OrderDetail = null,
    Profit = null,
    PayStatus = null,
  } = {}) {
    this.OrderId = OrderId;
    this.FeeProfileImageUrl = FeeProfileImageUrl;
    this.WholesaleId = WholesaleId;
    this.GroceryId = GroceryId;
    this.DeliveryStatus = DeliveryStatus;
    this.OrderDetail = OrderDetail;
    this.Profit = Profit;
    this.PayStatus = PayStatus;
  }
}
