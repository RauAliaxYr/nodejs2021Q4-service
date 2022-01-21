import * as uuid from 'uuid';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.model';
import { Board } from './board.model';

/**
 * The main model of task.
 */
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'SET NULL',
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'userId' })
  userId: string | null;

  @ManyToOne(() => Board, (board) => board.id, {
    onDelete: 'SET NULL',
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'boardId' })
  boardId: string | null;

  @Column({ nullable: true })
  columnId: string;

  constructor(title: string, order: number, description: string, userId: string, boardId: string, columnId: string) {

    this.id = uuid.v4();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;

  }
  assignUser(user: User):void {
    this.userId = user.id;
  }

}
