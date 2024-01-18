import React from 'react';
import Header from '@layouts/Header';
import Section from '@layouts/Section';
import Link from 'next/link';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { PrimaryButton, SecondaryButton } from '@components/CustomButtons.js';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '100',
});

import '@styles/home.scss';

interface Banner {
  position: null | string;
  title: null | string;
  desc: null | string;
  image: string;
}

interface Product {
  name: string;
  desc: string;
  image: string;
}

const response = {
  banners: [
    {
      position: null,
      title: null,
      desc: null,
      image: '/images/landing-page-banner.png',
    },
    {
      position: null,
      title: null,
      desc: null,
      image: '/images/banner-2.jpg',
    },
    {
      position: null,
      title: null,
      desc: null,
      image: '/images/landing-page-banner-1.jpeg',
    },
  ],
  productsList: [
    {
      name: 'prod 1',
      desc: 'snake prod-1',
      image: '../images/prod-1.png',
    },
    {
      name: 'prod 2',
      desc: 'snake prod-1',
      image: '../images/prod-2.png',
    },
    {
      name: 'prod 4',
      desc: 'snake prod-4',
      image: '../images/prod-2.png',
    },
  ],
};

const { banners, productsList } = response;

interface ProductCardRowProps {
  items: Product[];
}

const ProductCardRow: React.FC<ProductCardRowProps> = ({ items }) => {
  return (
    <>
      <div className='productsRow'>
        {items.map((element, index) => (
          <ProductCard key={index} item={element} index={index} />
        ))}
      </div>
    </>
  );
};

interface ProductCardProps {
  item: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, index }) => {
  return (
    <Link href='/'>
      <div
        className='productCard'
        style={{
          backgroundImage: `url(${item.image})`,
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

const renderDemoProd = () => {
  return (
    <Link href='/'>
      <div className='demoContainer'>
        <div className='imageContainer'>
          <div className='imageBackground'>
            <Image
              src={banners[1]?.image}
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
      </div>
    </Link>
  );
};

const Home: React.FC = () => {
  return (
    <main className={`main ${poppins.className}`}>
      <Header />

      <Section backgroundOverlay={true} imageUrl={'../images/landing-page-banner-3.jpg'}>
        <div className='landing'>
          <h1 className='tagline'>RENTAL BOOKING.</h1>
          <PrimaryButton label={'Book Now'} />
        </div>
      </Section>

      <Section backgroundOverlay={true} imageUrl={'../images/landing-page-banner-1.jpeg'}>
        <div className='service'>
          <div className='content-container'>
            <div className='textContainer'>
              <>
                <span className='title'>
                  Grow your business with Global Prostate Solutions
                </span>

                <span className='description'>
                  An intuitive self-service platform that combines proprietary
                  first party retail data with wholesale depletions in order to
                  generate valuable insights and business intelligence.
                </span>
              </>
              <div className='button-container'>
                <SecondaryButton
                  label={'Learn More'}
                />
              </div>
            </div>

            <div className='imageContainer'>
              <img src={banners[1]?.image} alt={''} />
            </div>
          </div>
        </div>
      </Section>

      <Section backgroundOverlay={true} imageUrl={'../images/landing-page-banner-1.jpeg'}>
        <div className='nhs'>
          <div className='content-container'>
            <div className='imageContainer'>
              <img src={banners[1]?.image} alt={''} />
            </div>
            <div className='textContainer'>
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
                <SecondaryButton
                  color={'blue'}
                  label={'Learn More'}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title={'Equipments'}>
        <div className='demo'>
          <div className='productsSection'>
            <ProductCardRow items={productsList} />
          </div>
          <div className='demoSection'>{renderDemoProd()}</div>
        </div>
      </Section>
    </main>
  );
};

export default Home;
