import videosModel from '../models/videosModel.js';


export const videoOfTheDayController = async (req, res) => {
	
	try {
	
		const videosTitles = await videosModel.find().select('-data');
		const titleOfTheDay = videosTitles[Math.floor(Math.random()*videosTitles.length)]
		const videoOfTheDay = await videosModel.findById(titleOfTheDay.id)
		
		res.status(200).json({title: titleOfTheDay.title, data: videoOfTheDay.data});
		
	} catch (error) {
			
		res.status(500).json({error: error.message});
		
	}

}

