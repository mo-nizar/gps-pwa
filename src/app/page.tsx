'use client';
import React, {FC} from 'react'
import App from '..';
import {NextUIProvider} from "@nextui-org/react";
import 'dotenv/config';

const Home: FC = () => {

  console.log('home rendered');
  
  return (
    <NextUIProvider> 
      <App/>
    </NextUIProvider>
  )
};

export default Home;