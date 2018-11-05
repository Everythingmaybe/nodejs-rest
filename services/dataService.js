const fs = require("fs");

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const databaseUrl = require('../config/database').url;
const mockFile = "mock/users.json";

// Connect to mongodb
mongoose.connect(databaseUrl, function (err) {
    if (err) throw err;
    console.log('Successfully connected');
});

// User scheme
const userScheme = mongoose.Schema({
    name: String,
    age: String
}, { versionKey: false });

const User = mongoose.model('User', userScheme);

function getUsers(_id) {
    const id = _id ? {_id: _id} : {};
    return User.find(id).exec();
}

function addUser(_user) {
    const user = {
        name: _user.name,
        age: _user.age
    };

    return User.create(user);
}

function editUser(_user) {
    const id = _user.id;
    const user = {
        name: _user.name,
        age: _user.age
    };
    return User.findByIdAndUpdate(id, user, {new: true});
}

function deleteUser(id) {
    return User.findByIdAndRemove(id);
    // return User.remove({});
}

function checkRequiredData(_obj, _fields) {
    const obj = _obj || {};
    const fields = _fields || [];

    for (let item of fields) {
        if (!obj.hasOwnProperty(item)) {return false};
        if (obj[item].length < 1) {return false};
    }

    return true;
}

module.exports = {
    addUser,
    getUsers,
    deleteUser,
    editUser,
    checkRequiredData
};