module.exports = function(app) {
    var userController = require('../services/userController.js');
    var authController = require('../services/authController.js');
    
    // Create new User
    app.post('/api/register', userController.create);

    // find User and check if provided LoginInfo is correct
    app.post('/api/login', userController.logIn);

    // Get one User by username
    app.get('/api/user/:username', userController.findOne);

    // Update a User with Id
    app.put('/api/user/:username', userController.update);

    // Delete a User with Username
    app.delete('/api/user/:id', authController.verifyJWT ,userController.delete);
}