import React from 'react';
import '../styles/BannerComponentLarge.scss';

const BannerComponentLarge = ({ imageUrl, children }) => {
  const bannerStyle = {
    backgroundImage: `url(${imageUrl})`,
    // backgroundColor: colors
  };

  return (
  <div className="image-banner" style={imageUrl && bannerStyle}>
    {children}
  </div>)
  ;
};

export default BannerComponentLarge;