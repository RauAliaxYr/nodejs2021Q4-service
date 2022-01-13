import * as uuid from 'uuid';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.model';
import { Board } from './board.model';
import { ColumnToBoard } from './columns.model';
/**
 * The main model of task.
 */
@Entity()
class Task {
  @PrimaryGeneratedColumn()
  id: string;
  @Column("text")
  title: string|null;
  @Column("text")
  order: string | number;
  @Column("text")
  description: string|null;
  @ManyToOne(type => User, user => user.tasks)
  userId: User;
  @ManyToOne(type => Board, board => board.tasks)
  boardId: Board;
  @ManyToOne(type => ColumnToBoard, column => column.tasks)
  columnId: ColumnToBoard;

  constructor(title: string, order: string | number, description: string|null, userId: User, boardId: Board, columnId: ColumnToBoard) {

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