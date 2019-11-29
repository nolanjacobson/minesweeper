import React from 'react';

// screen is an extra feature

const Screen = props => {
  return (
    <div className='screen'> 
    <div className='innerScreen'>
    <h1 className="result">{props.result}</h1>  
    <button onClick={props.restartGame}>Restart</button>  
    </div>  
    </div>
  );
}

export default Screen;
