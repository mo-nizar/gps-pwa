"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@images/gps-logo-white.png";
import CustomDropdown from "@components/CustomDropdown";
import { PrimaryButton } from "@/components/CustomButtons";
import "@styles/layouts/header.scss";
import api from "@/api";

interface HeaderOption {
  type: "link" | "dropdown" | "button";
  label: string;
  link: string;
  optionsList: Array<{ label: string; key: string; link: string }> | null;
}

const Header: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([
    {
      type: "dropdown",
      label: "Sales",
      link: "/sales",
      optionsList: [],
    },
    {
      type: "dropdown",
      label: "Services",
      link: "/services",
      optionsList: [],
    },
    {
      type: "link",
      label: "Support",
      link: "/support",
      optionsList: null,
    },
    {
      type: "button",
      label: "Request a Call",
      link: "/call",
      optionsList: null,
    },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/header");
      const { data } = res;
      setData(data?.data);
      console.log(data?.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header>
      <a href={"/"}>
        <Image src={Logo} width={150} alt={""} />
      </a>
      <nav>
        <ul>
          {data?.length &&
            data?.map((obj, index) => {
              switch (obj.type) {
                case "link":
                  return (
                    <li key={index}>
                      <a href={obj.link}>{obj.label}</a>
                    </li>
                  );
                case "dropdown":
                  return (
                    <li key={index}>
                      <CustomDropdown
                        title={obj.label}
                        viewMore={true}
                        link={obj?.link || "#"}
                        optionsList={obj.optionsList as any}
                      />
                    </li>
                  );
                case "button":
                  return (
                    <li key={index}>
                      <PrimaryButton label={obj.label} />
                    </li>
                  );
                default:
                  return null;
              }
            })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
