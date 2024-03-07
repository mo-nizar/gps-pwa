import Image from 'next/image'
import React from 'react';
import "@styles/components/loader.scss";



export const Loader = () => {
  return (
    <div className='full-screen-loader'>
      <Image
        alt='loader'
        width={200}
        height={200}
        className='Loader-image'
        src={'/images/Loader.svg'}
      />
    </div>
  )
}

export const SectionLoader = () => {
  return (
    <div className='section-loader'>
      <Image
        alt='loader'
        width={200}
        height={200}
        className='Loader-image'
        src={'/images/Loader.gif'}
      />
    </div>
  )
}

