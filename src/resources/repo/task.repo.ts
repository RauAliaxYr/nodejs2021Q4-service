import { ITask, Task } from '../../entities/task.model';
import { getRepository } from 'typeorm';


type TaskBody = {
  title: string,
  order: number,
  description: string,
  userId: string,
  boardId: string,
  columnId: string
}


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
 * @param id board's ID
 * @returns board by ID
 */
export const getTasksById = async (id: string): Promise<Task[]> => {
  const taskRepo = getRepository(Task);
  let tasks: Task[] | undefined;
  try {
    tasks = await taskRepo
      .createQueryBuilder('task')
      .where('task.id.id = :id', { id: id })
      .getMany();
  } catch (e) {
    throw new Error(`There are no tasks on board.`);
  }
  return tasks;
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
  const taskById = await taskRepo.findOne(id,{where: {boardId},loadRelationIds:true}).catch((e) => console.log(e));
  if (typeof taskById === 'undefined') {
    throw new Error(`There are no tasks with such id.`);
  }

  return taskById;

};

/**
 * take board's ID and task's body and returns a created task
 * @param newTaskBody new task's body
 * @param boardId board's ID
 * @returns created Task
 */
export const createTask = async (newTaskBody: ITask): Promise<Task> => {
  const taskRepo = getRepository(Task);

  const insertedTask = taskRepo.create(newTaskBody);
  return await taskRepo.save(insertedTask);

};

/**
 * take task's ID, board ID and task's body and returns an updated task
 * @param boardId board's ID
 * @param taskId new task's ID
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
export const delTask = async (boardId: string, id: string): Promise<Task> => {
  const taskRepo = getRepository(Task);
  const task = await taskRepo.findOne(id)

  if (typeof task === 'undefined') {
    throw new Error(`There are no task with such id.`);
  } else
    await taskRepo.delete({ id });
  return task;
};


