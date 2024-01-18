import React from "react";
import '../styles/header.scss';
import Image from 'next/image'
import Logo from '@images/logo.png';
import CustomDropdown from '@components/CustomDropdown';


const Header = () =>{


  const headerOptions=[
    {
      type: 'dropdown',
      label: 'Rent',
      link:'#',
      optionsList: [{
        label: 'OPTION 1',
        key: 'OPTION1',
        link: '#',
      },
      {
        label: 'OPTION 2',
        key: 'OPTION2',
        link: '#',
      },
      {
        label: 'OPTION 3',
        key: 'OPTION3',
        link: '#',
      }
    ],

    },
    {
      type: 'dropdown',
      label: 'Shop',
      link:'#',
      optionsList: [{
        label: 'OPTION 1',
        key: 'OPTION1',
        link: '#',
      },
      {
        label: 'OPTION 2',
        key: 'OPTION2',
        link: '#',
      },
      {
        label: 'OPTION 3',
        key: 'OPTION3',
        link: '#',
      }
    ],

    },
    {
      type: 'dropdown',
      label: 'Services',
      link:'#',
      optionsList: [{
        label: 'OPTION 1',
        key: 'OPTION1',
        link: '#',
      },
      {
        label: 'OPTION 2',
        key: 'OPTION2',
        link: '#',
      },
      {
        label: 'OPTION 3',
        key: 'OPTION3',
        link: '#',
      }
    ],

    },
    {
      type: 'button',
      label: 'Support',
      link:'#',
      optionsList: null,
    },
  ];



  return (
    <header>
      <Image
        src={Logo}
        width={150}
        alt={''}
      />
      <nav>
        <ul>
        {headerOptions.map((obj)=> {
          return obj.type=='button'
          ? <li><a href={obj.link}>{obj.label}</a></li>
          : <li><CustomDropdown title={obj.label} optionsList={obj.optionsList}/></li>})
        }
        </ul>
      </nav>
    </header>
  );
};

export default Header;