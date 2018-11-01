const uniqid = require('uniqid');
const fs = require("fs");
const mockFile = "mock/users.json";

function getUsers(_id) {
    const id = _id || 'all';
    const usersList = JSON.parse(fs.readFileSync(mockFile, 'utf8')) || [];

    if (id === 'all') {
        return usersList;
    } else {
        return usersList.find((item) => id == item.id)
    }
}

function addUser(_user) {
    const user = {
        id: uniqid(),
        name: _user.name,
        age: _user.age
    };
    let usersList = JSON.parse(fs.readFileSync(mockFile, 'utf8')) || [];

    usersList.push(user);
    fs.writeFileSync("mock/users.json", JSON.stringify(usersList));
}

function editUser(_user) {
    const user = {
        id: _user.id,
        name: _user.name,
        age: _user.age
    };
    let usersList = JSON.parse(fs.readFileSync(mockFile, 'utf8')) || [];
    const itemIndex = usersList.findIndex((item) => item.id == user.id);

    if (itemIndex !== -1) {
        usersList[itemIndex] = {...user};
        fs.writeFileSync("mock/users.json", JSON.stringify(usersList));
        return true;
    } else {
        return false;
    }
}

function deleteUser(id) {
    const usersList = JSON.parse(fs.readFileSync(mockFile, 'utf8')) || [];
    const itemIndex = usersList.findIndex((item) => item.id == id);

    if (itemIndex !== -1) {
        usersList.splice(itemIndex, 1);
        fs.writeFileSync("mock/users.json", JSON.stringify(usersList));
        return true;
    } else {
        return false;
    }
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