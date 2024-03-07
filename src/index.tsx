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

interface Card {
  title: string;
  desc: string;
  buttonText: string;
  imageUrl: string;
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
              <img src="/icons/long-arrow-right.svg" alt="arrow" />
            </div>
          </SecondaryButton>
        </div>
      </Section>

      <Section backgroundOverlay={true}>
        <div className="service">
          <div className="content-container">
            <span className="title">{"NHS Connect"}</span>
            <div className="cards-container">
              {/* ... (rest of the code) */}
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
                    <img src="/icons/arrow-white.svg" alt="arrow" />
                  </div>
                </SecondaryButton>
              </div>
            </div>

            <div className="imagesWrapper">
              {sections &&
                sections[2]?.cards?.map((item: Card, idx:number) => (
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
