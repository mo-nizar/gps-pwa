"use client";
import React, { useEffect, useState } from "react";
import Section from "@layouts/Section";
import { Link } from "@nextui-org/react";
import { SecondaryButton } from "@components/CustomButtons";
import "@styles/home.scss";
import Partners from "@/components/Partners";
import { useRouter } from "next/navigation";
import api from "@/api";
import { Loader } from "./components/Loader";
import Carousel from "./components/Carousel";
import ImageCarousel from "./components/ImageCarousel";

interface Card {
  title: string;
  desc: string;
  buttonText: string;
  imageUrl: string;
  link: string,
}

const App: React.FC = () => {
  const [hovered, setIsHovered] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const [state, setState] = useState({
    productsList: [] as any[], // Change type accordingly
    sections: [] as any[], // Change type accordingly
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/home", {
        params: {},
      });
      const { data } = res;
      setState(data?.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop= () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optionally, you can use smooth scrolling effect
    });
  }

  const { sections } = state;

  useEffect(()=>{
    if(sections.length){
      scrollToTop();
    }
  },[sections])
  
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/summary?type=request");
  };

  const renderSections = () => (
    <>
      <Section backgroundOverlay={true} imageUrl={sections[0]?.background}>
        <div className="landing">
          <h1 className="tagline">{sections[0]?.title}</h1>
          <span className="description">{sections[0]?.description}</span>
          <SecondaryButton onClick={handleButtonClick}>
            <div className="buttonContents">
              <p>{"BOOK NOW"}</p>
                <img src="/icons/long-arrow-right.svg" alt="arrow" />
              </div>
          </SecondaryButton>
        </div>
      </Section>

      <Section backgroundOverlay={true} maxContent>
        <div className="nhs">
          <div className="content-container">
            <div className="textWrapper">
              <>
                <span className="title">{sections[2]?.title}</span>
                <span className="description">{sections[2]?.description}</span>
                
                <div className="infoSection" >

                  {sections[2]?.info?.map((item: string, idx: number)=>(
                    <div className="infoWrapper flex flex-row" key={idx} >
                      <img src={'/icons/grey-check.svg'} alt='mark' width={15} height={15}/>
                      <span className="description  info flex flex-row items-center">{item}</span>
                    </div>
                  ))}
                </div>

              </>
              <div className="button-container">
                <SecondaryButton coloured onClick={() => router.push(`/demo`)}>
                  <div className="buttonContents">
                    <p>{"BOOK FREE DEMO"}</p>
                    <img src="/icons/arrow-white.svg" alt="arrow" />
                  </div>
                </SecondaryButton>
              </div>
            </div>

            <div className="imagesWrapper">
              {sections &&
                sections[2]?.cards?.map((item: Card, idx:number) => (
                  <div key={idx} className="imageContainer">
                    <Link className="textContainer" onClick={() => router.push(item.link)}>
                      <p className="typography">{item?.title || ""}</p>
                      <p className="desc">{item?.desc || ""}</p>
                      <Link className="link" onClick={() => router.push(item.link)}>
                        {item?.buttonText || ""}{" "}
                        <img src="/icons/link-arrow.svg" />
                      </Link>
                    </Link>
                    <img src={item.imageUrl} alt={""} />
                  </div>
                ))}
            </div>

            <div className="button-container mob-button-container">
              <SecondaryButton coloured onClick={() => router.push(`/demo`)}>
                <div className="buttonContents">
                  <p>{"BOOK FREE DEMO"}</p>
                  <img src="/icons/arrow-white.svg" alt="arrow" />
                </div>
              </SecondaryButton>
            </div>

          </div>
        </div>
      </Section>

      <Section backgroundOverlay={true}>
        <div className="service">
          <div className="content-container">
            <span className="title">{sections[3]?.title}</span>

            <div className="cards-container">
              <div className="cards-div">
                <a className={`card ${hovered == 1 ? "active-card" : ""} desktop-card`}>
                  <span className="title">{"NHS"}</span>
                  <span className="desc">
                    {
                      "By leveraging our 12-patient list, NHS can slash lengthy biopsy wait times, ensuring swifter diagnosis and treatment."
                    }
                  </span>
                </a>

                <a className={`card ${hovered == 2 ? "active-card" : ""} desktop-card`}>
                  <span className="title">{"Private Healthcare"}</span>
                  <span className="desc">
                    {
                      "Private hospitals can fill their schedules with consistent NHS referrals through NHS Connect, putting their expertise to work for a larger population and finding fulfilment in tackling backlogs while boosting their bottom line."
                    }
                  </span>
                </a>
              </div>

              <div className="images-div mob-div">
                <img className="nhs-trio" src="/images/nhs-trio.svg" />

                <div className="logo-container">
                  <Link
                    className="link-text link-one"
                    onMouseEnter={() => setIsHovered(1)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <img
                      className="nhs-logo trio-logos"
                      src="/images/home_trio/nhs-trio.svg"
                    />

                    {/* {"NHS"} */}
                  </Link>
                  <Link
                    className="link-text link-two"
                    onMouseEnter={() => setIsHovered(2)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    {/* {"NHS\nDetails 2"} */}
                    <img
                      className="private-health trio-logos"
                      src="/images/home_trio/private-trio.svg"
                    />
                  </Link>
                  <Link
                    className="link-text link-three"
                    onMouseEnter={() => setIsHovered(3)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    {/* {"NHS\nDetails 3"} */}
                    <img
                      className="public-health trio-logos"
                      src="/images/home_trio/public-trio.svg"
                    />
                  </Link>
                  <Link
                    className="link-four"
                    onMouseEnter={() => setIsHovered(4)}
                    onMouseLeave={() => setIsHovered(null)}
                  />
                  {/* <img className='white-logo' src='/images/white-logo.svg' /></Link> */}
                </div>
              </div>

              <div className="cards-div">
                <a className={`card ${hovered == 4 ? "active-card" : ""} desktop-card`}>
                  <span className="title">{"GPS"}</span>
                  <span className="desc">
                    {
                      "We bridge the gap between NHS and private care hospitals, expediting prostate biopsies and slashing waiting lists for faster diagnoses and healthier futures."
                    }
                  </span>
                </a>

                <a className={`card ${hovered == 3 ? "active-card" : ""} desktop-card`}>
                  <span className="title">{"Patients"}</span>
                  <span className="desc">
                    {
                      "NHS Connect guides the patient to faster prostate biopsy and diagnosis in private hospitals, all while easing your mind with streamlined support."
                    }
                  </span>
                </a>
              </div>
            </div>

            <div className="mobile-card">
              <Carousel cards={sections[3]?.cards ?? []}/>
            </div>

          </div>
        </div>
      </Section>

      <Section
        title={"Join Our Growing Hospital List"}
        className="partnerSection"
        maxContent
      >
        
        <div className="web-partners">
          <Partners partners={(sections && sections[4]?.banners) || []} />
        </div>

        <div className="mobile-partners">
          <ImageCarousel images={sections[4]?.banners ?? []}/>
        </div>
      </Section>
    </>
  );

  return (
    <main className={`main home`}>
      {loading ? (
        <Loader/>
      ) : (
        renderSections()
      )}
    </main>
  );
};

export default App;
