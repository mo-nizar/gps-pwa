'use client'
import React from "react";
import '@styles/CustomButtons.scss';


const PrimaryButton = ({onClick, label, style }) =>{

  return (
    <button className="primary-button" style={style} onClick={onClick}>
      {label}
    </button>
  );
};

const SecondaryButton = ({onClick, label, style, color })=>{
  return (
    <button className={`secondary-button ${color=='blue' ? 'blue-button' : 'white-button' }`} style={[style]} onClick={onClick}>
      {label}
    </button>
  );
}

export {PrimaryButton, SecondaryButton};