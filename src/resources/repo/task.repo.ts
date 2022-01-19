import { Task } from '../../entities/task.model';
import { Board } from '../../entities/board.model';
import { getManager, Repository } from 'typeorm';
import { User } from '../../entities/user.model';
import { ColumnToBoard } from '../../entities/columns.model';

type TaskBody = {
  title: string,
  order: string,
  description: string,
  userId: User,
  boardId: Board,
  columnId: ColumnToBoard

}

/**
 * The main repository API for tasks.
 */
class TaskRepo {

  static TaskRepo = getManager().getRepository(Task);

  /**
   * return list of all tasks
   * @returns list of all tasks
   */
  static async All(): Promise<Repository<Task>> {

    return this.TaskRepo;
  }

  /**
   * take board's ID and returns all tasks by board ID
   * @param boardId board's ID
   * @returns board by ID
   */
  static async getTasksById(boardId: string): Promise<Array<Task>> {
    let tasks = [];
    try {
      tasks = await this.TaskRepo
        .createQueryBuilder('task')
        .where('task.boardId.id = :id', { id: boardId })
        .getMany();
    } catch (e) {
      throw new Error(`There are no tasks on board.`);
    }
    return tasks;
  }

  /**
   * take board's ID and returns all tasks by board ID
   * @param boardId board ID
   * @param taskId tasks ID
   * @returns task by board and task ID
   */
  static async getTaskById(boardId: string, taskId: string): Promise<Task> {
    let task;
    try {
      task = await this.TaskRepo
        .createQueryBuilder('task')
        .where('task.id = :id', { id: taskId })
        .getOne();
    } catch (e) {
      throw new Error(`Db error (get task by id)`);
    }
    if (typeof task === 'undefined') {
      throw new Error(`There are no tasks with such id.`);
    } else return task;

  }

  /**
   * take board's ID and task's body and returns a created task
   * @param newTaskBody new task's body
   * @param boardId board's ID
   * @returns created Task
   */
  static async createTask(newTaskBody: TaskBody, boardId: string): Promise<Task> {

    let boardById = await getManager().getRepository(Board).createQueryBuilder('board').where('board.id = :id', { id: boardId }).getOne();
    let taskData: Task;

    if (typeof boardById !== 'undefined') {
      taskData = new Task(
        newTaskBody.title,
        newTaskBody.order,
        newTaskBody.description,
        newTaskBody.userId,
        boardById,
        newTaskBody.columnId
      );

      try {
        await this.TaskRepo
          .createQueryBuilder('task')
          .insert()
          .into(Task)
          .values(taskData)
          .execute();
      } catch (e) {
        throw new Error('Error into db (task creation)');
      }
      return taskData;
    }else throw new Error(`There are no board with such id.`);
  }

  /**
   * take task's ID, board ID and task's body and returns an updated task
   * @param boardId board's ID
   * @param taskId new task's ID
   * @param TaskBody new task's body
   * @returns updated task
   */
  static async updateTask(boardId: string, taskId: string, TaskBody: TaskBody): Promise<Task> {

    try {
      await this.TaskRepo.createQueryBuilder()
        .update()
        .set({id: taskId,
          title: TaskBody.title,
          order: TaskBody.order,
          description: TaskBody.description,
          userId: TaskBody.userId,
          boardId: TaskBody.boardId,
          columnId: TaskBody.columnId})
        .where('task.id = :id', { id: taskId })
        .returning('*')
        .execute()
    }
    catch (e) {
      throw new Error('Error into db (user updation)');
    }

    let updatedTask: Task|undefined = await this.TaskRepo
      .createQueryBuilder('task')
      .where('task.id = :id', { id: taskId })
      .getOne();
    if (typeof updatedTask === 'undefined'){
      throw new Error(`There are no task with such id.`)
    }
    else return updatedTask;
  }

  /**
   * take task's ID and returns a deleted task
   * @param boardId board's ID
   * @param taskId task's ID
   * @returns deleted task
   */
  static async delTask(boardId: string, taskId: string): Promise<Task> {
    let task: Task|undefined = await this.TaskRepo
      .createQueryBuilder('task')
      .where('task.id = :id', { id: taskId })
      .getOne();

    if (typeof task === 'undefined'){
      throw new Error(`There are no task with such id.`)
    }else try {

      await this.TaskRepo
        .createQueryBuilder()
        .delete()
        .from(Task)
        .where('task.id = :id', { id: taskId })
        .execute()
    }
    catch(e){
      throw new Error('Error into db (task deletion)')
    }
    return task;
  }
}

export {
  TaskRepo
};