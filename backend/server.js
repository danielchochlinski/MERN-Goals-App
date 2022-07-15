const express = require("express");
const dotenv = require("dotenv").config({ path: __dirname + "../../.env" });
const { errorHandler } = require("./middleware/errorMiddleware");
console.log(dotenv);
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goals"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
