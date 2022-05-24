const User = require ('../models/user');
const jsonWebToken = require('jsonwebtoken')
const passport = require('passport')
const bcrypt = require('bcrypt');



// CREATE a new User
exports.create = (req, res) => {
    const saltRounds = 7
    // password is being hashed
    bcrypt
        .hash(req.body.password, saltRounds)
        .then(hash => {
            // console.log('Hash: ' + hash)
            const user = new User({
                full_name: req.body.full_name,
                username: req.body.username,
                password: hash,
            });
            // Save User in MongoDB
            user.save()
            .then(data => {
                res.send(data);
                console.log("New User Saved!")
            })
            .catch(err => {
                res.status(500).send({
                    message: 'Error while saving User' + err.message
                })
            })
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error while hashing Password' + err
            })
        })
    
}

exports.auth = (req, res) => {
    const signedToken = generateTokenForId(req.body.apiKey)
    res.status(200).send({
        JWT: signedToken
    })
}
const JWT_ENCODING_PASSPHRASE = 'random_string_asdfasdf'
const generateTokenForId = (id) => {
    const signedToken = jsonWebToken.sign(
        {
            data: id,
            exp: new Date().setDate(new Date().getDate() + 1)
        },
        JWT_ENCODING_PASSPHRASE
    );
    return signedToken;
}


// FIND ONE User with Username and compare password
exports.logIn = (req, res) => {
    User.findOne({ username: req.body.username })
    .then(user => {
        if(!user) {
            res.status(500).send({
                message: `User not found ${req.body.username}`
            })
        }
        else {
            user.comparepassword(req.body.password, user.password, (err, isMatch)=> {
                console.log('Password correct: ' + isMatch);
                if(!isMatch) {
                    res.status(404).send({
                        message: 'Password doesn`t match!'
                    })
                } else {
                    const signedToken = generateTokenForId(user._id)
                    res.status(200).send({
                        message: `Successfully logged in ${req.body.username}`,
                        user: user,
                        JWT: signedToken,
                    })
                }
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: `Error retrieving User with Username: ${req.body.username} ${err.message}`
        })
    })
}

exports.authenticate = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Failed to authenticate',
    successRedirect: '/',
    successFlash: 'Authenticated',
})

// FIND ONE User with Username and compare password
exports.findOne = (req, res) => {
    User.findOne({ username: req.params.username })
    .then(user => {
        if(!user) {
            return res.status(500).send({
                message: `User not found ${req.params.username}`
            })
        }
        let foundUser = {
            username: user.username,
            full_name: user.full_name,
            id: user._id,
        }
        res.send(foundUser)
    }).catch(err => {
        return res.status(500).send({
            message: `Error retrieving User with Username: ${req.params.username} ${err.message}`
        })
    })
}

// UPDATE a User with Username
exports.update = (req, res) => {
    // Find User and check if password is correct
    User.findOne({username: req.params.username})
    .then(user => {
        user.comparepassword(req.body.password, user.password, (err, isMatch)=> {
            console.log('Password correct when updateding user: ' + isMatch);
            if(!isMatch) {
                res.status(404).send({
                    message: 'Password doesn`t match!'
                })
            } else {
               const saltRounds = 7
                // new password is being hashed
                bcrypt
                    .hash(req.body.newpassword, saltRounds)
                    .then(hash => {
                        // Update User with newly hashed password
                        User.updateOne({username: req.params.username}, {
                            username: req.body.username,
                            full_name: req.body.full_name,
                            password: hash,
                        }, {new: true})
                        .then(user => {
                            if(!user) {
                                return res.status(404).send({
                                    message: `User not found with username: ${req.params.usernmae}`
                                });
                            }
                            let updatedUser = {
                                full_name: user.full_name,
                                username: user.username,
                            }
                            res.send(updatedUser);
                        }).catch(err => {
                            return res.status(500).send({
                                message: `Error updating User with username: ${req.params.username} ${err.message}`
                            });
                        });
                    })
                    .catch(err => {
                        console.log('Error accured during generating new Hash ' + err)
                    })
        // Find and update existing User
            }
        })
    })
    .catch(err => {
        return res.status(500).send({
            message: `Error retrieving User with Username (while updating): ${req.params.username} ${err.message}`
        })
    })

}

// DELETE a User with ID
exports.delete =(req, res) => {
    User.findByIdAndRemove(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: `User not found with Id ${req.params.id}`
            });
        }
        res.send({message: 'User deleted successfully!'});
    }).catch(err => {
        return res.status(500).send({
            message: `Error delete User with Id ${req.params.id} ${err.message}`
        });
    })
}
