"use client";
import Section from "@/layouts/Section";
import React, { FC, useEffect, useRef, useState } from "react";
import "@styles/services.scss";
import { SecondaryButton } from "@/components/CustomButtons";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/api";
import { Loader } from "@/components/Loader";
import { Button } from "@nextui-org/react";

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


interface ServiceRefItem {
  [key: string]: HTMLDivElement | null;
}


const Page: FC<PageProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const key: number = Number(searchParams?.get("key"));

  const servicesRef = useRef<ServiceRefItem>({});

  useEffect(() => {
    if (key !== null && servicesRef?.current[key]) {
      executeScroll();
    }
  }, [servicesRef?.current[key]]);

  const executeScroll = () => {
    if (key !== null && servicesRef?.current && servicesRef.current[key]) {
      const targetElement = servicesRef.current[key];

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    hint: "Sales page",
    title: "Our Sales",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
    additionalInfo: [],
    services: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/sales", {
        params: {},
      });
      const { data } = res;
      setData(data?.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const { services } = data;

  const handleNavigation = (path: string) => {
    router.push(path);
  };


  const renderServices = (item: Services, idx: number): JSX.Element => {
    let evenItem = idx % 2 === 0;
    if (loading) {
      return <></>;
    }

    return (
      <div key={idx} ref={(el) => (servicesRef.current[item.id] = el)}>
        <div
          className={`service-container flex flex-col ${
            evenItem ? "md:flex-row" : "md:flex-row-reverse"
          } justify-between md:my-24 my-6`}
        >
          <div
            className={`image-container flex h-full w-3/6 ${
              evenItem ? "md:justify-start" : "md:justify-end"
            }`}
          >
            <img src={item.image} alt="" className="prodImage" />
          </div>

          <div
            className={`desc-container flex flex-col h-full ml-0 ${
              evenItem ? "md:ml-6" : "md:mr-6"
            } md:w-3/6 w-full relative`}
          >
            {/* <span className='section-hint self-start'>{data.hint || ''}</span> */}

            <span className="service-title">{item?.title || ""}</span>

            <div className="desc-wrapper">
              {item?.description?.map((obj: any, idx: number) => (
                <div key={idx} className="desc-sec flex flex-row mt-8">
                  <img src="/icons/checkpoint.svg" className="mr-2" />
                  <div className="desc-sec flex flex-col">
                    <span className="desc-title">{obj?.title || ""}</span>
                    <span className="desc-info">{obj?.info || ""}</span>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`flex flex-row ${
                item.linkEnabled && item?.buttonEnabled
                  ? "justify-between"
                  : "justify-end"
              } relative items-end w-full mt-8`}
            >
              {item?.linkEnabled ? (
                <button onClick={()=>handleNavigation(`/demo`)}>
                  <span className="learn-more">
                    {"Learn More"}
                    <img src="/icons/arrow-gray.svg" />
                  </span>
                </button>
              )
              :null}

              {item?.buttonEnabled ? (
                <SecondaryButton
                  onClick={() => router.push(`/demo`)}
                  coloured
                  className="w-full md:w-auto self-end"
                >
                  {`BOOK NOW`} <img src="/icons/arrow-white.svg" />
                </SecondaryButton>
              )
              : null}
            </div>
          </div>
        </div>

        {idx + 1 !== services?.length && <div className="border-1 w-full" />}
      </div>
    );
  };

  return (
    <main>
      <Section className="intro" maxContent={true}>
        <span className="section-hint self-center">{data.hint || ""}</span>
        <span className="title self-center">{data.title || ""}</span>
        <span className="desc self-center">{data.desc}</span>
        {services && services?.map(renderServices)}
      </Section>
      {loading && (<Loader/>)}

    </main>
  );
};

export default Page;
