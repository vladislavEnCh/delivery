import React from 'react';
import './Button.scss';

function Button({ text }) {
  return (
    <div className="button">
      <div className="button_text">{text}</div>
    </div>
  );
}

export default Button;
