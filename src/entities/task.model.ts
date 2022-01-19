import * as uuid from 'uuid';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.model';
import { Board } from './board.model';

/**
 * The main model of task.
 */
@Entity({name: 'task'})
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column("varchar")
  title: string;

  @Column("varchar")
  order: string;

  @Column("text")
  description: string;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })

  @JoinColumn({ name: 'userId' })
  userId: string | null = null;

  @ManyToOne(() => Board, (board) => board.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })

  @JoinColumn({ name: 'boardId' })
  boardId: string | null = null;

  @Column('varchar', { nullable: true})
  columnId: string;

  constructor(title: string, order: string, description: string, userId: string, boardId: string, columnId: string) {

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
