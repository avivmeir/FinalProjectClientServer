// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080; // Step 1

const routes = require('./routes/api');

const mongoURI = 'mongodb+srv://user:webshop123@database.3qzpr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// Step 2
mongoose.connect(process.env.MONGODB_URI || mongoURI || 'mongodb://localhost/mern_proj', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Step 3
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});


// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);




app.listen(PORT, console.log(`Server is starting at ${PORT}`));
