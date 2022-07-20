import mongoose from 'mongoose';

const videosSchema = mongoose.Schema({
	data: String,
	title: String
});

const videosModel = mongoose.model('video', videosSchema);

export default videosModel;