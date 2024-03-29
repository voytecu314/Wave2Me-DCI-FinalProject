import { useState, useEffect } from "react";
import './Blog.css'

const Blog = () => {

    const [data, setData] = useState({articles: null, loading: true, error: null});

    useEffect(()=>{
        fetch('http://localhost:5000/get-blog-posts')
        .then(res=>res.json())
        .then(articles=>setData({articles, loading: false, error: null}))
        .catch(error=>setData({data:null, loading: false, error: error.message}));
    },[]);

    if(data.loading) return <p style={{width:'25vw', margin: 'auto', textAlign: 'center'}}>Loading...</p>
    if(data.error) return <h1>{data.error.message}</h1>

  return (
    <>
  <div id="blog-grid-container">
          
        {data.articles.map((article, index)=><div id="blog-grid-item" key={'blog_'+index}>
                                                <h1 className="title">{article.title}</h1>
                                                <img className="post-image" src={article.urlToImage} 
                                                     alt={`illustration to article from ${article.source.name} not available`}/>
                                                <h2 >{article.description}</h2>
                                                <p className="article" style={{fontSize: '1.5rem'}}>{article.content}</p>
                                                <span className="article2">Publication date {article.publishedAt.slice(0,10)}</span>
                                                <a className="article3" href={article.url} target='_blank' rel="noreferrer">Read more...</a></div>)}

                                              </div>
    </>
  )
}

export default Blog;