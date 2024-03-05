"use client";
import Section from "@/layouts/Section";
import React, { FC, useContext, useEffect, useState } from "react";
import "@styles/rentals.scss";
import Image from "next/image";
import { SecondaryButton } from "@/components/CustomButtons";
import { Footer } from "@/layouts/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/api";

interface PageProps {}

interface additionalInfo {
  title: string;
  desc: string;
  imageUrl: string;
}

interface Services {
  title: string;
  desc: string;
  images: string[];
  info: string;
  id: string;
  linkEnabled: boolean;
  buttonEnabled: boolean;
}

interface Data {
  hint?: string;
  title: string;
  desc?: string;
  services: Services[];
  additionalInfo: additionalInfo[];
}

const Page: FC<PageProps> = () => {
  const router = useRouter();

  const { additionalInfo, services } = data;

  const style = {
    descContainer: (evenItem: boolean) => ({
      marginRight: evenItem ? 0 : 50,
      marginLeft: evenItem ? 50 : 0,
    }),
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/services", {
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

  const [data, setData] = useState({
    hint: "Services page",
    title: "Our Rentals",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
    additionalInfo: [],
    services: [],
  });

  const renderServices = (item: Services, idx: number): JSX.Element => {
    let evenItem = idx % 2 === 0;

    // const user = useContext(UserContext);

    // console.log(user);

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
            <Image
              src={item.image}
              alt=""
              width={100}
              height={100}
              className="w-auto h-full"
            />
          </div>

          <div
            className={`desc-container flex flex-col h-full ml-0 ${
              evenItem ? "md:ml-6" : "md:mr-6"
            } md:w-3/6 w-full relative`}
          >
            {/* <span className='section-hint self-start'>{data.hint || ''}</span> */}

            <span className="service-title">{item?.title || ""}</span>
            <span className="service-desc ">{item?.desc || ""}</span>

            <div className="line border-1 w-full lg:my-10 my-8 " />

            <div className="border-1 w-full flex flex-col rounded-2xl	p-4">
              {additionalInfo &&
                additionalInfo?.map((info, _idx) => (
                  <div className="additional-info" key={_idx}>
                    <div className="w-full flex flex-row mb-2">
                      <img
                        src={info?.imageUrl}
                        alt="shippiong icon"
                        className="w-6 mr-4"
                      />
                      <div className="w-full flex flex-col mb-2">
                        <span className="title">
                          {"Free Delivery"}
                          {info?.title || ""}
                        </span>
                        <span className="section-hint self-start">
                          {info?.description || ""}
                        </span>
                      </div>
                    </div>
                    {_idx + 1 !== additionalInfo?.length && (
                      <div className="border-1 w-full my-4 " />
                    )}
                  </div>
                ))}
            </div>

            <div className="line border-1 w-full my-10 " />

            <span className="service-info">{item?.info || ""}</span>

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
    </main>
  );
};

export default Page;
