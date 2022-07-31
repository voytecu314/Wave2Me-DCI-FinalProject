import { userDataModel } from "../models/userModel.js";
import { userModel } from "../models/userModel.js";

const getUserDataController = async (req, res) => {
    try {
        const data = await userDataModel.findById(req.body.dataID).select('-__v');
        res.status(200).json({favorites: data.favorites, workOnIt: data.workOnIt, points: data.points, dataID: data.id});
      } catch (error) {
        res.json({'getting data filed: ':error.message});
      }
}

export default getUserDataController;