import React from 'react';

const Cells = props => {
  return (
    <td
    onClick={props.leftClick}
    onContextMenu={event => {
      event.preventDefault()
      props.rightClick()
    }}
    >
      {props.display}
    </td>
  )
}

export default Cells;
