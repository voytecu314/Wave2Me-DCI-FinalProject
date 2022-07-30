const decodeJWTPayload = () => {
    const myJWT = localStorage.getItem('W2M-JWT-Token');
    const payloadB64 = myJWT.split('.')[1];
    const payload = JSON.parse(decodeURIComponent(escape(window.atob(payloadB64))));
    const payloadData = payload.data;
    return {userID: payload.id, ...payloadData};
}

export default decodeJWTPayload;