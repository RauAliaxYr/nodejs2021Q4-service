import { v4 as uuid } from 'uuid'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IUser, User } from './user.model';
import { Board } from './board.model';


export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
}
/**
 * The main model of task.
 */
@Entity({name: 'task'})
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
  })
  @JoinColumn({ name: 'userId' })
  @Column({ type: 'uuid', nullable: true, name: 'userId' })
  userId: string | null | undefined;

  @ManyToOne(() => Board, (board) => board.id, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'boardId' })
  @Column({ type: 'uuid', nullable: true, name: 'boardId' })
  boardId: string;

  @Column({ type: 'uuid', nullable: true, name: 'columnId' })
  columnId: string;
  /**
   * Task constructor
   * @param id - instance identifier
   * @param title - task title
   * @param order - task order
   * @param description - task description
   * @param userId - task owner identifier
   * @param boardId - board identifier
   * @param columnId - column identifier
   */
  constructor({
                id = uuid(),
                title = 'Task',
                order = 0,
                description = '',
                userId = null,
                boardId = '',
                columnId = ''
              } = {} as ITask) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Assign user to task
   * @param user - User instance.
   */
  assignUser(user: IUser):void {
    this.userId = user.id;
  }
}