import { createConnection } from 'typeorm';
import  config  from '../../ormconfig';

export const connectToDB = async (
  runApp: () =>void):Promise<void> => {
  try {

    await createConnection(config)
    runApp()
    process.stdout.write('Successful connection to database\n');
  }
  catch (e) {
    throw new Error('Fail connection to database\n');
  }
}


