import { useContext } from 'react';
import MyContext from '../../context/MyContext';
import './PointsPopup.css';

const PointsPopup = () => {

    const { justEarnedPoints, setPointsPopup } = useContext(MyContext);

  return (
    <div id='points-popup-container'>
        <div id='points-popup'>
            <h1>You have just earned <br /> {justEarnedPoints} <br /> learning points!</h1>
            <i style={{'fontSize':'36px'}} className='fas'>&#xf19d;</i>
            <h1>Keep learning to gain more points and higher Levels</h1>
        </div>
        <button onClick={()=>setPointsPopup(false)}>OK</button>
    </div>
  )
}

export default PointsPopup;