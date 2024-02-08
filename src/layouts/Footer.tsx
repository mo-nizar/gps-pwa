'use client';
import { SubscribeForm } from '@/components/SubscribeForm';
import React from 'react';
import Section from './Section';
import Image from 'next/image';
import '@styles/layouts/footer.scss';
import Logo from '@images/logo.png';


export const Footer = () => {
  return (
    <Section title={''} maxContent>
    <div className='footer'>

      <div className='details-container'>
        {/* <span className='title'>
          {'Get In Touch!'}
        </span>
        <span className='desc'>
          {'Fill up the form and our Team will get back to you within 24 hours.'}
        </span> */}

        <div className='about-conatiner'>

        <span className='title'>
          {'About us'}
        </span>

        <Image
          src={Logo}
          width={150}
          alt={''}
        />
        <span className='desc'>
          {`Backhoe is diversified construction company,
          made up of team of people who are proven in
          their industries. All working to desing build,
          transport, operate, and maintain project all over
          the USA
          `}
        </span>

        </div>

      </div>

      <div className='form-container'>

        <SubscribeForm/>

      </div>

    </div>
  </Section>
  )
}
