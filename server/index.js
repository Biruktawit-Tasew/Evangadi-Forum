const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoute");
require("dotenv").config();
const app = express();
const PORT = 5500;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);


app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting the server:", err);
    return;
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
