"use client"
import Section from '@/layouts/Section';
import React, { FC, useState } from 'react';
import '@styles/summary.scss';
import Image from 'next/image';
import { SecondaryButton } from '@/components/CustomButtons';
import { Footer } from '@/layouts/Footer';
import { Input, Tab, Tabs } from '@nextui-org/react';
import SearchableDropdown from '@/components/SearchableDropdown';
import { useRouter, useSearchParams } from 'next/navigation';

interface PageProps {
  params: { id: string, type?: string }
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
  id: string,
  linkEnabled: boolean,
  buttonEnabled: boolean,
}

interface Data{
  hint?: string,
  title: string,
  desc?: string,
  services: Services[],
  additionalInfo: additionalInfo[],
}

interface Option {
  [key: string]: string;
}

interface DropDownProps {
  label: string;
  searchable: boolean;
  valueKey: string,
  options: Option[],
  placeholder: string,
}

const serviceOptions = [
  { id: '1', name: "Service One" },
  { id: '2', name: "Service Two" },
  { id: '3', name: "Service Three" },
  { id: '4', name: "Service four" },
];

const hospitalList = [
  { id: '1', name: "Graspus graspus" },
  { id: '2', name: "Grus rubicundus" },
  { id: '3', name: "Speothos vanaticus" },
  { id: '4', name: "Charadrius tricollaris" },
  { id: '5', name: "Sciurus vulgaris" },
  { id: '6', name: "Ateles paniscus" },
  { id: '7', name: "Bucorvus leadbeateri" },
  { id: '8', name: "Bubulcus ibis" },
  { id: '9', name: "Physignathus cocincinus" },
  { id: '10', name: "Phoca vitulina" },
  { id: '11', name: "unavailable" },
  { id: '12', name: "Zenaida galapagoensis" },
  { id: '13', name: "Pseudalopex gymnocercus" },
  { id: '14', name: "Terathopius ecaudatus" },
  { id: '15', name: "Eumetopias jubatus" },
  { id: '16', name: "Callorhinus ursinus" },
  { id: '17', name: "Tamiasciurus hudsonicus" },
  { id: '18', name: "Dasyurus viverrinus" },
  { id: '19', name: "Madoqua kirkii" },
  { id: '20', name: "Hystrix cristata" },
  { id: '21', name: "Phalacrocorax niger" },
  { id: '22', name: "Neotis denhami" },
  { id: '23', name: "Conolophus subcristatus" },
  { id: '24', name: "Cynictis penicillata" },
  { id: '25', name: "Rhea americana" },
  { id: '26', name: "Lama pacos" },
  { id: '27', name: "Anitibyx armatus" },
  { id: '28', name: "Motacilla aguimp" },
  { id: '29', name: "Cereopsis novaehollandiae" },
];

interface Product{
  title: string,
  desc: string,
  images: string[],
  info: string,
  id: string,
  linkEnabled: boolean,
  buttonEnabled: boolean,
}

const product: Product = {
  title: 'Product Name 1',
  desc:'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  images:['/images/services/bed.png'],
  info:'Lorem ipsum dolor sit , some dummy text and other informations',
  id:'1',
  linkEnabled: false,
  buttonEnabled: true,
};
 

