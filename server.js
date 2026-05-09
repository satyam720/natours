import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

configDotenv({ path: './config.env', debug: true, encodeing: 'UTF-8' });

const { default: app } = await import('./app.js');

const DB = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB).then(() => console.log('DB connection succesfull'))


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`istening on port ${port}`);
})
