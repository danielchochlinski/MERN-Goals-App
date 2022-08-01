const express = require("express");
const path = require("path");
const colors = require("colors");
const dotenv = require("dotenv").config({ path: __dirname + "../../.env" });
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", ["*"]);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goals"));
app.use("/api/users", require("./routes/users"));

//admin
app.use("/admin", require("./routes/admin"))

//serve client
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "build", "index.html")
    );
  });
} else
  app.get("/", (req, res) => {
    res.send("Please set to production");
  });
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
