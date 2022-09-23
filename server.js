const express = require('express');
require('dotenv').config({path: './config/.env'})
require('./config/db.js');
const app = express();
const path = require('path');

//importaion des routes 
const postRoutes = require('./routes/post.routes.js');
const userRoutes = require('./routes/user.routes.js');

//parser les elements 
app.use(express.json());


//mise en place du Header
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



//routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/*app.use((error, req, res, next) => {
    console.log('This is the rejected field ->', error.field);
});*/


//Server
app.listen(process.env.PORT , () => {
    console.log(`listening on port ${process.env.PORT}`);
});