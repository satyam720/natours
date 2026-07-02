import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT_EXCEPTION!>>> SHUTTING DOWN');
  console.log(err);
  process.exit(1);
});

configDotenv({ path: './config.env', debug: true, encodeing: 'UTF-8' });

const { default: app } = await import('./app.js');

const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then(() => console.log('DB connection succesfull'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`istening on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDELED_RECTION!>>> SHUTTING DOWN');
  server.close(() => {
    process.exit(1);
  });
});
