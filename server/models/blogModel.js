import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
    status: String,
    totalResults: Number,
    articles: Array
},{
    timestamps: true
});

const blogModel = mongoose.model('blog',blogSchema);

export default blogModel;