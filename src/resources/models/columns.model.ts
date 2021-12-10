import * as uuid from "uuid";

class Column {
  id:string
  title:string
  order:number|string

  constructor(title:string,order:string) {

    this.id = uuid.v4();
    this.title = title
    this.order = order

  }

}

export {Column}