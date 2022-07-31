const decodeJWTPayload = () => {
    const myJWT = localStorage.getItem('W2M-JWT-Token');
    let payloadB64;
    let payload;
    if(myJWT) {
        payloadB64 = myJWT.split('.')[1];
        payload = JSON.parse(decodeURIComponent(escape(window.atob(payloadB64))));
    } else payload = {
        "id": "0000",
        "name": "test",
        "dataID": "0000",
        "auth": false
      }
    
    return payload;
}

export default decodeJWTPayload;