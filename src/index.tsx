"use client";
import React, { createContext, useState } from 'react';
import Section from '@layouts/Section';
import {Link} from "@nextui-org/react";
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { SecondaryButton } from '@components/CustomButtons';
import '@styles/home.scss';
import Partners from '@/components/Partners';
import { Footer } from './layouts/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '100',
});

interface Banner {
  position?: null | string;
  title?: null | string;
  desc?: null | string;
  imageUrl?: string;
}

interface Product {
  name: string;
  desc: string;
  imageUrl: string;
}

interface Card {
  title: string;
  desc: string;
  link: string;
  imageUrl?: string;
  buttonText?: string;
}

interface SectionData {
  id: string;
  title: string;
  description: string;
  background: string;
  link: string;
  banners: Banner[];
  cards?: Card[];
}

interface ResponseData {
  sections?: SectionData[] | [];
  productsList: Product[];
}

const response: ResponseData = {
  sections:[
    {
      id:'1',
      title:'Rent Now',
      description:'',
      background:'',
      link:'',
      banners:[]
    },
    {
      id:'2',
      title:'Rent Now',
      description:'',
      background:'',
      link:'',
      banners:[],

      cards:[
        {
          title:'NHS Details',
          desc:'Lorem ipsum dolor sit amet consectetur',
          link:'1'
        },
        {
          title:'NHS Details',
          desc:'Lorem ipsum dolor sit amet consectetur',
          link:'2'
        },
        {
          title:'NHS Details',
          desc:'Lorem ipsum dolor sit amet consectetur',
          link:'3'
        },
        {
          title:'NHS Details',
          desc:'Lorem ipsum dolor sit amet consectetur',
          link:'4'
        }
      ]
    },
    {
      id:'3',
      title:'Rent Now',
      description:'',
      background:'',
      link:'',
      banners:[],
      cards:[
        {
          title:'Equipment Images ',
          desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          link:'/',
          imageUrl:'/images/sec_3_img_1.png',
          buttonText:'LEARN MORE'
        },
        {
          title:'Consumable',
          desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          link:'/',
          imageUrl:'/images/sec_3_img_2.png',
          buttonText:'LEARN MORE'
        },
      ],
      
    },
    {
      id:'4',
      title:'Partners',
      description:'',
      background:'',
      link:'',
      banners:[
        {
          imageUrl: '/images/nhs-logo.png',
        },
        {
          imageUrl: '/images/nhs-logo.png',
        }
      ]
    },
    {
      id:'5',
      title:'Partners',
      description:'',
      background:'',
      link:'',
      banners: [
        {
          position: null,
          title: null,
          desc: null,
          imageUrl: '/images/partners/NHealth-logo.png',
        },
        {
          position: null,
          title: null,
          desc: null,
          imageUrl: '/images/partners/nhs-logo.png',
        },
        {
          position: null,
          title: null,
          desc: null,
          imageUrl: '/images/partners/spire-logo.png',
        },
      ],
    },
  ],


  productsList: [
    {
      name: 'prod 1',
      desc: 'snake prod-1',
      imageUrl: '../images/prod-1.png',
    },
    {
      name: 'prod 2',
      desc: 'snake prod-1',
      imageUrl: '../images/prod-2.png',
    },
    {
      name: 'prod 4',
      desc: 'snake prod-4',
      imageUrl: '../images/prod-2.png',
    },
  ],
};

const { productsList, sections } = response;

interface ProductCardRowProps {
  items: Product[];
}

const ProductCardRow: React.FC<ProductCardRowProps> = ({ items }) => {
  return (
    <div className='productsRow'>
      {items.map((element, index) => (
        <ProductCard key={index} item={element} />
      ))}
    </div>
  );
};

