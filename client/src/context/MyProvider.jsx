import { useState, useContext } from "react";
import MyContext from "./MyContext";

const MyProvider = ({children}) => {

  const [landingModal, setLandingModal] = useState(true);

  return (
    <MyContext.Provider value={{landingModal, setLandingModal}}>
        {children}
    </MyContext.Provider>
  )
}

export default MyProvider;