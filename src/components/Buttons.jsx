import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'

const Buttons = props => {
  return (
    <section className="gameButtons">
      <button onClick={props.createTheTable}>😃</button>
    <button onClick={props.difficulty}>Easy</button>
    <button onClick={props.difficulty1}>Medium</button>
    <button onClick={props.difficulty2}>Hard</button>
    </section>
  );
}

export default Buttons;
