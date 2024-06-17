const express = require("express");
const FinanceRecord = require("../models/FinancialRecord");

const router = express.Router();

router.get("/getAllByUserID/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const records = await FinanceRecord.find({ userId: userId });
    if (records.length === 0) {
      return res.status(404).send("No records found for the user.");
    }
    res.status(200).send(records);
  } catch (err) {
    console.error("Error fetching records:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const newRecordBody = req.body;
    console.log("Incoming new record:", newRecordBody); // Log the incoming request body

    const newRecord = new FinanceRecord(newRecordBody);
    const savedRecord = await newRecord.save();
    console.log("Saved record:", savedRecord); // Log the saved record
    res.status(200).send(savedRecord);
  } catch (err) {
    console.error("Error saving new record:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    console.log("Updating record:", id, newRecordBody); // Log the request details

    const record = await FinanceRecord.findByIdAndUpdate(id, newRecordBody, {
      new: true,
    });

    if (!record) return res.status(404).send("Record not found");

    console.log("Updated record:", record); // Log the updated record
    res.status(200).send(record);
  } catch (err) {
    console.error("Error updating record:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Deleting record:", id); // Log the request details

    const record = await FinanceRecord.findByIdAndDelete(id);

    if (!record) return res.status(404).send("Record not found");

    console.log("Deleted record:", record); // Log the deleted record
    res.status(200).send(record);
  } catch (err) {
    console.error("Error deleting record:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
