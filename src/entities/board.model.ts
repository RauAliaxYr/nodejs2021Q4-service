import * as uuid from "uuid";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {ColumnToBoard} from "./columns.model"
import { Task } from './task.model';
/**
 * The main model of board.
 */

@Entity()
export class Board {

  @PrimaryGeneratedColumn()
  id:string

  @Column("text")
  title:string|null

  @OneToMany(type => ColumnToBoard, column => column.board)
  columns:ColumnToBoard[]

  @OneToMany(type => Task, task => task.boardId)
  tasks:Task[]

  constructor(title:string,columns:Array<ColumnToBoard>) {
    this.id = uuid.v4();
    this.title = title
    this.columns = columns
    this.tasks = []
  }

}

