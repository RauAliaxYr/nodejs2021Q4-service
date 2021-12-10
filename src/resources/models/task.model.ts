import * as uuid from 'uuid';

class Task {
  id: string;
  title: string;
  order: string | number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;

  constructor(title: string, order: string | number, description: string, userId: string, boardId: string, columnId: string) {

    this.id = uuid.v4();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;

  }

}

export { Task };