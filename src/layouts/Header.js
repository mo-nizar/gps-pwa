import React from "react";
import '../styles/header.scss';
import Image from 'next/image'
import Logo from '@images/logo.png';
import CustomDropdown from '@components/CustomDropdown';
import { PrimaryButton } from "@/components/CustomButtons";


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
      type: 'link',
      label: 'Support',
      link:'#',
      optionsList: null,
    },

    {
      type: 'button',
      label: 'Request a Call',
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

          switch(obj.type){
          
            case 'link': return <li><a href={obj.link}>{obj.label}</a></li>
            case 'dropdown': return <li><CustomDropdown title={obj.label} optionsList={obj.optionsList}/></li>
            case 'button': return <li><PrimaryButton label={obj.label} /></li>
            default: return null;

          }        
        })
        }
        </ul>
      </nav>
    </header>
  );
};

export default Header;