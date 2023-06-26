var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");
const appointmentController = require("../controllers/appointmentController");

router.post("/add-appointment", async (req, res) => {
  data = req.body;
  data.appointment_id = uuidv4();
  appointmentController.create(data, (err, appointmentResponse) => {
    if (err) {
      return res.send({ response: err });
    }
    res.send({
      response: appointmentResponse,
    });
  });
});

router.post("/update-appointment", (req, res) => {
  let data = req.body;
  appointmentController.findOneAndUpdate(
    { appointment_id: req.body.appointment_id },
    data,
    (err, updatedAppointment) => {
      if (err) {
        return res.send({ response: err });
      }
      res.send({
        response: updatedAppointment,
      });
    }
  );
});

router.get("/find-appointment/:id", (req, res) => {
  appointmentController.find(
    { appointment_id: req.params.id },
    (err, appointmentDetails) => {
      if (err) {
        return res.send({ response: err });
      }
      res.json({
        response: appointmentDetails,
      });
    }
  );
});

router.post("/delete-appointment", (req, res) => {
  appointmentController.findOneAndRemove(
    { appointment_id: req.body.appointment_id },
    (err, deletedAppointment) => {
      if (err) {
        return res.send({ response: err });
      }

      res.send({
        response: deletedAppointment,
      });
    }
  );
});

router.get("/find-all-appointments", (req, res) => {
  appointmentController.find({}, (err, allAppointmentDetails) => {
    if (err) {
      return res.send({ response: err });
    }
    res.json({
      response: allAppointmentDetails,
    });
  });
});

module.exports = router;
