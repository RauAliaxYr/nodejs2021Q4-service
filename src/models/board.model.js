const uuid = require('uuid');

class Board {
  constructor(title, column) {
    this.id = uuid.v4();
    this.title = title;
    this.column = column.id;
  }

  static toResponse(board) {
    const { id, title  } = board;
    return { id, title };
  }
}

module.exports = Board;