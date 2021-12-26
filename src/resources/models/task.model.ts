import * as uuid from 'uuid';
/**
 * The main model of task.
 */
class Task {
  id: string;
  title: string|null;
  order: string | number;
  description: string|null;
  userId: string|null;
  boardId: string|null;
  columnId: string|null;

  constructor(title: string, order: string | number, description: string|null, userId: string|null, boardId: string|null, columnId: string|null) {

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