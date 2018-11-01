const dataService = require('../services/dataService');

// Create the express router object for Users
let usersRouter = require('express').Router();

usersRouter.get('/', function(req, res) {
    res.send(dataService.getUsers());
});

usersRouter.post('/', function(req, res) {
    const requiredFields = ['name', 'age'];
    const user = req.body;

    if (!dataService.checkRequiredData(user, requiredFields)) {
        res.status(400).send('Not all parameters passed');
    } else {
        dataService.addUser(user);
        res.status(201).send()
    }
});

usersRouter.get('/:id', function(req, res) {
    const id = req.params.id;
    const response = dataService.getUsers(id);

    if (response) {
        res.send(response);
    } else {
        res.status(404).send('User not found');
    }
});

usersRouter.put('/:id', function(req, res) {
    const requiredFields = ['name', 'age'];
    const id = req.params.id;
    const user = {
        id: id,
        ...req.body
    };

    if (!dataService.checkRequiredData(user, requiredFields)) {
        res.status(400).send('Not all parameters passed');
    } else {
        const updateStatus = dataService.editUser(user);
        if (updateStatus) {
            res.status(200).send()
        } else {
            res.status(404).send('User not found')
        }
    }
});

usersRouter.delete('/:id', function(req, res) {
    const id = req.params.id;
    const deleteStatus = dataService.deleteUser(id);
    if (deleteStatus) {
        res.status(200).send();
    } else {
        res.status(404).send('User not found');
    }
});

module.exports = usersRouter;