"use client";
import React, { useEffect, useState } from "react";
import Section from "@layouts/Section";
import { Link } from "@nextui-org/react";
import { Poppins } from "next/font/google";
import { SecondaryButton } from "@components/CustomButtons";
import "@styles/home.scss";
import Partners from "@/components/Partners";
import { useRouter } from "next/navigation";
import api from "@/api";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "100",
});

const App: React.FC = () => {
  const [hovered, setIsHovered] = useState<null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const [state, setState] = useState({
    productsList: [],
    sections: [],
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

  const { sections } = state;

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
              <img src="/icons/long-arrow-right.svg" />
            </div>
          </SecondaryButton>
        </div>
      </Section>

      <Section backgroundOverlay={true}>
        <div className="service">
          <div className="content-container">
            <span className="title">{"NHS Connect"}</span>
            <div className="cards-container">
              <div className="cards-div">
                <Link className={`card ${hovered == 1 ? "active-card" : ""}`}>
                  <span className="title">{"NHS"}</span>
                  <span className="desc">
                    {
                      "By leveraging our 12-patient list, NHS can slash lengthy biopsy wait times, ensuring swifter diagnosis and treatment."
                    }
                  </span>
                </Link>

                <Link className={`card ${hovered == 2 ? "active-card" : ""}`}>
                  <span className="title">{"Private Healthcare"}</span>
                  <span className="desc">
                    {
                      "Private hospitals can fill their schedules with consistent NHS referrals through NHS Connect, putting their expertise to work for a larger population and finding fulfilment in tackling backlogs while boosting their bottom line."
                    }
                  </span>
                </Link>
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
                      className="nhs-logo"
                      src="/images/partners/nhs-logo.png"
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
                      className="nhs-logo"
                      src="/images/partners/nhs-logo.png"
                    />
                  </Link>
                  <Link
                    className="link-text link-three"
                    onMouseEnter={() => setIsHovered(3)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    {/* {"NHS\nDetails 3"} */}
                    <img
                      className="nhs-logo"
                      src="/images/partners/nhs-logo.png"
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
                <Link className={`card ${hovered == 4 ? "active-card" : ""}`}>
                  <span className="title">{"GPS"}</span>
                  <span className="desc">
                    {
                      "We bridge the gap between NHS and private care hospitals, expediting prostate biopsies and slashing waiting lists for faster diagnoses and healthier futures."
                    }
                  </span>
                </Link>

                <Link className={`card ${hovered == 3 ? "active-card" : ""}`}>
                  <span className="title">{"Patients"}</span>
                  <span className="desc">
                    {
                      "NHS Connect guides the patient to faster prostate biopsy and diagnosis in private hospitals, all while easing your mind with streamlined support."
                    }
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section backgroundOverlay={true}>
        <div className="nhs">
          <div className="content-container">
            <div className="textWrapper">
              <>
                <span className="title">{sections[2]?.title}</span>

                <span className="description">{sections[2]?.description}</span>
              </>
              <div className="button-container">
                <SecondaryButton coloured>
                  <div className="buttonContents">
                    <p>{"BOOK DEMO"}</p>
                    <img src="/icons/arrow-white.svg" />
                  </div>
                </SecondaryButton>
              </div>
            </div>

            <div className="imagesWrapper">
              {sections &&
                sections[2]?.cards?.map((item, idx) => (
                  <div key={idx} className="imageContainer">
                    <div className="textContainer">
                      <p className="typography">{item?.title || ""}</p>
                      <p className="desc">{item?.desc || ""}</p>
                      <Link className="link">
                        {item?.buttonText || ""}{" "}
                        <img src="/icons/link-arrow.svg" />
                      </Link>
                    </div>
                    <img src={item.imageUrl} alt={""} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        title={"Join Our Growing Hospital List"}
        className="partnerSection border-1"
        maxContent
      >
        <Partners partners={(sections && sections[4]?.banners) || []} />
      </Section>
    </>
  );

  return (
    <main className={`main home ${poppins.className}`}>
      {loading && sections?.length == 0 ? (
        <div className="flex absolute self-center">Loding.... </div>
      ) : (
        renderSections()
      )}
    </main>
  );
};

export default App;
