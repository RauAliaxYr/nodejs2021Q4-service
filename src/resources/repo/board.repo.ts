import { Board, IColumn } from '../../entities/board.model';
import { HttpError } from '../../errors';
import { getRepository } from 'typeorm';

type tryBody = {
  title: string,
  columns: IColumn[],
}


/**
 * return list of all boards
 * @returns list of all boards
 */
export const getAll = async (): Promise<Board[]> => {
  const BoardRepo = getRepository(Board);

  return BoardRepo.find({ where: {} });
};
/**
 * take board's ID and returns a board ID
 * @param id board's ID
 * @returns board by ID
 */
export const getBoardById = async (id: string): Promise<Board> => {
  const BoardRepo = getRepository(Board);
  const boardData = await BoardRepo.findOne(id);
  if (typeof boardData === 'undefined') {
    throw new HttpError('There is no board with such id!', 404);
  }
  return boardData;
};
/**
 * take board body and returns a created board
 * @param newBoardBody new board's body
 * @returns task by board and task ID
 */
export const createBoard = async (newBoardBody: Board): Promise<Board> => {
  const BoardRepo = getRepository(Board);
  if (!newBoardBody.title) {
    throw new HttpError('Please enter the name.', 405);
  }

  if (!newBoardBody.columns) {
    throw new HttpError('Please enter the login.', 405);
  }

  const boardData: Board = new Board(newBoardBody.title, newBoardBody.columns);

  try {
    await BoardRepo
      .createQueryBuilder('board')
      .insert()
      .into(Board)
      .values(boardData)
      .execute();
  } catch (e) {
    throw new Error('Error into db (board creation)');
  }

  return boardData;
};
/**
 * take board's ID and board's body and returns an updated board
 * @param id board's ID
 * @param body new board's body
 * @returns updated task
 */
export const updateBoard = async (id: string, body: tryBody): Promise<Board> => {
  const BoardRepo = getRepository(Board);
  if (!body.title && !body.columns) {
    throw new HttpError('Please enter you valid changes.', 409);
  }

  try {
    await BoardRepo
      .createQueryBuilder()
      .update()
      .set({ title: body.title, columns: body.columns })
      .where('board.id = :id', { id: id })
      .returning('*')
      .execute();
  } catch (e) {
    throw new Error('Error into db (board updation)');
  }

  const boardData = await BoardRepo
    .createQueryBuilder('board')
    .where('board.id = :id', { id: id })
    .getOne();

  if (typeof boardData === 'undefined') throw new HttpError('There are no board with such id!', 404);

  return boardData;
};
/**
 * Take board ID. Delete tasks by board ID and return a deleted board
 * @param id board's ID
 * @returns deleted board
 */
export const delBoard = async (id: string): Promise<Board> => {
  const BoardRepo = getRepository(Board);
  const boardFind: Board | undefined = await BoardRepo
    .createQueryBuilder('board')
    .where('board.id = :id', { id: id })
    .getOne();
  if (typeof boardFind === 'undefined') {throw new HttpError('There are no board with such id!', 404);}

  await BoardRepo.delete({id});

  return boardFind;
};

