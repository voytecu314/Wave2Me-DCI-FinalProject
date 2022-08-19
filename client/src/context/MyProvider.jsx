import { useState } from "react";
import MyContext from "./MyContext";
import decodeJWTPayload from '../helpers/decodeJWTPayload.js';

const MyProvider = ({children}) => {

  const payload = decodeJWTPayload();
  const [landingModal, setLandingModal] = useState(true);
  const [pointsPopup, setPointsPopup] = useState(false);
  const [justEarnedPoints, setJustEarnedPoints] = useState(0);

  return (
    <MyContext.Provider value={{landingModal, 
                                setLandingModal, 
                                justEarnedPoints, 
                                setJustEarnedPoints, 
                                pointsPopup, 
                                setPointsPopup, 
                                payload}}>
        {children}
    </MyContext.Provider>
  )
}

export default MyProvider;