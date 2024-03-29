const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connected = await mongoose.connect(process.env.MONGO_URL);

    console.log(`mongo db connected: ${connected.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
