import mongoose from 'mongoose';

const ratingSchema = mongoose.Schema({
    name: String,
    rating: String,
    value: Number,
    comment: String
}, {
    timestamps: true
});

const ratingModel = mongoose.model('Rating',ratingSchema);

export default ratingModel;