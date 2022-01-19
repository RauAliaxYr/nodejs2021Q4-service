import { createBoard, delBoard, getBoardById, updateBoard } from '../repo/board.repo';
import { throwError } from '../../errors';
import { Request, Response } from 'express';
import { Board } from '../../entities/board.model';
import { CustomLogger } from '../../logger/logger';
import { getAll } from '../repo/user.repo';

/**
 * The main service for board.
 */
class BoardService {
  /**
   * handles a GET request and make return response with a list of all boards
   * @param req GET Request
   * @param res GET Response
   */
  static async getAll(req: Request, res: Response) {

    try {
      const boards = await getAll();
      res.status(200);
      res.send(boards);
      CustomLogger.infoLog(req, 200);
      res.end();
    } catch (err) {
      throwError(req, res, err as Error);
    }
  }
  /**
   * handles a GET request and make return response with a board by id
   * @param req GET Request
   * @param res GET Response
   */
  static async getBoardByID(req: Request, res: Response) {

    try {
      const { boardId } = req.params;

      const board = await getBoardById(boardId);

      res.status(200)
      res.send(board);
      CustomLogger.infoLog(req, 200);
      res.end();
    } catch (err) {
      throwError(req, res, err as Error);
    }
  }
  /**
   * handles a POST request and make return response with a created board
   * @param req POST Request
   * @param res POST Response
   */
  static async createBoard(req: Request, res: Response) {

    try {
      const requestBody: Board = await req.body;

      const board = await createBoard(requestBody);

      res.status(201)
      res.send(board);
      CustomLogger.infoLog(req, 201);
      res.end();
    } catch (err) {
      throwError(req,res, err as Error);
    }
  }
  /**
   * handles a PUT request and make return response with a updated board
   * @param req PUT Request
   * @param res PUT Response
   */
  static async updateBoard(req: Request, res: Response) {

    try {
      const { boardId } = req.params;
      const boardBody = req.body

      const board = await updateBoard(
        boardId,
        boardBody
      );
      res.status(200)
      res.send(board);
      CustomLogger.infoLog(req, 200);
      res.end();
    } catch (err) {
      throwError(req, res, err as Error);
    }
  }
  /**
   * handles a DELETE request and make return response with status 204
   * @param req DELETE Request
   * @param res DELETE Response
   */
  static async deleteBoard(req: Request, res: Response) {

    try {
      await delBoard(req.params.boardId);

      res.status(204)
      CustomLogger.infoLog(req, 204);
      res.end();
    } catch (err) {
      throwError(req, res, err as Error);
    }
  }
}

export { BoardService };