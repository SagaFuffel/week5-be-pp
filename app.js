require('dotenv').config();
const express = require("express");
const app = express();
const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");
const { unknownEndpoint, errorHandler } = require("./middleware/customMiddleware");
const connectDB = require("./config/db");

const morgan = require("morgan");
app.use(morgan("dev"));
connectDB();
  

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

//hide app.get ^
// Example route that throws an error (for testing purposes only)
/*app.get('/error', (req, res, next) => {
  const error = new Error("Network problem");
  next(error);
});*/

// Use the tourRouter for all "/tours" routes
app.use("/api/tours", tourRouter);

// Use the userRouter for all /users routes
app.use("/api/users", userRouter);

app.use(unknownEndpoint);
app.use(errorHandler);


const port = process.env.PORT || 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
 
