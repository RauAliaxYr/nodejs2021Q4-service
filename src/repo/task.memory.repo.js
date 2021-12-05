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
const createTask = (title, order, description, userId, boardId, columnId) => {
  const task = new TaskModel(title, order, description, userId, boardId, columnId);
  tasks.push(task);
  return task;
};
const updateTask = (taskId, title, order, description, userId, boardId, columnId) => {

  let reTask;
  tasks.forEach((task, index) => {
    if (task.id === taskId) {
      tasks[index].title = title;
      tasks[index].order = order;
      tasks[index].description = description;
      tasks[index].userId = userId;
      tasks[index].boardId = boardId;
      tasks[index].columnId = columnId;
      reTask = tasks[index];
    }
  });
  if (reTask) {
    return reTask;
  }
  return 'Task is not found';
};
const updateTaskByUser = (userId) =>{
  let complete = 'Task is not found'
   tasks.forEach((task,index)=>{
     if (task.userId === userId){
       tasks[index].userId = null
       complete = 'Task is update'
     }
   })
  return complete
}
const deleteTask = (taskId) => {
  try {
    const [ taskre ] = tasks.filter(task => task.id === taskId)
    tasks.splice(tasks.indexOf(taskre), 1);
  } catch (e) {
    return 'Task is not found';
  }
  return 'delete is complete';
};


module.exports = { getAll, getById, createTask, updateTask, deleteTask, tasks,updateTaskByUser };