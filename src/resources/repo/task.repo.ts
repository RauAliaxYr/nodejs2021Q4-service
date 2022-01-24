import { ITask, Task } from '../../entities/task.model';
import { getRepository } from 'typeorm';


/**
 * return list of all tasks
 * @returns list of all tasks
 */
export const AllTasks = async (): Promise<Task[]> => {
  const taskRepo = getRepository(Task);

  return await taskRepo.find({ where: {} });
};

/**
 * take board's ID and returns all tasks by board ID
 * @param boardId board ID
 * @param id tasks ID
 * @returns task by board and task ID
 */
export const getTaskById = async (boardId: string, id: string): Promise<Task> => {
  const taskRepo = getRepository(Task);
  if (boardId === null){throw new Error(`There are no tasks with such id.`);}
  const taskById = await taskRepo.findOne({ id: id });
  if (typeof taskById === 'undefined') {
    throw new Error(`There are no tasks with such id.`);
  }

  return taskById;

};

/**
 * take board's ID and task's body and returns a created task
 * @param newTaskBody new task's body
 * @param boardId board id
 * @returns created Task
 */
export const createTask = async (newTaskBody: ITask, boardId:string): Promise<Task> => {
  const taskRepo = getRepository(Task);
  if (newTaskBody.boardId === null){
    newTaskBody.boardId = boardId
  }
  const insertedTask = taskRepo.create(newTaskBody);
  return await taskRepo.save(insertedTask);

};

/**
 * take task's ID, board ID and task's body and returns an updated task
 * @param boardId board's ID
 * @param id new task's ID
 * @param TaskBody new task's body
 * @returns updated task
 */
export const updateTask = async (boardId: string, id: string, TaskBody: ITask): Promise<Task> => {
  const taskRepo = getRepository(Task);

  const task: Task | undefined = await taskRepo.findOne(id);
  if (typeof task !== 'undefined') {
    await taskRepo.save({ ...task, ...TaskBody });
    const taskUpd = await taskRepo.findOne(id);
    if (typeof taskUpd === 'undefined') {
      throw new Error(`There are no task with such id.`);
    } else return taskUpd;

  } else throw new Error(`There are no task with such id.`);
};

/**
 * take task's ID and returns a deleted task
 * @param boardId board's ID
 * @param id task's ID
 * @returns deleted task
 */
export const delTask = async (boardId: string, id: string): Promise<void> => {
  const taskRepo = getRepository(Task);

    await taskRepo.delete({ id });

};


