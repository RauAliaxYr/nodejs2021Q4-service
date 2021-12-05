const uuid = require('uuid');

class Column {
  constructor(title, order) {
    this.id = uuid.v4();
    this.title = title;
    this.order = order;

  }

  static toResponse(column) {
    const { id, title, order } = column;
    return { id, title,order };
  }
}

module.exports = Column;