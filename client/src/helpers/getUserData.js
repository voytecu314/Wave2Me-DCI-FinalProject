import decodeJWTPayload from "./decodeJWTPayload";

const getUserData =  () => {
    
    const userDataID = decodeJWTPayload().dataID;
    let userData;
    if(localStorage.getItem('W2M-JWT-Token')) {

        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                token: localStorage.getItem('W2M-JWT-Token')
            },
            body: JSON.stringify({dataID: userDataID})
        }

        fetch('http://localhost:5000/get-user-data', fetchOptions)
        .then(res=>res.json())
        .then(data=>{
                    data.token_error === 'jwt expired' && localStorage.removeItem('W2M-JWT-Token');
                    userData = data;
                console.log(userData);})
        .catch(err=>console.log('fetch error',err.message));

    } else console.log('No W2M JWT token provided');

    return {userData};
}

export default getUserData;