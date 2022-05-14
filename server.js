// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080; // Step 1

const routes = require('./routes/api');
const mongoUri = 'mongodb+srv://user:Aa123456@cluster0.4pzbb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// Step 2
mongoose
    .connect(process.env.MONGODB_URI || mongoUri || 'mongodb://localhost/mern', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Step 3

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));
// }

// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);

app.get('/api',(req, res)=>{
    const data ={
        username:"user",
        age:5
    }
    res.json(data)
} )



app.listen(PORT, console.log(`Server is starting at ${PORT}`));