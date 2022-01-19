import * as uuid from "uuid";
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * The main model of board.
 */

@Entity({name: 'board'})
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @Column({type: "json", nullable: true})
  columns: IColumn[];

  constructor(title:string,columns:IColumn[]) {
    this.id = uuid.v4();
    this.title = title
    this.columns = columns

  }
  addColumn(title: string):void {
    const id = uuid.v4();
    const order = Math.max(...this.columns.map(item => item.order)) + 1;
    this.columns.push({ id, title, order } as IColumn);
  }

}
export interface IColumn {
  id: string;
  title: string;
  order: number;
}

