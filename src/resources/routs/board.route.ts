import express from 'express';
import { BoardService } from '../service/board.service'
import { isAuthorized } from '../../auth/isAuthorized';

const boardRouter = express.Router()

boardRouter.get('/boards',isAuthorized, BoardService.getAll)
boardRouter.get('/boards/:boardId',isAuthorized, BoardService.getBoardByID)
boardRouter.post('/boards',isAuthorized, BoardService.createBoard)
boardRouter.put('/boards/:boardId',isAuthorized,BoardService.updateBoard)
boardRouter.delete('/boards/:boardId',isAuthorized,BoardService.deleteBoard)

export default boardRouter