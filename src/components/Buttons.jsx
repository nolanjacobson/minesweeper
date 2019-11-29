import React from 'react';

const Buttons = props => {
  return (
    <section className="gameButtons">
    <button onClick={props.restartGame}>{props.emoji}</button>
    <button onClick={props.difficulty}>Easy</button>
    <button onClick={props.difficulty1}>Medium</button>
    <button onClick={props.difficulty2}>Hard</button>
    </section>
  );
}

export default Buttons;
