import {userModel,userDataModel} from "../models/userModel.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userSignup = async (req, res) => {

  const { name, email, password } = req.body;

  try {

    //Validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array().map((err) => err.msg),
      });
    }


    //Check if user already exisists
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User Already Exists!" });
    }
	
	//Create new user empty data
	
	const data = new userDataModel({
		points: 0,
		favorites: [],
		workOnIt: []
	});
	
	await data.save();
	
    //Create a new user
    const user = new userModel({
      name,
      email,
      password,
	    dataID: data.id
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt); 

    await user.save();

    //Create a payload with user ID and may be firstName
    const payload = {
        id: user._id,
        name: user.name,
        dataID: data.id,
        auth: true
    };

    jwt.sign(payload, "randomString", { expiresIn: "4h" }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token, jwt_payload: payload });
    });
  } catch (error) {
  res.status(500).send({srvSgnUp:error});
  }
};

export const userLogin = async (req, res) => {
  
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User Not Exists!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect Password!" });
    }

    const payload = {
        id: user.id,
        name: user.name,
		    dataID: user.dataID,
        auth: true
    }; 

    jwt.sign(payload, "randomString", { expiresIn: "4h" }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token, jwt_payload: payload });
    });
  } catch (error) {console.log('auth error:',error.message);}
};

export const isLogged = async (req, res) => {
  
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    user.auth = true;
    res.status(200).json({user, auth: req.user.auth});
  } catch (error) {
    res.json(error.message);
  }

};