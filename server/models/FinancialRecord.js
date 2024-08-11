const mongoose = require("mongoose");

const FinancialRecordSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: [true, "Please enter the description!"],
  },
  amount: {
    type: Number,
    required: [true, "Please enter the amount!"],
  },
  category: {
    type: String,
    required: [true, "Please enter the category!"],
  },
  paymentMethod: {
    type: String,
    required: [true, "Please enter the payment method!"],
  },
});

// Create a model based on the schema
const FinanceRecord = mongoose.model("FinanceRecord", FinancialRecordSchema);

module.exports = FinanceRecord;
