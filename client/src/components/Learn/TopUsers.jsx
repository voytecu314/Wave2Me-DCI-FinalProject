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

    const resizeTopUsersModal = () => {
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
            {topUsersData.map(user=><h2 className='flex-top-users-list'>
                <span>{user.name}</span>
                <span>Level: {getLevel(user.points).result}</span>
                < span>Points: {user.points}</span>
                </h2>)}
        </div>
    </div>
  )
}


export default TopUsers;