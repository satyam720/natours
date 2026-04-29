import { configDotenv } from 'dotenv';

configDotenv({ path: './config.env', debug: true, encodeing: 'UTF-8'});

const { default: app } = await import('./app.js');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`istening on port ${port}`);
})