import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
	points: Number,
	favorites: Array,
	workOnIt: Array,
});

const userDataModel = mongoose.model("User-data", dataSchema);


export default userDataModel;