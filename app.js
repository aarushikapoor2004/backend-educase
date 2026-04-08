const express = require("express");
const dotenv = require("dotenv");
const schoolRoutes = require("./routes/schoolRoutes");

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("School Management API is running.");
});

app.use("/", schoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});