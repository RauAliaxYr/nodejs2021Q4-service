const UserModel = require('../models/user.model');

const users = [];

const getAll = () => users;
const getById = (id) => {
  let userById;
  try {
    userById = users.filter(user => user.id === id);
  } catch (e) {
    return 'User is not found';
  }
  return userById;
};
const createUser = (name, login, password) => {
  const user = new UserModel(name, login, password);
  users.push(user);
  return user;
};
const updateUser = (id, name, login, password) => {

  let reUser;
  users.forEach((user, index) => {
    if (user.id === id) {
      users[index].name = name;
      users[index].login = login;
      users[index].password = password;
      reUser = users[index];
    }
  });
  if (reUser) {
    return reUser;
  }
  return 'User is not found';
};
const deleteUser = (id) => {
  try {
    users.splice(users.indexOf(users.filter(user => user.id === id)), 1);
    return 'delete is complete';
  } catch (e) {
    return 'user is not found';
  }
};


module.exports = { getAll, getById, createUser, updateUser, deleteUser };
