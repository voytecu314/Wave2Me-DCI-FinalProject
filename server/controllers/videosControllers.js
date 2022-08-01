import videosModel from '../models/videosModel.js';


export const videoOfTheDayController = async (req, res) => {
	
	try {
	
		const videosTitles = await videosModel.find().select('-data');
		//now just random video - change to video of the day
		const titleOfTheDay = videosTitles[Math.floor(Math.random()*videosTitles.length)]
		const videoOfTheDay = await videosModel.findById(titleOfTheDay.id)
		
		res.status(200).json({title: titleOfTheDay.title, data: videoOfTheDay.data, _id: titleOfTheDay.id});
		
	} catch (error) {
			
		res.status(500).json({error: error.message});
		
	}

}

export const searchVideos = async (req, res) => {
	try {
		
		res.status(200).json(await videosModel.find({ title: {$regex: '^'+req.body.input, $options: 'i'} }).select('-data'));
		
	
	} catch(error) {
		
		console,log('Find videos - searchVideos controller:',error);
		res.status(500).json(error);
	
	}
}

export const searchVideo = async (req, res) => {
	try {
		
		res.status(200).json(await videosModel.findOne({ title: req.body.input }));
		
	
	} catch(error) {
		
		console,log('Find video - searchVideo controller:',error);
		res.status(500).json(error);
	
	}
}

export const getMyVideos = async (req, res) => {
	try {
		
		res.status(200).json(await videosModel.find({ _id: {$in: req.body.data}}).select('-__v'));
		
	
	} catch(error) {
		
		console,log('Find video - searchVideo controller:',error);
		res.status(500).json(error);
	
	}
}