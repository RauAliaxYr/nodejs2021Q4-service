import * as uuid from "uuid";
import {Column} from "./columns.model"

class Board {
  id:string
  title:string
  columns:Array<Column>|null

  constructor(title:string,columns:Array<Column>) {

    this.id = uuid.v4();
    this.title = title
    this.columns = columns

  }

}
export {Board}