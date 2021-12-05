const TaskModel = require('../models/task.model');

const tasks = [];

const getAll = () => tasks;
const getById = (id) => {
  let taskById;
  try {
    taskById = tasks.filter(user => user.id === id);
  } catch (e) {
    return 'User is not found';
  }
  return taskById;
};
const createTask = (name, login, password) => {
  const task = new TaskModel(name, login, password);
  tasks.push(task);
  return task;
};
const updateTask = (id, name, login, password) => {

  let reTask;
  tasks.forEach((task, index) => {
    if (task.id === id) {
      tasks[index].name = name;
      tasks[index].login = login;
      tasks[index].password = password;
      reTask = tasks[index];
    }
  });
  if (reTask) {
    return reTask;
  }
  return 'Task is not found';
};
const deleteTask = (id) => {
  try {
    tasks.splice(tasks.indexOf(tasks.filter(task => task.id === id)), 1);
    return 'delete is complete';
  } catch (e) {
    return 'Task is not found';
  }
};


module.exports = { getAll, getById, createUser: createTask, updateTask, deleteTask };