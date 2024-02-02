// Import React and styles
import React, { ReactNode, CSSProperties, MouseEvent } from "react";
import '@styles/CustomButtons.scss';

// Define prop types
interface PrimaryButtonProps {
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  label?: string;
  style?: CSSProperties;
}

interface SecondaryButtonProps {
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  label?: string;
  style?: CSSProperties;
  color?: 'blue' | 'white'; // Optional color prop with specific values
}

// PrimaryButton component
const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, onClick, label, style }) => {
  return (
    <button className="primary-button" style={style} onClick={onClick}>
      {label}{children}
    </button>
  );
};

// SecondaryButton component
const SecondaryButton: React.FC<SecondaryButtonProps> = ({ children, onClick, label, style, color }) => {
  return (
    <button className={`secondary-button ${color === 'blue' ? 'blue-button' : 'white-button'}`} style={style} onClick={onClick}>
      {label}{children}
    </button>
  );
}

// Export components
export { PrimaryButton, SecondaryButton };
