import React from 'react';
import Image from 'next/image';
import Logo from '@images/gps-logo-white.png';
import CustomDropdown from '@components/CustomDropdown';
import { PrimaryButton } from '@/components/CustomButtons';
import '@styles/layouts/header.scss';

interface HeaderOption {
  type: 'link' | 'dropdown' | 'button';
  label: string;
  link: string;
  optionsList: Array<{ label: string; key: string; link: string }> | null;
}

const Header: React.FC = () => {
  const headerOptions: HeaderOption[] = [
    {
      type: 'dropdown',
      label: 'Rent',
      link: '/rentals',
      optionsList: [
        {
          label: 'OPTION 1',
          key: 'OPTION1',
          link: '/rentals',
        },
        {
          label: 'OPTION 2',
          key: 'OPTION2',
          link: '/rentals',
        },
        {
          label: 'OPTION 3',
          key: 'OPTION3',
          link: '/rentals',
        },
      ],
    },
    {
      type: 'dropdown',
      label: 'Shop',
      link: '/shop',
      optionsList: [
        {
          label: 'OPTION 1',
          key: 'OPTION1',
          link: '/shop',
        },
        {
          label: 'OPTION 2',
          key: 'OPTION2',
          link: '/shop',
        },
        {
          label: 'OPTION 3',
          key: 'OPTION3',
          link: '/shop',
        },
      ],
    },
    {
      type: 'dropdown',
      label: 'Services',
      link: '/services',
      optionsList: [
        {
          label: 'OPTION 1',
          key: 'OPTION1',
          link: '/services',
        },
        {
          label: 'OPTION 2',
          key: 'OPTION2',
          link: '/services',
        },
        {
          label: 'OPTION 3',
          key: 'OPTION3',
          link: '/services',
        },
      ],
    },
    {
      type: 'link',
      label: 'Support',
      link: '#',
      optionsList: null,
    },
    {
      type: 'button',
      label: 'Request a Call',
      link: '#',
      optionsList: null,
    },
  ];

  return (
    <header>
      <a href={'/'}><Image src={Logo} width={150} alt={''} /></a>
      <nav>
        <ul>
          {headerOptions.map((obj, index) => {
            switch (obj.type) {
              case 'link':
                return (
                  <li key={index}>
                    <a href={obj.link}>{obj.label}</a>
                  </li>
                );
              case 'dropdown':
                return (
                  <li key={index}>
                    <CustomDropdown title={obj.label} optionsList={obj.optionsList as any} />
                  </li>
                );
              case 'button':
                return (
                  <li key={index}>
                    <PrimaryButton label={obj.label} />
                  </li>
                );
              default:
                return null;
            }
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
