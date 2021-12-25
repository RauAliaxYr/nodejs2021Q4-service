import { Request, Response } from 'express';

type LoggerType = {
  url: string
  query: unknown
  body: string
  statusCode: number
}

export class CustomLogger {

  static createLog(req: Request, statusCode:number): LoggerType {

    let logBody: LoggerType = { url: '', query: '', body: '', statusCode: 0 };

    logBody.url = req.url;
    logBody.query = req.query
    logBody.body = req.body
    logBody.statusCode = statusCode;
    console.log(logBody)

    return logBody;
  }

}