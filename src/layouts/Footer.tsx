'use client';
import { SubscribeForm } from '@/components/SubscribeForm';
import React from 'react';
import Section from './Section';
import Image from 'next/image';
import '@styles/layouts/footer.scss';
import Logo from '@images/logo.png';
import Link from 'next/link';


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

        <div className='mt-6'/>

        <div className='flex md:flex-row flex-col-reverse w-full'>
          <span className='desc '>
            {`Address:`}<br/>
            &nbsp;&nbsp;&nbsp;{`679 Grand avenu, Central Parl,`}<br/>
            &nbsp;&nbsp;&nbsp;{`NYC, NY`}<br/>
            <div className='mt-2'/>
            {`Working Time: Mon-Sat: 9 AM – 5 PM`}<br/>

          </span>

          <div className='desc md:ml-3'>
            {'Support & Sale:'}<br/>
            <Link className='desc' href={'tel:+44 (0) 124 539 2110'}>&nbsp;&nbsp;&nbsp;{'+44 (0) 124 539 2110'}</Link><br/>
            <Link className='desc' href={'mailto:query.globalps@gmail.com'}>&nbsp;&nbsp;&nbsp;{`query.globalps@gmail.com`}</Link><br/>

            <div className='mt-2'/>
          </div>
        </div>
        </div>

      </div>

      <div className='form-container'>

        <SubscribeForm/>

      </div>

    </div>
  </Section>
  )
}
