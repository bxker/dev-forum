require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const app = express();
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

//controllers
const {getUser, register, login, logout} = require('./controllers/authController');
const {topics, posts, addPost, deletePost} = require('./controllers/postsController');

//middleware
//to use req.body
app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24*7
    }
}));

//massive connection
massive(CONNECTION_STRING)
.then(dbInstance => {
    app.set('db', dbInstance);
    console.log('Database Connected! :D')
})

//auth endpoints
app.get('/auth/user/', getUser);
app.post('/auth/register', register);
app.post('/auth/login', login);
app.post('/auth/logout', logout);


//posts endpoints
app.get('/api/topics', topics);
app.get('/api/posts/:topic', posts);
app.post('/api/posts/:topic', addPost);
app.delete('/api/posts/:id', deletePost);


app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}`));