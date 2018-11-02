const dataService = require('../services/dataService');

// Create the express router object for Users
let usersRouter = require('express').Router();

usersRouter.get('/', function(req, res) {
    const getUsers = dataService.getUsers();

    getUsers
        .then((response) => {
            console.log(response);
            res.send(response);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send()
        })
});

usersRouter.post('/', function(req, res) {
    const requiredFields = ['name', 'age'];
    const user = req.body;
    const addUser = dataService.addUser(user);

    if (!dataService.checkRequiredData(user, requiredFields)) {
        res.status(400).send('Not all parameters passed');
    } else {
        addUser
            .then(function(response){
                res.status(201).send('User was created');
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send('')
            })
    }
});

usersRouter.get('/:id', function(req, res) {
    const id = req.params.id;
    const getUsers = dataService.getUsers(id);

    getUsers
        .then(function(response){
            console.log(response);
            res.send(response);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send()
        })
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