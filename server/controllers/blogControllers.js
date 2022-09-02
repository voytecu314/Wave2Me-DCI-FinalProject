import axios from 'axios';
import dotenv from 'dotenv';
import blogModel from "../models/blogModel.js";

dotenv.config();


const NEWS_API_URL = `https://newsapi.org/v2/everything?q=deaf&language=&pageSize=100&sortBy=publishedAt&page=1&searchIn=title&apiKey=${process.env.NEWS_API_KEY}`;

export const refreshBlogs = async (req, res) => {

    try {
        await blogModel.create(req.body);
        res.status(200).json({msg: 'Blog posts updated.'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
    
}

export const blogPosts = (req, res) => {
    let posts = [{
        source: {name: "Wave2Me Server"},
        title: "Something went wrong, please try again", 
        description: "There was an error in our DataBase",
        urlToImage: "https://live.staticflickr.com/1050/1358592888_63e3fad0d3_z.jpg",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404",
        content: "There was a problem with our database, please refresh the page",
        publishedAt: new Date().toLocaleDateString()+'....'

    }];
    
    blogModel.find({})
             .then(data=>{
                            posts= data[0]?.articles || posts;
                            res.status(200).json(posts);
                            //console.log('DB blog posts update in',((86400000-(new Date().getTime()-data[0].createdAt.getTime()))/60000).toFixed(2),'min');
                            if(data[0]?.articles && new Date().getTime()-data[0].createdAt.getTime()>=86400000) {
                                blogModel.deleteOne({status: 'ok'}).then(console.log).then(
                                    axios.get(NEWS_API_URL)
                                    .then(
                                        blogData=>{
                                            blogModel.create(blogData.data);
                                            console.log('Blog data updated');
                                        })
                                    .catch(err=>console.log('Axios:', err.message))
                                );
                            }
                            if(!data[0]?.articles){
                                axios.get(NEWS_API_URL)
                                    .then(
                                        blogData=>{
                                            blogModel.create(blogData.data);
                                            console.log('Blog data created');
                                        })
                                    .catch(err=>console.log('(emptyDB)Axios:', err.message))
                            }
                        })
             .catch(error=>{
                            console.log({error});
                            res.status(500).json({msg: error.message});
                            });
}