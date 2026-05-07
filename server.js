import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

configDotenv({ path: './config.env', debug: true, encodeing: 'UTF-8' });

const { default: app } = await import('./app.js');

const DB = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB).then(() => console.log('DB connection succesfull'))

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have price'],
    }
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
    name: 'The Park chapter',
    price: 997

});

testTour.save()
.then(doc => {
    console.log(doc);
})
.catch(err => {
    console.log("Error::", err);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`istening on port ${port}`);
})