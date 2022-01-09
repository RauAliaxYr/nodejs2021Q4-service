import * as uuid from "uuid";
import {Column} from "./columns.model"
/**
 * The main model of board.
 */
class Board {
  id:string
  title:string|null
  columns:Array<Column>|null

  constructor(title:string,columns:Array<Column>) {
    this.id = uuid.v4();
    this.title = title
    this.columns = columns
  }

}
export {Board}