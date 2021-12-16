import { BoardRepo } from '../repo/board.repo';
import { throwError } from '../../errors';
import { Request, Response } from 'express';
import { Board } from '../models/board.model';


class BoardService {
  static async getAll(req: Request, res: Response) {

    try {
      const boards = await BoardRepo.getAll();
      res.status(200);
      res.send(boards);
      res.end();
    } catch (err) {
      throwError(res, err as Error);
    }
  }

  static async getBoardByID(req: Request, res: Response) {

    try {
      const { boardId } = req.params;

      const board = await BoardRepo.getBoardById(boardId);

      res.status(200)
      res.send(board);
      res.end();
    } catch (err) {
      throwError(res, err as Error);
    }
  }

  static async createBoard(req: Request, res: Response) {

    try {
      const requestBody: Board = await req.body;

      const board = await BoardRepo.createBoard(requestBody);

      res.status(201)
      res.send(board);
      res.end();
    } catch (err) {
      throwError(res, err as Error);
    }
  }

  static async updateBoard(req: Request, res: Response) {

    try {
      const { boardId } = req.params;
      const boardBody = req.body

      const board = await BoardRepo.updateBoard(
        boardId,
        boardBody
      );
      res.status(200)
      res.send(board);
      res.end();
    } catch (err) {
      throwError(res, err as Error);
    }
  }

  static async deleteBoard(req: Request, res: Response) {

    try {
      await BoardRepo.delBoard(req.params.boardId);

      res.status(204)
      res.end();
    } catch (err) {
      throwError(res, err as Error);
    }
  }
}

export { BoardService };