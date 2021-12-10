import { Board } from '../models/board.model';
import { Column } from '../models/columns.model';
import { DB } from '../../db/db';

import { HttpError } from '../../errors';
import { Task } from '../models/task.model';

type tryBody ={
  title:string,
  columns:Array<Column>,
}

class BoardRepo {
  static getAll(): Array<Board> {
    return DB.boards;
  }

  static getBoardById(userId:string): Board {
    const boardData: Board = DB.boards.filter((board:Board) => board.id === userId)[0];

    if (!boardData) {
      throw new HttpError('There is no user with such id!', 404);
    }
    return boardData;
  }

  static createBoard(newBoardBody:Board):Board {
    if (!newBoardBody.title) {
      throw new HttpError('Please enter the name.', 405);
    }

    if (!newBoardBody.columns) {
      throw new HttpError('Please enter the login.', 405);
    }

    const boardData:Board = new Board(newBoardBody.title ,newBoardBody.columns);

    DB.boards.push(boardData);

    return boardData;
  }
  static updateBoard(boardId:string, body:tryBody):Board{
    if (!body.title && !body.columns ){
      throw new HttpError('Please enter you valid changes.', 409);
    }

    let newBoardParams:Board = {id: boardId, title: '', columns:null}

    if (body.title) {
      newBoardParams.title = body.title;
    }
    if (body.columns) {
      newBoardParams.columns = body.columns;
    }

    const boardData:Board|undefined = DB.boards.find((board:Board) => board.id === newBoardParams.id); // !

    if (!boardData) throw new HttpError('There are no user with such id!', 404);

    const boardIndex:number = DB.boards.indexOf(boardData);
    DB.boards[boardIndex] = { ...boardData, ...newBoardParams };

    return DB.boards[boardIndex];
  }
  static delBoard(boardId:string):Board {
    const boardFind:Board|undefined = DB.boards.find((board:Board) => board.id === boardId);



    if (!boardFind) throw new HttpError('There are no user with such id!', 404);

    DB.boards = DB.boards.filter((board) => board.id !== boardId);

    const filteredTasks:Array<Task> = [];
    DB.tasks.forEach((item) => {
      DB.tasks
        .filter((task) => task.boardId === boardId)
        .forEach((boardT) => {
          if (item.id !== boardT.id) filteredTasks.push(item);
        });
    });
    DB.tasks = filteredTasks;

    return boardFind;
  }
}

export {
  BoardRepo
};