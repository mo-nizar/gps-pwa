import Section from '@/layouts/Section';
import React, { FC } from 'react';
import '@styles/services.scss';
import Image from 'next/image';
import { SecondaryButton } from '@/components/CustomButtons';
import { Footer } from '@/layouts/Footer';

interface PageProps {
}

interface additionalInfo{
  title: string,
  desc: string,
  imageUrl: string,
}

interface Services{
  title: string,
  desc: string,
  images: string[],
  info: string,
}

interface Data{
  hint?: string,
  title: string,
  desc?: string,
  services: Services[],
  additionalInfo: additionalInfo[],
}

const Page: FC<PageProps> = () => {

  const data: Data ={
    hint: 'Services page',
    title: 'Explore Store',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
    additionalInfo:[
      {
        title:'Free Delivery',
        desc:'Enter your Postal code for Delivery Availability',
        imageUrl:'icons/shipping.svg',
      },
      {
        title:'Return Delivery',
        desc:'Free 30 days Delivery Return. Details',
        imageUrl:'icons/package.svg',
      },
    ],
    services:[
      {
        title: 'Product Name 1',
        desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        images:['/images/services/bed.png'],
        info:'Lorem ipsum dolor sit , some dummy text and other informations',
      },
      {
        title: 'Product Name 2',
        desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        images:['/images/services/bed.png'],
        info:'Lorem ipsum dolor sit , some dummy text and other informations',
      },
      {
        title: 'Product Name 3',
        desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        images:['/images/services/bed.png'],
        info:'Lorem ipsum dolor sit , some dummy text and other informations',
      },
      {
        title: 'Product Name 3',
        desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        images:['/images/services/bed.png'],
        info:'Lorem ipsum dolor sit , some dummy text and other informations',
      },
      {
        title: 'Product Name 3',
        desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        images:['/images/services/bed.png'],
        info:'Lorem ipsum dolor sit , some dummy text and other informations',
      },
      {
        title: 'Product Name 3',
        desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        images:['/images/services/bed.png'],
        info:'Lorem ipsum dolor sit , some dummy text and other informations',
      },
      {
        title: 'Product Name 3',
        desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        images:['/images/services/bed.png'],
        info:'Lorem ipsum dolor sit , some dummy text and other informations',
      }
    ]
  }

  const { additionalInfo, services }= data;


  const style={
    descContainer:(evenItem: boolean)=>({
      marginRight: evenItem ? 0 : 50,
      marginLeft: evenItem ? 50 : 0,

    })
  }


  const renderServices = (item: Services, idx: number): JSX.Element => {
    let evenItem = idx%2===0;
    return (
        <div key={idx}>
          <div className={`service-container flex flex-col ${evenItem ? 'md:flex-row' : 'md:flex-row-reverse' } justify-between md:my-24 my-6`}>
            <div className={`image-container flex h-full w-3/6 ${evenItem ? 'md:justify-start' : 'md:justify-end'}`}>
              <Image src={item.images[0]} alt='' width={100} height={100} className='w-auto h-full'/>
            </div>

            <div className={`desc-container flex flex-col h-full ml-0 ${evenItem ? 'md:ml-22' : 'md:mr-22'} md:w-3/6 w-full md:pl-6 relative`}>
              {/* <span className='section-hint self-start'>{data.hint || ''}</span> */}

              <span className='service-title'>
                {item?.title || ''}
              </span>
              <span className='service-desc '>
                {item?.desc || ''}
              </span>

              <div className='line border-1 w-full lg:my-10 my-8 '/>


              <div className='border-1 w-full flex flex-col rounded-2xl	p-4'>

                

                {additionalInfo && additionalInfo?.map((info,_idx)=>(
                  <div className='additional-info'>
                    <div className='w-full flex flex-row mb-2'>
                      <img src={info?.imageUrl} alt='shippiong icon' className='w-6 mr-4'/>
                      <div className='w-full flex flex-col mb-2'>
                        <span className='title'>{'Free Delivery'}{info?.title || ''}</span>
                        <span className='section-hint self-start'>{info?.desc || ''}</span>
                      </div>
                    </div>
                    {_idx+1 !== additionalInfo?.length && (<div className='border-1 w-full my-4 '/>)}
                  </div>
                ))}
              </div>
        
              <div className='line border-1 w-full my-10 '/>

              <span className='service-info'>
                {item?.info || ''}
              </span>

              <SecondaryButton coloured className='self-end mt-8 w-full md:w-auto md:absolute md:right-0 md:bottom-0'>
                {`BOOK NOW`} <img src='/icons/arrow-white.svg' />
              </SecondaryButton>
            </div>
          </div>

          {idx+1 !== services?.length && (<div className='border-1 w-full'/>)}
        </div>
    );
  };

  return (
    <main>
      <Section className='intro' maxContent={true}>
        <span className='section-hint self-center'>{data.hint || ''}</span>
        <span className='title self-center'>{data.title || ''}</span>
        <span className='desc self-center'>{data.desc}</span>
        {services && services?.map(renderServices)}
      </Section>
      <Footer/>

    </main>
  );
}


export default Page;
