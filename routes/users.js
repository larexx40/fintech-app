const express = require("express");
const users = express.Router();
const dbOperation = require('../controller/users');

users.get('/', dbOperation.getUsers );
users.get('/:id', dbOperation.getUsersByID);
users.get('/byname', dbOperation.getUserByName)
users.post('/', dbOperation.createUser);
users.put('/:id', dbOperation.updateUser);
users.delete('/:id', dbOperation.deleteUserByID);
users.delete('/deleteall', dbOperation.deleteAllUser);

module.exports = users;
