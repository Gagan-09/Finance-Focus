const express = require("express");
const mongoose = require("mongoose");
const financialRecordRouter = require("./routes/FinancialRecord");
const cors = require("cors");
require("dotenv").config();

const app = express();

//got a cors error so use * in origin 
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);


app.use(express.json()); // Middleware to parse JSON bodies

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Finance_Focus",
  })
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

// Routes
app.use("/financial-records", financialRecordRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});
