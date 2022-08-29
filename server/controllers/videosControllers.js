import videosModel from '../models/videosModel.js';


export const videoOfTheDayController = async (req, res) => {
	
	try {
	
		const videosTitles = await videosModel.find({}).select('-data');
		//this is for guaranteed different video on every day of the week

		const today = new Date().getDay();
		const monthDay = new Date().getDate();
		const quantity = Math.floor(videosTitles.length / 7);
		const whichOne = monthDay%quantity;

		const titleOfTheDay = videosTitles[today+(whichOne*7)]
		const videoOfTheDay = await videosModel.findById(titleOfTheDay.id)
		
		res.status(200).json({title: titleOfTheDay.title, data: videoOfTheDay.data, _id: titleOfTheDay.id});
		
	} catch (error) {
			
		res.status(500).json({error: error.message});
		
	}

}

export const searchVideos = async (req, res) => {
	try {
		
		res.status(200).json(await videosModel.find({ title: {$regex: '^'+req.body.input, $options: '-i'} }).select('-data'));
		
	
	} catch(error) {
		
		console,log('Find videos - searchVideos controller:',error);
		res.status(500).json(error);
	
	}
}

export const searchVideo = async (req, res) => {
	try {
		
		res.status(200).json(await videosModel.findOne({ title: {$regex: '^'+req.body.input, $options: '-i'} }));
		
	
	} catch(error) {
		
		console,log('Find video - searchVideo controller:',error);
		res.status(500).json(error);
	
	}
}

export const getMyVideos = async (req, res) => {
	try {
		
		res.status(200).json(await videosModel.find({ _id: {$in: req.body.data}}).select('-__v'));
		
	
	} catch(error) {
		
		console.log('Find video - searchVideo controller:',error);
		res.status(500).json(error);
	
	}
}

export const quizController = async (req, res) => {
	try {
		const randomizedTitles = [];
		const videosTitles = await videosModel.find().select('-data -__v');
		const initialLength = videosTitles.length;
		//now just random video
		const quizVideoTitle = videosTitles[Math.floor(Math.random()*videosTitles.length)];
		const quizVideoData = await videosModel.findById(quizVideoTitle.id);
		const sanitized = videosTitles.filter(video=>video.title != quizVideoTitle.title);
		for(let i=0; i<initialLength; i++) {
			randomizedTitles.push(
				...sanitized.splice(Math.floor(Math.random()*videosTitles.length,1))
			);
		}
		
		res.status(200).json({randomizedTitles,title: quizVideoTitle.title, data: quizVideoData.data});
		
	} catch (error) {
			
		res.status(500).json({quizControllerError: error.message});
		
	}
}