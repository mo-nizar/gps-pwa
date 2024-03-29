"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@images/gps-logo-white.png";
import CustomDropdown from "@components/CustomDropdown";
import { PrimaryButton } from "@/components/CustomButtons";
import "@styles/layouts/header.scss";
import api from "@/api";
import { usePathname, useRouter } from "next/navigation";
import CustomDrawer from "@/components/CustomDrawer";

interface HeaderOption {
  type: "link" | "dropdown" | "button";
  label: string;
  link: string;
  id?: string;
  optionsList: Array<{ label: string; key: string; link: string, id: string }>;
}

const Header: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const router = useRouter();
  const isDashboardPage = usePathname().includes('admin');
  const [data, setData] = useState<HeaderOption[]>([
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
      type: "button",
      label: "Request a Call",
      link: "/call",
      optionsList: [],
    },
  ]);

  useEffect(() => {
    fetchData();
  }, [count]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/header");
      const { data } = res;
      // Transform data to match the structure of HeaderOption[]
      const transformedData: HeaderOption[] = data?.data.map((item: any) => ({
        type: item.type,
        label: item.label,
        link: item.link,
        optionsList: item.optionsList,
      }));
      setData(transformedData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  }

  if (isDashboardPage) {
    return null;
  }

  return (
    <header>
      <div className="md:hidden"> 
        <CustomDrawer options={data} />
      </div>
      <button onClick={()=> router.push('/')}>
        <Image src={Logo} width={150} alt={""} />
      </button>
      <nav>
        <ul>
          {data?.length &&
            data?.map((obj, index) => {
              switch (obj.type) {
                case "link":
                  return (
                    <li key={index}>
                      <button onClick={()=> router.push(obj.link)}>{obj.label}</button>
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
                      <PrimaryButton label={obj.label} onClick={scrollToBottom}/>
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
