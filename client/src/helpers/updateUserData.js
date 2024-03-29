const updateUserData = (body,property='points') => {
  
    if(localStorage.getItem('W2M-JWT-Token')) {

        const fetchOptions = {
            method: 'PUT',
            headers: {'Content-Type':'application/json',
                        token: localStorage.getItem('W2M-JWT-Token')},
            body: JSON.stringify({userData: body, property})
        }

        fetch('http://localhost:5000/update-user-data',fetchOptions)
        .catch(err=>console.log('fetching data update error',err.message))

    } else console.log('No W2M JWT token provided');
    
}

export default updateUserData;