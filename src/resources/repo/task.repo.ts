import { Task } from '../../entities/task.model';
import { Board } from '../../entities/board.model';
import { getManager, getRepository } from 'typeorm';


type TaskBody = {
  title: string,
  order: string,
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
 * @param boardId board's ID
 * @returns board by ID
 */
export const getTasksById = async (boardId: string): Promise<Task[]> => {
  const taskRepo = getRepository(Task);
  let tasks: Task[] | undefined;
  try {
    tasks = await taskRepo
      .createQueryBuilder('task')
      .where('task.boardId.id = :id', { id: boardId })
      .getMany();
  } catch (e) {
    throw new Error(`There are no tasks on board.`);
  }
  return tasks;
};

/**
 * take board's ID and returns all tasks by board ID
 * @param boardId board ID
 * @param taskId tasks ID
 * @returns task by board and task ID
 */
export const getTaskById = async (boardId: string, taskId: string): Promise<Task> => {
  let task;
  const taskRepo = getRepository(Task);
  try {
    task = await taskRepo
      .createQueryBuilder('task')
      .where('task.id = :id', { id: taskId })
      .getOne();
  } catch (e) {
    throw new Error(`Db error (get task by id)`);
  }
  if (typeof task === 'undefined') {
    throw new Error(`There are no tasks with such id.`);
  } else return task;

};

/**
 * take board's ID and task's body and returns a created task
 * @param newTaskBody new task's body
 * @param boardId board's ID
 * @returns created Task
 */
export const createTask = async (newTaskBody: TaskBody, boardId: string): Promise<Task> => {
  const taskRepo = getRepository(Task);
  const boardById = await getManager().getRepository(Board).createQueryBuilder('board').where('board.id = :id', { id: boardId }).getOne();
  let taskData: Task;

  if (typeof boardById !== 'undefined') {
    taskData = new Task(
      newTaskBody.title,
      newTaskBody.order,
      newTaskBody.description,
      newTaskBody.userId,
      boardId,
      newTaskBody.columnId
    );

    const insertedTask = taskRepo.create(taskData);
    await taskRepo.save(insertedTask);
    return taskData;
  } else throw new Error(`There are no board with such id.`);
};

/**
 * take task's ID, board ID and task's body and returns an updated task
 * @param boardId board's ID
 * @param taskId new task's ID
 * @param TaskBody new task's body
 * @returns updated task
 */
export const updateTask = async (boardId: string, taskId: string, TaskBody: Task): Promise<Task> => {
  const taskRepo = getRepository(Task);

  const task: Task | undefined = await taskRepo.findOne(taskId);
  if (typeof task !== 'undefined') {
    await taskRepo.save({ ...task, ...TaskBody });
    const taskUpd = await taskRepo.findOne(taskId);
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
  const task: Task | undefined = await taskRepo
    .createQueryBuilder('task')
    .where('task.id = :id', { id: id })
    .getOne();

  if (typeof task === 'undefined') {
    throw new Error(`There are no task with such id.`);
  } else
    await taskRepo.delete({ id });
  return task;
};