const Page: FC<PageProps> = ({ params }: { params: { id: string, type?: string } }) => {

  const searchParams = useSearchParams()
 
  const type = searchParams?.get('type') || 'booking';
  const id = searchParams?.get('id') || null;


  const [selected, setSelected] = useState<string | null>(type || 'booking');
  const[values, setValues] = useState({});


  interface InputProps {
    label: string;
    valueKey: string,
    placeholder: string,
    type?: string,
  }

  const TextInput: FC<InputProps> = ({ placeholder, type = 'text', valueKey, label }) => {

    return(
      <Input
        onChange={(val)=> setValues({ ...values, [valueKey]: val})}
        classNames={{ label: 'label', input: 'input', inputWrapper: 'inputWrapper' }}
        placeholder={placeholder}
        labelPlacement="outside"
        type={type}
        label={label}
    />
    )
  }


  const DropDownComponent: FC<DropDownProps> = ({ label, valueKey, searchable, options, placeholder }) => {

    return(
      <SearchableDropdown
        options={options}
        labelText={label}
        label={'name'}
        id={'id'}
        selectedVal={values[valueKey as keyof typeof values]}
        handleChange={(val) => setValues({...values, [valueKey]: val})}
        searchable={searchable}
        placeholder={placeholder}
      />
    )
  }

  const renderSummaryCard = (): JSX.Element => {
    return (
        <div className='summary-container shadow-md flex flex-col md:flex-row  px-10 py-8 mt-8'>
          <div className={`image-container flex-1 flex flex-col h-full`}>
             {selected != 'request' ? 
             ( <div className='title-section mb-4 flex flex-col'>
                <span className='service-title'>
                  {product?.title || ''}
                </span>
                <span className='service-desc '>
                  {product?.desc || ''}
                </span>
              </div>)
              :(
              <div className='title-section mb-4 flex flex-col'>
                <span className='service-title'>
                  {`Request Booking`}
                </span>
              </div>

              )
    }
              
              <Image src={'/images/services/bed.png'} alt='' width={100} height={100} className='w-5/6 h-auto self-center'/>

            </div>

            <div className={`desc-container flex flex-2 flex-col h-full ml-0 md:ml-6 ml-0 mt-6 md:mt-0 md:w-3/6 w-full relative`}>

              {/* <div className='service-container mb-4 flex flex-col'>
                <span className='service-title'>
                  {product?.title || ''}
                </span>
                <span className='service-desc '>
                  {product?.desc || ''}
                </span>
              </div> */}


              <div className='tabs-container'>

            <Tabs
              // aria-label="Options"
              fullWidth
              size="md"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={(val)=>setSelected(val as string | null)}
              className='tabs'
            >
            <Tab key="booking" title="Booking" className='tab' isDisabled={type=='request'}>
              <div className={`form-container flex flex-col h-full ml-0 ml-0 mt-6 md:mt-0 w-full`}>
                    <div className='flex flex-row mb-3'>
                      
                      <TextInput
                        valueKey={'firstName'}
                        placeholder="E.g. Ben"
                        label="First Name"
                      />
                      <div className='md:ml-2'/>

                      <TextInput
                        valueKey={'lastName'}
                        label="Last Name"
                        placeholder="E.g. Bob"
                      />
                    </div>

                    <div className='flex flex-row mb-3'>
                      <TextInput
                        valueKey={'email'}
                        type="email"
                        label="Email"
                        placeholder="you@example.com"
                      />
                      <div className='md:ml-2'/>
                      <TextInput
                        valueKey={'phone'}
                        type="tel"
                        placeholder='+44 1234567890'
                        label="Phone"
                      />
                    </div>

                    <div className='mb-2 relative'>
                      <DropDownComponent label="Hospital" valueKey="hospital" searchable={true} options={hospitalList} placeholder={'Select hospital'} />
                    </div>

                    <div className='flex flex-row mb-3'>
                      
                      <TextInput
                        valueKey='company'
                        type="text"
                        label="Company"
                        placeholder='Eg: Global prostate solution'
                      />
                      
                      <div className='md:ml-2'/>

                      <Input
                        onChange={(val)=> setValues({ ...values, firstName: val})}
                        classNames={{ label: 'label', input: 'input', inputWrapper: 'inputWrapper mb-2' }}
                        type="date"
                        label="Date"
                        labelPlacement="outside"
                        placeholder='dd/mm/yyyy'
                      />
                    </div>


                    <div className='flex flex-row mb-3'>
                      <TextInput
                        valueKey='pateintsCount'
                        type="number"
                        label="No. of patients"
                        placeholder="1"
                        />
                    </div>

                      <div className={`flex flex-row relative items-end w-full mt-8`}>
                        <SecondaryButton onClick={handleSubmit} coloured className='w-full self-end'>
                          {`Confirm`} 
                        </SecondaryButton>
                      
                      </div>
              </div>
            </Tab>

            <Tab key="request" title="Request Booking" className='tab'>

              <div className={`form-container flex flex-col h-full ml-0 ml-0 mt-6 md:mt-0 w-full`}>
                <div className='flex flex-row mb-3'>
                        
                  <TextInput
                    valueKey={'firstName'}
                    placeholder="E.g. Ben"
                    label="First Name"
                  />
                  <div className='md:ml-2'/>

                  <TextInput
                    valueKey={'lastName'}
                    label="Last Name"
                    placeholder="E.g. Bob"
                  />
                </div>

                <div className='flex flex-row mb-3'>
                  <TextInput
                    valueKey={'email'}
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                  />
                  <div className='md:ml-2'/>
                  <TextInput
                    valueKey={'phone'}
                    type="tel"
                    placeholder='+44 1234567890'
                    label="Phone"
                  />
                </div>

                <div className='mb-2 relative'>
                  <DropDownComponent label="Hospital" valueKey="hospital" searchable={true} options={hospitalList} placeholder={'Select hospital'} />
                </div>

                <div className='flex flex-row mb-3'>
                  
                  <TextInput
                    valueKey='company'
                    type="text"
                    label="Company"
                    placeholder='Eg: Global prostate solution'
                  />
                  
                  <div className='md:ml-2'/>

                  <Input
                    onChange={(val)=> setValues({ ...values, firstName: val})}
                    classNames={{ label: 'label', input: 'input', inputWrapper: 'inputWrapper mb-2' }}
                    type="date"
                    label="Date"
                    labelPlacement="outside"
                    placeholder='dd/mm/yyyy'
                  />
                </div>


                <div className='flex flex-row mb-3'>
                  <TextInput
                    valueKey='pateintsCount'
                    type="number"
                    label="No. of patients"
                    placeholder="1"
                    />
                </div>

            
                <div className='mb-2 relative'>
                  <DropDownComponent label="Services" valueKey="service" searchable={true} options={serviceOptions} placeholder={'Select service'} />
                </div>

                <div className={`flex flex-row relative items-end w-full mt-8`}>
                  <SecondaryButton onClick={handleSubmit} coloured className='w-full self-end'>
                    {`Confirm`} 
                    {/* <img src='/icons/arrow-white.svg' /> */}
                  </SecondaryButton>
                
                </div>
              </div>
            </Tab>

          </Tabs>

              </div>



            </div>
        </div>
    );
  };

  const handleSubmit = () =>{
    console.log('Values', values);

  }

  return (
    <main>
      <Section className='intro' maxContent={true}>
        {renderSummaryCard()}
      </Section>
      <Footer/>

    </main>
  );
}


export default Page;
