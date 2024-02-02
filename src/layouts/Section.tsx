import React, { ReactNode, CSSProperties } from "react";
import '../styles/section.scss';

interface SectionProps {
  children?: ReactNode;
  imageUrl?: string;
  backgroundOverlay?: boolean;
  title?: string;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, imageUrl = '', backgroundOverlay = false, title = '', className = '' }) => {

  const sectionStyle: CSSProperties = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center bottom',
  };

  const overlay: CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: '100%',
    width: '100%'
  };

  return (
    <section className={`section-container ${className}`} style={sectionStyle}>
      <span className="section-title">{title}</span>
      {
        backgroundOverlay ?
          <div style={overlay}>
            {children}
          </div> : (children as React.ReactElement)
      }
    </section>
  );
};

export default Section;
