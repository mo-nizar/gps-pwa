import React, { ReactNode } from 'react';
import '../styles/BannerComponentLarge.scss';

interface BannerComponentLargeProps {
  imageUrl: string;
  children: ReactNode;
}

const BannerComponentLarge: React.FC<BannerComponentLargeProps> = ({ imageUrl, children }) => {
  const bannerStyle: React.CSSProperties = {
    backgroundImage: `url(${imageUrl})`,
    // backgroundColor: colors
  };

  return (
    <div className="image-banner" style={imageUrl && bannerStyle || {}}>
      {children}
    </div>
  );
};

export default BannerComponentLarge;
