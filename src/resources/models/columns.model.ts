import * as uuid from "uuid";

class Column {
  id:string
  title:string|null
  order:number|string|null

  constructor(title:string,order:string) {

    this.id = uuid.v4();
    this.title = title
    this.order = order

  }

}

export {Column}