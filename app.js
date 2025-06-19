// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors
// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app = express();

// Retrieve environment variables
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

app.use(cors());

// Define a basic route
app.get("/", (req, res) => {
  res.send(`Welcome to App Product`);
});

app.get("/getProducts", (req, res) => {
  //this is sample if user and password is correct
  let data = [];
  if (
    process.env.USER_DB == "userapp" &&
    process.env.PASSWORD_DB == "passapp123"
  ) {
    data = [
      {
        code: "001",
        product: "Book",
      },
      {
        code: "002",
        product: "Bag",
      },
      {
        code: "003",
        product: "Shoe",
      },
      {
        code: "004",
        product: "Pencil",
      },
     
    ];
  }
  res.status(200).json({
    error: "false",
    message: "get data success",
    data: data,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App ${NODE_ENV} is running on port ${PORT}`);
});
