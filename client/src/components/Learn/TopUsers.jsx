import { useState, useEffect } from 'react';
import './TopUsers.css';

const TopUsers = ({topRef, topUsersIsOpen, getLevel}) => {

    const [topUsersData, setTopUsersData] = useState([]);

    useEffect(()=>{

        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                token: localStorage.getItem('W2M-JWT-Token')
            }
        }

        fetch('http://localhost:5000/top-users',fetchOptions)
            .then(res=>res.json())
            .then(topUsers=>setTopUsersData(topUsers.topUsers))
            .catch(console.log);
    },[topUsersIsOpen]);

    const resizeTopUsersModal = (e) => {
        if(topRef.current) {
            topRef.current.style.height = '0vh';
            topRef.current.style.width = '0vw';
            topRef.current.style.opacity = '0';
        } 
    }

  return (
    <div id='top-users' ref={topRef}> <button onClick={resizeTopUsersModal}>X</button>
        <div>
            <h1>Top Users</h1>
            {topUsersData.map((user,i)=><h2 key={`top_${i}`}>
                <span style={{textAlign:'right'}}>
                    
                    {i===0 && <i className='fas fa-medal' style={{fontSize:'3rem', color:'gold'}}></i>}
                    {i===1 && <i className='fas fa-medal' style={{fontSize:'2.5rem', color:'silver'}}></i>}
                    {i===2 && <i className='fas fa-medal' style={{fontSize:'2rem', color:'brown'}}></i>}{`${i+1}.`} 
                </span>
                <span style={{textAlign:'center'}}>{user.name}</span>
                <span style={{textAlign:'left'}}>Level: {getLevel(user.points).level}</span>
                <span style={{textAlign:'center'}}>Points: </span>
                <span style={{textAlign:'right'}}>{user.points}</span>
                <span></span>
                </h2>)}
        </div>
    </div>
  )
}


export default TopUsers;