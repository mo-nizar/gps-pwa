// Please note: The ServiceRefItem type may need to be adjusted based on your exact use case.
"use client";

import { useRef, useEffect, FC, useState } from 'react';
import Section from "@/layouts/Section";
import "@styles/services.scss";
import { SecondaryButton } from "@/components/CustomButtons";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/api";
import { Loader } from '@/components/Loader';

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

  const id = searchParams?.get("id") || null;

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    hint: "Services page",
    title: "Our Services",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
    additionalInfo: [],
    services: [
      {
        "id": 1,
        "title": "Stepper-grid guided transperineal biopsy",
        "description": [
            {
                "title": "Ultrasound machine",
                "info": "Latest ultrasound for accurate imaging"
            },
            {
                "title": "Stepper stabiliser",
                "info": "Our in-house device suitable for all template guided procedures"
            },
            {
                "title": "Grids and consumables",
                "info": "Enter your Postal code for Delivery Availability"
            },
            {
                "title": "System specialist",
                "info": "Free 30 days Delivery Return"
            },
            {
                "title": "One-patient list available",
                "info": "Flexible rental options available from 1 patient list to 12 patients morning list"
            }
        ],
        "info": "[   \"Latest ultrasound for accurate imaging\",   \"Our in-house device suitable for all template guided procedures\",   \"Enter your Postal code for Delivery Availability\",   \"Free 30 days Delivery Return\",   \"Flexible rental options available from 1 patient list to 12 patients morning list\" ]",
        "isEnabled": 1,
        "image": "http://localhost:3001/1/service_3.png",
        "linkEnabled": false,
        "buttonEnabled": true
    }
    ],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/sales", {
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

  const { services } = data;


  const renderServices = (item: Services, idx: number): JSX.Element => {
    let evenItem = idx % 2 === 0;

    return (
      <div key={idx}>
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
            <span className="service-title">{item?.title || ""}</span>

            <div className="desc-wrapper">
              {item?.description?.map((obj: any, idx: number) => (
                <div key={idx} className="desc-sec flex flex-row mt-8">
                  <img
                    src="/icons/checkpoint.svg"
                    className="mr-2 markIcon"
                  />
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
              {item?.linkEnabled && (
                <Link href={`/summary?id=${item?.id}`}>
                  <span className="learn-more">
                    {"Learn More"}
                    <img src="/icons/arrow-gray.svg" />
                  </span>
                </Link>
              )}

              {item?.buttonEnabled && (
                <SecondaryButton
                  onClick={() => router.push(`/summary?id=${item?.id}`)}
                  coloured
                  className="w-full md:w-auto self-end"
                >
                  {`BOOK NOW`} <img src="/icons/arrow-white.svg" />
                </SecondaryButton>
              )}
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
