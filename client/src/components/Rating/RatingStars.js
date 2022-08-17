import React, { useState, useRef, useEffect, useContext } from 'react';
import MyContext from '../../context/MyContext';
import Star from './Star';
import './Rating.css'

const RatingStars = () => {

    const {payload} = useContext(MyContext);

    const [gradeIndex, setGradeIndex] = useState();
    const [comments, setComments] = useState([]);
    const [seeMore, setSeeMore] = useState(false);
    const inputRef = useRef();
    const commentsRef = useRef();
    const GRADES = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
    const activeStar = {
        fill: 'yellow'
    };

    const changeGradeIndex = ( index ) => {
        setGradeIndex(index);
    }

    const displayInput = (e) => {
        if(inputRef.current) {
            inputRef.current.style.visibility='visible';
            inputRef.current.style.width='50vw';
            inputRef.current.focus();
            e.target.style.display='none';
        }
    }

    const sendRating = (e) => {
        fetch('http://localhost:5000/rating', {
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                name: payload.name, 
                rating: GRADES[gradeIndex-1], 
                value: gradeIndex,
                comment: e.target.previousSibling.value
            })
        })
            .then(res=>res.json())
            .then(comment=>{setComments([comment.comment,...comments]);e.target.parentElement.style.display='none'})
            .catch(err=>console.log('ratings create error:',err))
    }

    const setCommentsSectionSize = (size) => {
        commentsRef.current.style.height=size;
        setSeeMore(!seeMore);
    }

    const createCommentStars = (value) => {
        const arr = new Array(value);
        arr.fill('o');
        return arr;
    }

    useEffect(()=>{

        fetch('http://localhost:5000/rating')
            .then(res=>res.json())
            .then(data=>{setGradeIndex(data.average); setComments(data.ratings.reverse());})
            .catch(err=>console.log('ratings fetch error:',err));

    },[]);

    return (
        <div className="stars-container">
            <h1 className="result">{ GRADES[gradeIndex-1] ? GRADES[gradeIndex-1] : 'Thank You for rating our page'}</h1>
            <div className="stars">
                {
                    GRADES.map((grade, index) => (
                      
                         <Star 
                            index={index} 
                            key={grade} 
                            changeGradeIndex={changeGradeIndex}
                            style={ gradeIndex > index ? activeStar : {}}
                        />
                    ))
                   
                }
            </div>
            <div className='add-comment'> 
                <button onClick={displayInput}>Add Comment</button>
                <textarea ref={inputRef} placeholder="Put comment here" />
                <button onClick={sendRating}>Send</button>
            </div>
            
            <section className='comment-section' ref={commentsRef}>
                {comments.map((rating,i)=><>
                                                <div key={'comm_'+i} className='comments'>
                                                    <span>{rating.name}</span>
                                                    <span>{rating.rating}</span>
                                                    <span>{ createCommentStars(rating.value).map((item,j)=><i className="fa fa-star-o comment-star" />) }</span>
                                                    <span>{rating.comment}</span>
                                                </div>
                                            </>)}
            </section>
            {!seeMore?
            <button className='see-more' onClick={()=>setCommentsSectionSize(`${commentsRef.current.scrollHeight}px`)}>{'see all comments >>'}</button>
            :<button className='see-less' onClick={()=>setCommentsSectionSize(`40vh`)}>{'see less comments <<'}</button>}

        </div>
    );
}

export default RatingStars;