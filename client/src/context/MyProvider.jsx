import { useState } from "react";
import MyContext from "./MyContext";
import decodeJWTPayload from '../helpers/decodeJWTPayload.js';

const MyProvider = ({children}) => {

  const payload = decodeJWTPayload();
  const [landingModal, setLandingModal] = useState(true);

  return (
    <MyContext.Provider value={{landingModal, setLandingModal, payload}}>
        {children}
    </MyContext.Provider>
  )
}

export default MyProvider;