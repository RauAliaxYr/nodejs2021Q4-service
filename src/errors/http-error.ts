/**
 * The custom Error model.
 */
class HttpError extends Error{
  statusCode: number;
  constructor(message:string, statusCode:number) {
    super(message);
    this.statusCode = statusCode
    this.name = '[HTTP-ERROR]'
  }
}
export {HttpError}