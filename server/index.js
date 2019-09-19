require('dotenv').config();
const express = require('express');
// const massive = require('massive');
const app = express();
const {SERVER_PORT} = process.env;

//controllers
const {getUser, register, login, logout} = require('./controllers/authController');


app.use(express.json());

//auth endpoints
app.get('/auth/user/');
app.post('/auth/register');
app.post('/auth/login');
app.post('/auth/logout');


//posts endpoints
app.get('/api/forum');
app.get('/api/posts/:topic');
app.post('/api/posts/:topic');
app.delete('/api/posts/:id')


app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}`));