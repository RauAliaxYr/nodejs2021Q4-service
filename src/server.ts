import { PORT } from './common/config';
import { app } from './app';
import 'reflect-metadata';

import { connectToDB } from './db/db';


connectToDB( () => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`));
})








