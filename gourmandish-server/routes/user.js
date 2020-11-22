const userController = require('../controllers/user');

module.exports = (app) => {
    app.get('/api/users', userController.getAll);
    app.post('/api/users', userController.create);
    app.put('/api/users/:id', userController.update);
    app.delete('/api/users/:id', userController.remove);
    app.get('/api/users/nearby', userController.getAllNearby);
};