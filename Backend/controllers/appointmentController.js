const BaseController = require("./baseController");
const AppointmentModel = require("../models/appointmentModel");
class Appointment extends BaseController {
  constructor() {
    super(AppointmentModel, Appointment);
  }
}
module.exports = new Appointment();
