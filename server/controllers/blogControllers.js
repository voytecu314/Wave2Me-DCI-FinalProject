import axios from 'axios';
import dotenv from 'dotenv';
import blogModel from "../models/blogModel.js";

dotenv.config();

const NEWS_API_URL = `https://newsapi.org/v2/everything?q=deaf&language=en&pageSize=100&sortBy=popularity&page=1&searchIn=title&apiKey=${process.env.NEWS_API_KEY}`;

export const refreshBlogs = async (req, res) => {

    try {
        await blogModel.create(req.body);
        res.status(200).json({msg: 'Blog posts updated.'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
    
}

export const blogPosts = (req, res) => {
    let posts;
    blogModel.find()
             .then(data=>{
                            posts=data[0].articles;
                            res.status(200).json(posts);
                            if(new Date().getTime()-data[0].createdAt.getTime()>=86400000) {
                                blogModel.deleteOne({status: 'ok'}).then(console.log).then(
                                    axios.get(NEWS_API_URL)
                                    .then(
                                        blogData=>{
                                            blogModel.create(blogData);
                                            console.log('Blog data updated');
                                        })
                                    .catch(err=>console.log('Axios:', err.message))
                                );
                            }

                        })
             .catch(error=>{
                            console.log({error});
                            res.status(500).json({msg: error.message});
                            });
}