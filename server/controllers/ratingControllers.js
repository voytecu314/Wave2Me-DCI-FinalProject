import ratingModel from "../models/ratingModel.js";

export const getRating = async (req, res) => {
    try {
        const ratings = await ratingModel.find({});
        const average = (array) => array.reduce((a, b) => a + b) / array.length;
        
        res.status(200).json({average:Math.round(average(ratings.map(rating=>rating.value))), ratings});
    } catch (error) {
        res.status(500).json({error});        
    }
}

export const postRating = async (req, res) => {
    try {
        const added =await ratingModel.create(req.body);
        res.status(200).json({comment: added});
    } catch (error) {
        res.status(500).json({error});       
    }
}
