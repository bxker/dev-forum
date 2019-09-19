const bcrypt = require('bcryptjs');

let getUser = async (req, res) => {
    if(req.session.user){
        res.status(200).json(req.session.user)
    }else {
        res.status(401).json('No user logged in')
    }
    
}   

let register = async (req, res) => {
    const db = req.app.get('db');
    const {first_name, username, password} = req.body;

    const foundUser = await db.auth.checkForUsername(username);
    if(foundUser[0]){
        res.status(409).json('Username Taken')
    }else{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await db.auth.registerUser(first_name, username, hash)
        
        req.session.user = {
            user_id: newUser[0].user_id,
            first_name: newUser[0].first_name,
            username: newUser[0].username
        }

        res.status(200).json(req.session.user)
    }
}

let login = async (req, res) => {
    const db = req.app.get('db');
    const {username, password} = req.body;

    const foundUser = await db.auth.checkForUsername(username);
    if(!foundUser[0]){
        res.status(403).json('Username or Password incorrect');
    } else{
        const isAuthenticated = bcrypt.compareSync(password, foundUser[0].hash);

        if(!isAuthenticated) {
            res.status(403).json('Username or Password incorrect');
        }else{
            req.session.user = {
                user_id: foundUser[0].user_id,
                first_name: foundUser[0].first_name,
                username: foundUser[0].username
            };

            res.status(200).json(req.session.user);
        }


    }
}

let logout = (req, res) => {
    req.session.destroy();
    res.status(200).json('User logged out successfully');
}

module.exports = {
    getUser,
    register,
    login,
    logout
}