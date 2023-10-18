import express from "express";
import mydb from "../db/mydb.js";
const router = express.Router();

// Handle form submission
router.post("/submit-reservation", async (req, res) => {
  try {
    const { name, phone, date, time, people, special } = req.body;

    console.log("Received data from the client:");
    console.log("Name:", name);
    console.log("Phone:", phone);
    console.log("Date:", date);
    console.log("Time:", time);
    console.log("People:", people);
    console.log("Special:", special);

    await mydb.submitReservation(name, phone, date, time, people, special);
    res.status(201).send("Reservation submitted successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error submitting reservation.");
  }
});

// Retrieve reservation details by name and phone
router.get("/reservation-details", async (req, res) => {
  try {
    const { name, phone } = req.query;
    console.log("Give data from the mago:");
    const reservations = await mydb.getReservations(name, phone);
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving reservation details.");
  }
});

// Update Reservation
router.put("/update-reservation", async (req, res) => {
  const { name, phone, date, time, people, special } = req.body;

  try {
    console.log("Update data from the mago:");
    await mydb.updateReservation(name, phone, {
      date,
      time,
      people,
      special,
    });

    res.status(200).send("Reservation updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Delete Reservation
router.post("/delete-reservation", async (req, res) => {
  const { name, phone } = req.body;

  try {
    console.log("Delete data from the mago:");
    const deletedCount = await mydb.deleteReservation(name, phone);

    if (deletedCount > 0) {
      res.status(200).send("Reservation deleted successfully");
    } else {
      res.status(404).send("Reservation not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

export default router;
