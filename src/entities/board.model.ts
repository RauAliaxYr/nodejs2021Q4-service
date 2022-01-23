import { v4 as uuid } from 'uuid'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export interface IColumn {
  id: string;
  title: string;
  order: number;
}
export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}

/**
 * The main model of board.
 */

@Entity({name: 'board'})
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {length: 150})
  title: string;

  @Column({type: "json", nullable: true})
  columns: IColumn[];

  /**
   * Board constructor.
   * @param id - identifier of the board
   * @param title - the board title
   * @param columns - columns of the board
   */
  constructor({
                id = uuid(),
                title = 'Board',
                columns = []
              } = {} as IBoard ) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Add column to columns array
   * @param title - title of the column
   */
  addColumn(title: string):void {
    const id = uuid();
    const order = Math.max(...this.columns.map(item => item.order)) + 1;
    this.columns.push({ id, title, order } as IColumn);
  }
}
