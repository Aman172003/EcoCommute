if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const connectToDB = require("./db");
const app = express();

app.use(express.json());
app.use(cors());

connectToDB();

app.use("", require("./routes/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
