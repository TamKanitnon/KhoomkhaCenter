// src/models/master/Unit.js
export default class Unit {
  constructor({
    UnitId =  null,
    UnitTitle = null,
  } = {}) {
    this.UnitId =  UnitId;
    this.UnitTitle = UnitTitle;
  }
}