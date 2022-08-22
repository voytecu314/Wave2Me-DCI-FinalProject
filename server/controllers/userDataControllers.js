import { userDataModel, userModel } from "../models/userModel.js";

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

export const topUsersController = async (req, res) => {

  try {
    const users = await userModel.find({}).select('name').populate('dataID', 'points');
    const sanitized = users.map(user=>{return {'name':user.name,'points':user.dataID.points}});
    sanitized.sort((a,b)=>a.points-b.points);
    res.status(200).json({topUsers: sanitized.reverse()});
  } catch (error) {
    res.status(500).json({error:'Top users server error'})
  }

}