import * as uuid from "uuid";
import { Board } from './board.model';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task.model';
/**
 * The main model of column.
 */
@Entity()
class ColumnToBoard {

  @PrimaryGeneratedColumn()
  id:string
  @Column("text")
  title:string|null
  @Column("text")
  order:number|string|null
  @ManyToOne(type => Board,board => board.columns)
  board:Board
  @OneToMany(type => Task,task => task.columnId)
  tasks:Task[]

  constructor(title:string,order:string,board:Board) {

    this.id = uuid.v4();
    this.title = title
    this.order = order
    this.board = board
    this.tasks =[]

  }

}

export {ColumnToBoard}