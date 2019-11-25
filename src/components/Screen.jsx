import React, {useState} from 'react';
// import Modal from 'react-modal'
// ? Mark, should I use modal in this instance?

const Screen = props => {
  return (
    <div className='screen'> 
    <div className='innerScreen'>
    <h1>{props.result}</h1>  
    <button onClick={props.restartGame}>Restart</button>  
    </div>  
    </div>
  );
}

export default Screen;
