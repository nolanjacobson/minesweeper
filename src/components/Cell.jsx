import React from 'react';

const Cells = prop => {
   if (prop.data === '*') {
     return <>💣</>
   }
   if (prop.data === 'F') {
    return <>🚩</>
  }
  if (prop.data === '_') {
    return <>☑️</>
  }
  else {
    return <>{prop.data}</>
  }

  
}

export default Cells;
