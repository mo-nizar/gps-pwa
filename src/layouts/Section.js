import React from "react";
import '../styles/section.scss';

const Section = ({children, imageUrl='', backgroundOverlay = false, title=''}) =>{

  const sectionStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center bottom	',
  };

  const overlay={
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: '100%',
    width: '100%'
  }

  return (
    <section className="section-container" style={sectionStyle}>
      <span className="section-title">{title}</span>
      {
        backgroundOverlay ?
          <div style={overlay}>
            {children}
          </div> : children
      }
    </section>
  );
};

export default Section;