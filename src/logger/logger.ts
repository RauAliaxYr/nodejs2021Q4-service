import { Request } from 'express';
import * as fs from 'fs';
import { LOG_STATUS } from '../common/config';


type LoggerType = {
  url: string
  query: unknown
  body: string
  statusCode: number
}

type ErrorType = {
  url: string
  statusCode: number
  error: Error
}

const logStatus: string | undefined = LOG_STATUS;

export class CustomLogger {
  /**
   * Make custom log by info
   * @param req Request
   * @param statusCode
   */
  static infoLog(req: Request, statusCode: number) {

    const logBody: LoggerType = { url: '', query: '', body: '', statusCode: 0 };

    logBody.url = req.url;
    logBody.query = req.query;
    logBody.body = req.body;
    logBody.statusCode = statusCode;

    function toLog(logBody: LoggerType) {
      return `INFO [| URL : ${logBody.url}` + '| QUERY : ' + JSON.stringify(logBody.query) + '| BODY : ' + JSON.stringify(logBody.body) + `| STATUSCODE : ${logBody.statusCode}] \n`;
    }

    if (logStatus === '2') {
      fs.writeFile(process.cwd() + '/log.txt', toLog(logBody), { flag: 'a' }, err => {
      });
    }


  }
  /**
   * Make custom log by warning
   * @param msg warning message
   */
  static warnLog(msg: string) {
    function toLog(logMsg: string) {
      return `WARNING [Description: ${logMsg}] \n`;
    }

    if (logStatus === '1' || logStatus === '2') {
      fs.writeFile(process.cwd() + '/log.txt', toLog(msg), { flag: 'a' }, err => {
        });
    }
  }
  /**
   * Make custom log by Error
   * @param req Request
   * @param statusCode
   * @param err Error
   */
  static errorLog(req: Request, statusCode: number, err: Error) {

    const errorBody: ErrorType = { url: req.url, statusCode: statusCode, error: err };

    function toLog(errToLog: ErrorType) {
      return `ERROR [| URL : ${errToLog.url}` + ` | STATUSCODE : ${errToLog.statusCode} ` + `| Error Msg : ${err} ] \n`;
    }

    if (logStatus === '1' || logStatus === '2' || logStatus === '0') {
      fs.writeFile(process.cwd() + '/log.txt', toLog(errorBody), { flag: 'a' }, err => {
       });
      fs.writeFile(process.cwd() + '/logErrors.txt', toLog(errorBody), { flag: 'a' }, err => {
        });
    }
  }
  /**
   * Make custom log by UncaughtError
   * @param err Error
   */
  static uncaughtExceptionLog(err: Error) {
    function toLog(errToLog: Error) {
      return `ERROR [| Error Msg : ${errToLog} ] \n`;
    }

    if (logStatus === '1' || logStatus === '2' || logStatus === '0') {
      fs.writeFile(process.cwd() + '/log.txt', toLog(err), { flag: 'a' }, err => {
        });
      fs.writeFile(process.cwd() + '/logErrors.txt', toLog(err), { flag: 'a' }, err => {
        });
    }
  }

}