import React from 'react';
import Header from '../layouts/Header';
import '../styles/rentals.scss';
import BannerComponentLarge from '../components/BannerComponentLarge';
import SearchFormLarge from '../components/SearchFormLarge';

const Rentals = () => {
  return (
    <main className="main">
      <Header/>
      <BannerComponentLarge imageUrl={'../images/landing-page-banner.png'}>
        
        <SearchFormLarge/>
      </BannerComponentLarge>
    </main>
  )
}

export default Rentals;
