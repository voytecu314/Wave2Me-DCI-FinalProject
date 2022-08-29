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
                <span style={{textAlign:'right'}}>{user.name}</span>
                <span style={{textAlign:'center'}}>Level: {getLevel(user.points).level}</span>
                <span style={{textAlign:'right'}}>Points: </span>
                <span style={{textAlign:'right'}}>{user.points}</span>
                <span></span>
                </h2>)}
        </div>
    </div>
  )
}


export default TopUsers;