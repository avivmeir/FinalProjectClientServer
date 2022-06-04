// Import npm packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080; // Step 1

const routes = require("./routes/api");

// Step 2
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mern_proj', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!!");
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Step 3
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(cookieParser());
// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.all("/api/*", function(req, res, next) {
 // console.log("General Validations");
  next();
});

// Step 2:
app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// HTTP request logger
app.use(morgan("tiny"));
app.use("/api", routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
