require('dotenv').config();
const express = require('express');
// const massive = require('massive');
const app = express();
const {SERVER_PORT} = process.env;

//controllers
const {getUser, register, login, logout} = require('./controllers/authController');
const {getForums, getPosts, addPost, deletePost} = require('./controllers/postsController');

app.use(express.json());

//auth endpoints
app.get('/auth/user/', getUser);
app.post('/auth/register', register);
app.post('/auth/login', login);
app.post('/auth/logout', logout);


//posts endpoints
app.get('/api/forum', getForums);
app.get('/api/posts/:topic', getPosts);
app.post('/api/posts/:topic', addPost);
app.delete('/api/posts/:id', deletePost);


app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}`));