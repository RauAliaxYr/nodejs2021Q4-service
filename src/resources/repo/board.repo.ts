import { Board } from '../../entities/board.model';
import { ColumnToBoard } from '../../entities/columns.model';
import { HttpError } from '../../errors';
import { Task } from '../../entities/task.model';
import { getManager } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

type tryBody ={
  title:string,
  columns:Array<ColumnToBoard>,
}
/**
 * The main repository API for boards.
 */
class BoardRepo {
  static BoardRepo = getManager().getRepository(Board);
  /**
   * return list of all boards
   * @returns list of all boards
   */
  static async getAll(): Promise<Repository<Board>> {
    return this.BoardRepo;
  }
  /**
   * take board's ID and returns a board ID
   * @param boardId board's ID
   * @returns board by ID
   */
  static async getBoardById(boardId:string): Promise<Board> {
    let boardData: Board | undefined
    try {
       boardData = await this.BoardRepo
        .createQueryBuilder('board')
        .where('board.id = :id', { id: boardId })
        .getOne()
    }
    catch (e) {
      throw new Error('Error into db (board by id)')
    }
    if (typeof boardData === 'undefined') {
      throw new HttpError('There is no board with such id!', 404);
    }
    return boardData;
  }
  /**
   * take board body and returns a created board
   * @param newBoardBody new board's body
   * @returns task by board and task ID
   */
  static async createBoard(newBoardBody:Board):Promise<Board> {
    if (!newBoardBody.title) {
      throw new HttpError('Please enter the name.', 405);
    }

    if (!newBoardBody.columns) {
      throw new HttpError('Please enter the login.', 405);
    }

    const boardData:Board = new Board(newBoardBody.title ,newBoardBody.columns);

    try {
       await this.BoardRepo
         .createQueryBuilder('board')
         .insert()
         .into(Board)
         .values(boardData)
         .execute()
    }
    catch (e) {
      throw new Error('Error into db (board creation)')
    }

    return boardData;
  }
  /**
   * take board's ID and board's body and returns an updated board
   * @param boardId board's ID
   * @param body new board's body
   * @returns updated task
   */
  static async updateBoard(boardId:string, body:tryBody):Promise<Board>{
    if (!body.title && !body.columns ){
      throw new HttpError('Please enter you valid changes.', 409);
    }

    try {
      await this.BoardRepo
        .createQueryBuilder()
        .update()
        .set({title:body.title,columns:body.columns})
        .where('board.id = :id', { id: boardId })
        .returning("*")
        .execute()
    }
    catch (e) {
      throw new Error('Error into db (board updation)')
    }

    let boardData = await this.BoardRepo
      .createQueryBuilder('board')
      .where('board.id = :id', { id: boardId })
      .getOne();

    if (typeof boardData === 'undefined') throw new HttpError('There are no board with such id!', 404);

    return boardData;
  }
  /**
   * Take board ID. Delete tasks by board ID and return a deleted board
   * @param boardId board's ID
   * @returns deleted board
   */
  static async delBoard(boardId:string):Promise<Board> {
    const boardFind: Board | undefined = await this.BoardRepo
      .createQueryBuilder('board')
      .where('board.id = :id', { id: boardId })
      .getOne();
    if (typeof boardFind === 'undefined') throw new HttpError('There are no board with such id!', 404);

    try {
      await this.BoardRepo
        .createQueryBuilder('board')
        .delete()
        .from(Board)
        .where('board.id = :id', { id: boardId })
        .execute()
    }
    catch (e) {
      throw new Error('Error into db (board deletion)')
    }
    try {
      await getManager()
        .getRepository(Task)
        .createQueryBuilder('task')
        .delete()
        .from(Task)
        .where('task.boardId.id = :id', { id: boardId })
        .execute()
    }
    catch (e) {
      throw new Error('Error into db (board deletion)')
    }

    return boardFind;
  }
}

export {
  BoardRepo
};