import mongoose from 'mongoose';
import slugify from 'slugify';

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have price'],
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description']
    },
    slug: String,
    description: {
        type: String,
        trim : true,
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: { virtuals: true},
    toObject: { virtuals: true }
});

tourSchema.virtual('durationWeeks').get(function() {
    return this.duration / 7;
});

// document middlerware
// runs before .save and the .create command
// does not work on insertMany
tourSchema.pre('save', function(){
    this.slug = slugify(this.name, {lower: true});
});

//query middleware
tourSchema.pre(/^find/, function(){
    this.find({ secretTour: {$ne: true}});
})

//aggregation middleware
tourSchema.pre('aggregate', function() {
    this.pipeline().unshift({ $match: { secretTour: {$ne: true}}}); 
    console.log(this);

})

const Tour = mongoose.model('Tour', tourSchema);
export default Tour;