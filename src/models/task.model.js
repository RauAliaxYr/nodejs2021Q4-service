const uuid = require('uuid');

class Task {
  constructor(title, order, description, user, board, column) {
    this.id = uuid.v4();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = user;
    this.boardId = board;
    this.columnId = column;
  }

  static toResponse(task) {
    const { id, title, description } = task;
    return { id, title, description };
  }
}

module.exports = Task;