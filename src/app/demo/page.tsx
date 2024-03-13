// Please note: The ServiceRefItem type may need to be adjusted based on your exact use case.
"use client";

import { useEffect, FC, useState } from 'react';
import Section from "@/layouts/Section";
import "@styles/demo.scss";
import { useSearchParams } from "next/navigation";
import api from "@/api";
import { Loader } from '@/components/Loader';
import { SubscribeForm } from '@/components/SubscribeForm';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { COMMON_ERROR } from '@/constants';

interface PageProps {}

interface Services {
  title: string;
  desc: string;
  image: string;
  info: string;
  id: string;
  linkEnabled: boolean;
  buttonEnabled: boolean;
  description?: { title: string; info: string }[];
}


const Page: FC<PageProps> = () => {
  const searchParams = useSearchParams();

  const id = searchParams?.get("id") || null;

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    hint: "Stepper Stabilizer",
    title: "Stepper Stabilizer",
    desc: "It has single-point locking and full-blown stepping options that enable the positioning of ultrasound managing probes used during transperneal prostate examination with a template needle guide.",
    image:  '/images/stepper.svg',
    product: {
        hint: 'stepper stabilizer',
        title: "Perfect workstation where a stable platform is required.",
        info: "Perfect workstation where a stable platform is required. Stable platform ensures seamless workflow for precise prostate mapping",
        image: '/images/stepper-stabilizer.svg',
        description: [
          {
            "title": "Single-point locking",
            "info": "Single-point locking mechanism to rapidly and easily lock the stabilizer position without transducer migration."
          },
          {
            "title": "Rolls",
            "info": "Rolls into position without workflow interference."
          },
          {
            "title": "Flexibility",
            "info": "Flexibility and accurate positioning are guaranteed."
          },
          {
            "title": "Single-person height",
            "info": "Single-person height adjustment during the procedure."
          },
          {
            "title": "3-Year Manufacturer Guarantee",
            "info": "3-Year Manufacturer Guarantee"
          }
        ],

        features:[
          {
            "title": "Fiducial Marker Placement",
            "icon": "/icons/key_1.svg"
          },
          {
            "title": "Mapping Biopsy",
            "icon": "/icons/key_2.svg"
          },
          {
            "title": "Saturation Biopsy",
            "icon": "/icons/key_3.svg"
          },
          {
            "title": "Targeted Biopsy",
            "icon": "/icons/key_4.svg"
          },
          {
            "title": "AND other template-guided procedures.",
            "icon": "/icons/key_5.svg"
          }
        ],

        package:{
          hint: 'stepper stabilizer',
          title: "Free Demonstration",
          info: "We are proud to offer a complimentary demonstration of our Stepper Stabilizer product to our valued customers. This demonstration is a great opportunity to see the product in action and experience the benefits of our high-quality and versatile equipment first-hand. ",
          image: '/images/package.svg',
          keysPoints: [
            {
              title: "Schedule a Convenient Time with Our Experts",
              info: "Our team of experts will be on hand to provide you with all the information you need and answer any questions you may have.",
              icon:'/icons/clock.svg',
            },
            {
              title: "Expert System Specialist Available",
              info: "Our team of expert system professionals is available around the clock to provide assistance and answer any questions you may have.",
              icon:'/icons/corona.svg',

            },
            {
              title: "Available 24x7",
              info: "Our team of expert system professionals is available around the clock to provide assistance and answer any questions you may have.",
              icon:'/icons/credit-card.svg',

            },
          ],
        },

        "linkEnabled": false,
        "buttonEnabled": true,
      },
    }
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/sales/demo", {
        params: {id},
      });
      const { data } = res;
      setData(data?.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const { product } = data;


  const renderServices = (): JSX.Element => {
    return (
      <div>
        <div className={`service-container flex flex-col md:flex-row justify-between md:mt-24 my-6`}>
          <div className={`image-container flex h-full w-3/6 md:justify-start self-center`}>
            <img src={data.image} alt="" className="prodImage" />
          </div>

          <div className={`desc-container flex flex-col h-full ml-0 md:ml-6 md:w-3/6 w-full relative`}>
            <div className={`form-container flex self-center md:ml-12 md:p-2`}>
              <SubscribeForm
                title={'Book a demo'}
                desc={''}
                transparent
                fullWidth
                isDemo
              />

            </div>

          </div>
        </div>
      </div>
    );
  };

  return (
    <main>

      {loading
      ? <Loader/>
      :
      (<>
          <Section className="intro section" maxContent={true}>
            <span className="section-hint self-center">{data.hint || ""}</span>
            <span className="title self-center">{data.title || ""}</span>
            <span className="desc self-center">{data.desc}</span>
            {renderServices()}
          </Section>
  
          <Section className='feature-section section flex flex-row' maxContent={true}>
            <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-4 my-12">
              {product?.features.map((item, idx)=>(
                <div className='feature-container flex flex-1 flex-col justify-center items-center' key={idx}>
                  <Image className='feature-icon' alt='feature-title' width={50} height={50} src={item.icon} />
                  <span className='feature-title my-2 text-center'>{item.title}</span>                
                </div>
              ))}
            </div>
          </Section>
  
          <Section className='product-section section flex flex-row' maxContent={true}>
  
              <div  className='prod-intro flex flex-row flex-1 justify-center items-center'>
                <div className='text-container flex flex-1 prod-intro flex flex-col'>
                
                  <span className='prod-hint'>{product.hint}</span>
                  <span className='prod-title'>{product.title}</span>
                  <span className='prod-desc'>{product.info}</span>
  
                </div>
                <div className='image-container flex justify-center items-center flex-1'>
                  <Image src={product.image} alt='prod-image' className='prod-image' width={300} height={300}/>
                </div>
              </div>
  
  
            <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-4 my-12">
              {product?.description.map((item, idx)=>(
                <div className='description-container flex flex-1 flex-col justify-center items-center' key={idx}>
                  <span className='description-index my-2 text-center'>{`0${idx+1}.`}</span>                
                  <span className='description-title my-2 text-center'>{item.title}</span>                
  
                  <span className='description-info my-2 text-center'>{item.info}</span>                
                </div>
              ))}
            </div>
          </Section>
  
          <Section className='package-section  section flex flex-row' maxContent={true}>
  
            <div  className='prod-intro flex flex-row flex-1 justify-center items-center'>
              <div className='text-container flex flex-1 prod-intro flex flex-col'>
              
                <span className='prod-hint'>{product?.package.hint}</span>
                <span className='prod-title'>{product?.package.title}</span>
  
              </div>
  
  
              <div className='flex justify-center items-center flex-1'>
                <span className='prod-desc'>{product?.package.info}</span>
              </div>



            </div>
  
  
            <div className='image-container flex flex-row  my-12'>
              <Image src={product?.package.image} alt='package-image' className='package-image' width={300} height={300}/>
  
              <div className="grid grid-container sm:grid-cols-1 md:grid-cols-5 gap-6 absolute self-center">
  
              {product?.package.keysPoints.map((item, idx)=>(
                       <div className="flip-card keypoints-container flex flex-1 flex-row justify-center items-center" key={idx}>
                       <div className="flip-card-inner">
                         <div className="flip-card-front">
                            
                            <div className='image-container'>
                              <img className='icon' alt='feature-title' src={item.icon} />
                            </div>
            
                            <div className='text-container ml-4'>
                              <span className='title my-2 text-center'>{item.title}</span>                
                            </div>
                         </div>

                         <div className="flip-card-back">
                          <span className='info my-2 text-center'>{item.info}</span>     

                         </div>
                       </div>
                     </div>
              ))}
              </div>
            </div>
          </Section>
  
  
          <Section className='feature-section section flex flex-row' maxContent={true}>
            <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-4 my-12">

            </div>
          </Section>
  
        </>
      )
      }
    </main>
  );
};

export default Page;
