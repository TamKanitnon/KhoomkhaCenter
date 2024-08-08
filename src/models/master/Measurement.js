// src/models/master/Measurement.js
export default class Measurement {
  constructor({
    MeasurementId = null,
    MeasuremenTitle = null,
  } = {}) {
    this.MeasurementId = MeasurementId;
    this.MeasuremenTitle = MeasuremenTitle;
  }
}