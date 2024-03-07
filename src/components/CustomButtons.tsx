// Import React and styles
import React, { ReactNode, CSSProperties, MouseEvent } from "react";
import '@styles/components/CustomButtons.scss';
import { Button } from "@nextui-org/react";

// Define prop types
interface PrimaryButtonProps {
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  label?: string;
  className?: CSSProperties | string;
}

interface SecondaryButtonProps {
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  label?: string;
  className?: CSSProperties | string;
  coloured?: boolean; // Optional color prop with specific values
  disabled?: boolean;
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
const SecondaryButton: React.FC<SecondaryButtonProps> = ({ children, onClick, label, className, coloured, disabled }) => {
  return (
    <Button className={`secondary-button ${coloured ? 'blue-button' : 'white-button'} ${className}`} onClick={onClick} disabled={disabled}>
      {label}{children}
    </Button>
  );
}

// Export components
export { PrimaryButton, SecondaryButton };
