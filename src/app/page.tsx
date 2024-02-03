'use client';
import React, {FC} from 'react'
import App from '..';
import {NextUIProvider} from "@nextui-org/react";


const Home: FC = () => {
  return (
    <NextUIProvider>   
     <App/>
    </NextUIProvider>
  )
};

export default Home;