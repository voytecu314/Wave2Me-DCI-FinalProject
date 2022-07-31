import mongoose from "mongoose";

//const { Schema, model } = mongoose;

const dataSchema = new mongoose.Schema({
	points: Number,
	favorites: Array,
	workOnIt: Array
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dataID: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Data' }
},{
    timestamps: true
  });


export const userModel = mongoose.model("User", userSchema);
export const userDataModel = mongoose.model("User-Data", dataSchema);


//export default userModel;