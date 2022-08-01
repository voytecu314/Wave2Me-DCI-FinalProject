import { userDataModel } from "../models/userModel.js";

export const getUserDataController = async (req, res) => {
    try {
        const data = await userDataModel.findById(req.body.dataID).select('-__v');
        res.status(200).json({favorites: data.favorites, workOnIt: data.workOnIt, points: data.points, dataID: data.id});
      } catch (error) {
        res.status(500).json({'data_error':error.message});
      }
}

export const updateUserDataController = async (req, res) => {
  try {
      const filter = { _id: req.body.userData.dataID};
      const update = { [`${req.body.property}`]: req.body.userData[`${req.body.property}`], points: req.body.userData.points};
      const data = await userDataModel.findOneAndUpdate(filter, update, {new:true});
      res.status(200).json({data});
    } catch (error) {
      res.json({'updating data failed: ':error.message});
    }
}