interface ProductCardProps {
  item: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  return (
    <Link href='/'>
      <div
        className='productCard'
        style={{
          backgroundImage: `url(${item.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='overlay'>
          <h4 className='productTitle'>{item.name}</h4>
          <h5 className='productTitle'>{item.desc}</h5>
        </div>
      </div>
    </Link>
  );
};

interface RenderPartnersProps {
  items: Product[];
}

const RenderPartners: React.FC<RenderPartnersProps> = ({ items }) => {
  return (
    <div className='productsRow'>
      {items.map((element, index) => (
        <ProductCard key={index} item={element} />
      ))}
    </div>
  );
};

const RenderDemoProd: React.FC = () => {
  return (
    <Link href='/'>
      <div className='demoContainer'>
        <div className='imageContainer'>
          <div className='imageBackground'>
            <Image
              src={sections && sections[4]?.banners[0].imageUrl || '/icons/arrow-right.svg'}
              alt={''}
              width={150}
              height={150}
            />
          </div>
        </div>

        <div className='textContainer'>
          <h6>{`Lorem Ipsum is simply dummy`}</h6>
          <h1>
            {`Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet,
            consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor
            sit amet`}
          </h1>

          <span>
            {`BOOK DEMO`} <img src='/icons/arrow-right.svg' />
          </span>
        </div>
      </div>
    </Link>
  );
};

const App: React.FC = () => {
  const [hovered, setIsHovered] = useState<number | null>(null);

  const UserContext = createContext(0);
  const [user, setUser] = useState("Jesse Hall");


  return (
    <UserContext.Provider value={user}>
    <main className={`main ${poppins.className}`}>
      <Section backgroundOverlay={true} imageUrl={'../images/landing-page-banner.jpeg'}>
        <div className='landing'>
          <h1 className='tagline'>RENT NOW.</h1>
            <span className='description'>
              {`An intuitive self-service platform that combines proprietary
              first party retail data with wholesale depletions in order to
              generate valuable insights and business intelligence.`}
            </span>
          <SecondaryButton>
            <div className='buttonContents'>
              <p>{'BOOK NOW'}</p>
              <img src='/icons/long-arrow-right.svg' />
            </div>
          </SecondaryButton>
        </div>
      </Section>

      <Section backgroundOverlay={true} imageUrl={'../images/landing-page-banner-1.jpeg'}>
        <div className='service'>
          <div className='content-container'>
                <span className='title'>
                  {'Connection with NHS and Details'}
                </span>
                <div className='cards-container'>

                  <div className='cards-div'>

                    <Link className={`card ${hovered==1 ? 'active-card' : ''}`}>
                      <span className='title'>{'NHS Details'}</span>
                      <span className='desc'>{'Lorem ipsum dolur sit'}</span>
                    </Link>

                    <Link className={`card ${hovered==2 ? 'active-card' : ''}`}>
                      <span className='title'>{'NHS Details'}</span>
                      <span className='desc'>{'Lorem ipsum dolur sit'}</span>
                    </Link>
                  </div>        

                  <div className='images-div mob-div'>
                    <img className='nhs-trio' src='/images/nhs-trio.svg' />

                    <div className='logo-container'>                      
                      <Link className='link-text link-one' onMouseEnter={() => setIsHovered(1)} onMouseLeave={() => setIsHovered(null)}>
                        {'NHS\nDetails 1'}</Link>
                      <Link className='link-text link-two' onMouseEnter={() => setIsHovered(2)} onMouseLeave={() => setIsHovered(null)}>
                        {'NHS\nDetails 2'}</Link>
                      <Link className='link-text link-three' onMouseEnter={() => setIsHovered(3)} onMouseLeave={() => setIsHovered(null)}>
                        {'NHS\nDetails 3'}</Link>
                      <Link className='link-four' onMouseEnter={() => setIsHovered(4)} onMouseLeave={() => setIsHovered(null)}/>
                        {/* <img className='white-logo' src='/images/white-logo.svg' /></Link> */}
                    </div>
                  </div>

                  <div className='cards-div'>
                    <Link className={`card ${hovered==3 ? 'active-card' : ''}`}>
                      <span className='title'>{'NHS Details'}</span>
                      <span className='desc'>{'Lorem ipsum dolur sit'}</span>
                    </Link>

                    <Link className={`card ${hovered==4 ? 'active-card' : ''}`}>
                      <span className='title'>{'NHS Details'}</span>
                      <span className='desc'>{'Lorem ipsum dolur sit'}</span>
                    </Link>
                  </div>
                </div>

          </div>
        </div>
      </Section>

      <Section backgroundOverlay={true} imageUrl={'../images/landing-page-banner-1.jpeg'}>
        <div className='nhs'>
          <div className='content-container'>
            <div className='textWrapper'>
              <>
                <span className='title'>
                  {'Grow your business with Global Prostate Solutions'}
                </span>

                <span className='description'>
                  {`An intuitive self-service platform that combines proprietary
                  first party retail data with wholesale depletions in order to
                  generate valuable insights and business intelligence.`}
                </span>
              </>
              <div className='button-container'>
                <SecondaryButton coloured>
                  <div className='buttonContents'>
                    <p>{'BOOK DEMO'}</p>
                    <img src='/icons/arrow-white.svg' />
                  </div>
                </SecondaryButton>
              </div>
            </div>

            <div className='imagesWrapper'>
            {sections && sections[2].cards?.map((item,idx)=>(
                <div key={idx} className='imageContainer'>
                  <div className='textContainer'>
                    <p className='typography'>{item?.title || ''}</p>
                    <p className='desc'>{item?.desc || ''}</p>
                    <Link className='link'>{item?.buttonText || ''} <img src='/icons/link-arrow.svg' /></Link>
                  </div>
                  <img src={item.imageUrl} alt={''} />
                </div>
              ))}
            </div>

          </div>
        </div>
      </Section>

      <Section title={''} className='partnerSection' maxContent>
        <Partners partners={sections && sections[4]?.banners || []}/>
      </Section>

      <Footer/>

    </main>
    </UserContext.Provider>
  );
};

export default App;
