const uuid = require('uuid');
const modelColumn = require("./column.model")

class Board {
  constructor(title, column) {
    this.id = uuid.v4();
    this.title = title;
    this.columns = column;
  }

  static toResponse(board) {
    const { id, title, columneses  } = board;
    const columns = columneses.forEach(column => modelColumn.toResponse(column))
    return { id, title, columns };
  }
}

module.exports = Board;