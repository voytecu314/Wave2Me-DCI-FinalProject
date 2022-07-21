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

export const searchVideos = async (req, res) => {
	try {
		
		res.status(200).json(await videosModel.find({ title: {$regex: req.body.input+'.*'} }).select('-data'));
		
	
	} catch(error) {
		
		console,log('Find videos - searchVideos controller:',error);
		res.status(500).json(error);
	
	}
}

export const searchVideo = async (req, res) => {
	try {
		
		res.status(200).json(await videosModel.findOne({ title: {$regex: req.body.input+'.*'} }));
		
	
	} catch(error) {
		
		console,log('Find video - searchVideo controller:',error);
		res.status(500).json(error);
	
	}
}
