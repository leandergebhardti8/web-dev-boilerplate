module.exports = function(app) {
    var projectController = require('../services/projectController.js');
    var authController = require('../services/authController.js');
    
    // Create a new project
    app.post('/api/project', projectController.create);

    // Get all projects
    app.get('/api/projects', projectController.getAll);

    // Get all Projects from User
    app.get('/api/projects/:userId', projectController.getAllUserProjects);

    // Get one project by Id
    app.get('/api/project/:id', projectController.findOne);

    // Update a Project with Id
    app.put('/api/project/:id', projectController.update);

    // Delete a Project with Id
    app.delete('/api/project/:id',authController.verifyJWT, projectController.delete);
}