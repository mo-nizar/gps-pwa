"use client";
import React, { useState } from 'react';
import Header from '@layouts/Header';
import Section from '@layouts/Section';
import Logo from '@images/logo.png';
import Link from 'next/link';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { PrimaryButton, SecondaryButton } from '@components/CustomButtons';
import { Input } from "@nextui-org/react";
import '@styles/home.scss';
import Partners from '@/components/Partners';

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
  sections: SectionData[];
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
      banners:[]
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
              src={sections[4]?.banners[0].imageUrl ?? '/icons/arrow-right.svg'}
              alt={''}
              width={150}
              height={150}
            />
          </div>
        </div>

        <div className='textContainer'>
          <h6>Lorem Ipsum is simply dummy </h6>
          <h1>
            Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet,
            consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor
            sit amet
          </h1>

          <span>
            BOOK DEMO <img src='/icons/arrow-right.svg' />
          </span>
        </div>
      </div>    </Link>
  );
};

const Home: React.FC = () => {
  const [hovered, setIsHovered] = useState<number | null>(null);

  return (
    <main className={`main ${poppins.className}`}>
      <Header />

      <Section backgroundOverlay={true} imageUrl={'../images/landing-page-banner.jpeg'}>
        <div className='landing'>
          <h1 className='tagline'>RENT NOW.</h1>
            <span className='description'>
              An intuitive self-service platform that combines proprietary
              first party retail data with wholesale depletions in order to
              generate valuable insights and business intelligence.
            </span>
          <SecondaryButton>
            <div className='buttonContents'>
              <p>{'Book Now'}</p>
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

                    <a className={`card ${hovered==1 ? 'active-card' : ''}`}>
                      <span className='title'>{'NHS Details'}</span>
                      <span className='desc'>{'Lorem ipsum dolur sit'}</span>
                    </a>

                    <a className={`card ${hovered==2 ? 'active-card' : ''}`}>
                      <span className='title'>{'NHS Details'}</span>
                      <span className='desc'>{'Lorem ipsum dolur sit'}</span>
                    </a>

                  </div>        



                  <div className='images-div mob-div'>
                    <img className='nhs-trio' src='/images/nhs-trio.svg' />

                    
                    <div className='logo-container'>                      
                      <a className='link-text link-one' onMouseEnter={() => setIsHovered(1)} onMouseLeave={() => setIsHovered(null)}>
                        {'NHS\nDetails 1'}</a>
                      <a className='link-text link-two' onMouseEnter={() => setIsHovered(2)} onMouseLeave={() => setIsHovered(null)}>
                        {'NHS\nDetails 2'}</a>
                      <a className='link-text link-three' onMouseEnter={() => setIsHovered(3)} onMouseLeave={() => setIsHovered(null)}>
                        {'NHS\nDetails 3'}</a>
                      <a className='link-four' onMouseEnter={() => setIsHovered(4)} onMouseLeave={() => setIsHovered(null)}/>
                        {/* <img className='white-logo' src='/images/white-logo.svg' /></a> */}

                    </div>
                  </div>


                  <div className='cards-div'>
                    <a className={`card ${hovered==3 ? 'active-card' : ''}`}>
                      <span className='title'>{'NHS Details'}</span>
                      <span className='desc'>{'Lorem ipsum dolur sit'}</span>
                    </a>

                    <a className={`card ${hovered==4 ? 'active-card' : ''}`}>
                      <span className='title'>{'NHS Details'}</span>
                      <span className='desc'>{'Lorem ipsum dolur sit'}</span>
                    </a>
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
                  An intuitive self-service platform that combines proprietary
                  first party retail data with wholesale depletions in order to
                  generate valuable insights and business intelligence.
                </span>
              </>
              <div className='button-container'>
                <SecondaryButton>
                  <div className='buttonContents'>
                    <p>{'Book Demo'}</p>
                    <img src='/icons/long-arrow-right.svg' />
                  </div>
                </SecondaryButton>
              </div>
            </div>

            <div className='imagesWrapper'>
              <div className='imageContainer'>
                <div className='textContainer'>
                  <p className='typography'>test text</p>
                  <p>test text</p>
                  <p>test text</p>
                </div>
                <img src={'/images/sec_3_img_1.png'} alt={''} />
              </div>

              <div className='imageContainer'>
                <img src={'/images/sec_3_img_2.png'} alt={''} />
                <div className='textContainer'>
                  <p className='typography'>test text</p>
                  <p>test text</p>
                  <p>test text</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </Section>

      <Section title={''} className='partnerSection'>
        <Partners partners={sections[4]?.banners || []}/>
      </Section>

      <Section title={''}>
        <div className='footer'>

          <div className='details-container'>
            <span className='title'>
              {'Get In Touch!'}
            </span>
            <span className='desc'>
              {'Fill up the form and our Team will get back to you within 24 hours.'}
            </span>

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

            <div className='form'>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input type="email" label="Email" />
                <Input type="email" label="Email" placeholder="Enter your email" />
              </div>  

              <form onSubmit={()=>{}}>
                <input type="text" name="name" />
                <button type="submit">Submit</button>
              </form>         
            </div>

          </div>

        </div>
      </Section>

      {/* <Section title={'Equipments'}>
        <div className='demo'>
          <div className='productsSection'>
            <ProductCardRow items={productsList} />
          </div>
          <div className='demoSection'>{renderDemoProd()}</div>
        </div>
      </Section> */}
    </main>
  );
};

export default Home;
