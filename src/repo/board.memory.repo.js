const BoardModel = require('../models/board.model');
const ColumnModel = require('../models/column.model')
// const tasksRepo = require("./task.memory.repo")

const boards = [];
const columnsArr = [];

const getAll = () => boards;
const getById = (id) => {
  let boardById;
  try {
    boardById = boards.filter(board => board.id === id);
  } catch (e) {
    return 'Board is not found';
  }
  return boardById;
};
const createBoard = (title, columnsArray) => {
  const arrOfColumns =[]
    columnsArray.forEach((columns) => {
    const columnss = new ColumnModel(columns.title,columns.order)
    columnsArr.push(columnss)
    arrOfColumns.push(columnss)
  })

  const board = new BoardModel(title, arrOfColumns);
  boards.push(board);
  return board;
};
const updateBoard = (id, title, columnsArray) => {

  let reBoard;
  boards.forEach((board, index) => {
    if (board.id === id) {
      boards[index].title = title;
      boards[index].column = columnsArray;
      reBoard = boards[index];
    }
  });
  if (reBoard) {
    return reBoard;
  }
  return 'Board is not found';
};
const deleteBoard = (id) => {
    try {
    const[ find ] =boards.filter(board => board.id === id)
    boards.splice(boards.indexOf(find), 1);
    return 'Delete is complete';
  } catch (e) {
    return 'Board is not found';
  }

};


module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard,boards };