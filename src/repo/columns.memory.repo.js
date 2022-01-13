const ColumnModel = require('../models/column.model');

const columns = [];

const getAll = () => columns;
const getById = (id) => {
  let columnById;
  try {
    columnById = columns.filter(column => column.id === id);
  } catch (e) {
    return 'Column is not found';
  }
  return columnById;
};
const createColumn = (title, order) => {
  const column = new ColumnModel(title,order);
  columns.push(column);
  return column;
};
const updateColumn = (id, title, order) => {

  let reColumn;
  columns.forEach((column, index) => {
    if (column.id === id) {
      columns[index].title = title;
      columns[index].order = order;
      reColumn = columns[index];
    }
  });
  if (reColumn) {
    return reColumn;
  }
  return 'Column is not found';
};
const deleteColumn = (id) => {
  try {
    columns.splice(columns.indexOf(columns.filter(column => column.id === id)), 1);
    return 'delete is complete';
  } catch (e) {
    return 'Column is not found';
  }
};


module.exports = { getAll, getById, createColumn, updateColumn, deleteColumn };