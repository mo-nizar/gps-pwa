// Import React and styles
import React, { ReactNode, CSSProperties, MouseEvent } from "react";
import '@styles/CustomButtons.scss';
import { Button } from "@nextui-org/react";

// Define prop types
interface PrimaryButtonProps {
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  label?: string;
  className?: CSSProperties;
}

interface SecondaryButtonProps {
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  label?: string;
  className?: CSSProperties;
  color?: 'blue' | 'white'; // Optional color prop with specific values
}

// PrimaryButton component
const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, onClick, label, className }) => {
  return (
    <Button className={`primary-button ${className}`} onClick={onClick}>
      {label}{children}
    </Button>
  );
};

// SecondaryButton component
const SecondaryButton: React.FC<SecondaryButtonProps> = ({ children, onClick, label, className, color }) => {
  return (
    <Button className={`secondary-button ${color === 'blue' ? 'blue-button' : 'white-button'} ${className}`} onClick={onClick}>
      {label}{children}
    </Button>
  );
}

// Export components
export { PrimaryButton, SecondaryButton };
