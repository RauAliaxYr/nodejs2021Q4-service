import { createConnection, getConnection } from 'typeorm';

export const connectToDB = async (
  runApp: () =>void):Promise<void> => {
  try {
    await createConnection('dudu')
    runApp()
    process.stdout.write('Successful connection to database\n');
  }
  catch (e) {
    throw new Error('Fail connection to database\n');
  }
}


