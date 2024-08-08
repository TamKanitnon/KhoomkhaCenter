export default class Refund {
  constructor({
    OrderNumber = null,
    Customer = null,
    BuyFrom = null,
    Status = null,
    RefundDate = null,
  } = {}) {
    this.OrderNumber = OrderNumber;
    this.Customer = Customer;
    this.BuyFrom = BuyFrom;
    this.Status = Status;
    this.RefundDate = RefundDate;
  }
}
