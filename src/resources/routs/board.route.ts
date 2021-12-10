import express from 'express';
import { BoardService } from '../service/board.service'

const boardRouter = express.Router()

boardRouter.get('/boards', BoardService.getAll)
boardRouter.get('/boards/:boardId', BoardService.getBoardByID)
boardRouter.post('/boards', BoardService.createBoard)
boardRouter.put('/boards/:boardId',BoardService.updateBoard)
boardRouter.delete('/boards/:boardId',BoardService.deleteBoard)

export default boardRouter