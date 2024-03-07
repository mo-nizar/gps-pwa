
"use client";

import React, { FC, memo, useEffect, useState } from "react";
import "@styles/summary.scss";
import { SecondaryButton } from "@/components/CustomButtons";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/api";
import GooglePlaces from "@/components/GooglePlaces";
import Section from "@/layouts/Section";
import SearchableDropdown from "@/components/SearchableDropdown";
import { Input, Tab, Tabs } from "@nextui-org/react";
import { Loader } from "@/components/Loader";

interface PageProps {
  params: { id: string; type?: string };
}

interface Option {
  [key: string]: string;
}


interface DropDownProps {
  label: string;
  searchable: boolean;
  valueKey: string;
  options: Option[];
  placeholder: string;
}

const hospitalList = [
  { id: "1", name: "Graspus graspus" },
  { id: "2", name: "Grus rubicundus" },
  { id: "3", name: "Speothos vanaticus" },
  { id: "4", name: "Charadrius tricollaris" },
  { id: "5", name: "Sciurus vulgaris" },
  { id: "6", name: "Ateles paniscus" },
  { id: "7", name: "Bucorvus leadbeateri" },
  { id: "8", name: "Bubulcus ibis" },
  { id: "9", name: "Physignathus cocincinus" },
  { id: "10", name: "Phoca vitulina" },
  { id: "11", name: "unavailable" },
  { id: "12", name: "Zenaida galapagoensis" },
  { id: "13", name: "Pseudalopex gymnocercus" },
  { id: "14", name: "Terathopius ecaudatus" },
  { id: "15", name: "Eumetopias jubatus" },
  { id: "16", name: "Callorhinus ursinus" },
  { id: "17", name: "Tamiasciurus hudsonicus" },
  { id: "18", name: "Dasyurus viverrinus" },
  { id: "19", name: "Madoqua kirkii" },
  { id: "20", name: "Hystrix cristata" },
  { id: "21", name: "Phalacrocorax niger" },
  { id: "22", name: "Neotis denhami" },
  { id: "23", name: "Conolophus subcristatus" },
  { id: "24", name: "Cynictis penicillata" },
  { id: "25", name: "Rhea americana" },
  { id: "26", name: "Lama pacos" },
  { id: "27", name: "Anitibyx armatus" },
  { id: "28", name: "Motacilla aguimp" },
  { id: "29", name: "Cereopsis novaehollandiae" },
];

const Page: FC<PageProps> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const type = searchParams?.get("type") || "booking";
  const id = searchParams?.get("id") || null;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({});
  const [selected, setSelected] = useState<string | null>(type || "booking");
  const [values, setValues] = useState<{ [key: string]: number | string}>({ id: Number(id) });
  const [isSuccess, setBookingSuccess] = useState<boolean | undefined>(undefined);
  const [activeServices, setActiveServices] = useState<Option[]>([]);

  useEffect(() => {
    fetchData();
  }, [id, selected]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (selected === 'booking' && Object.keys(data).length === 0) {
        const res = await api.get("/services/summary", {
          params: { id },
        });
        const { data } = res;
        setData(data?.data);
      } else if (activeServices.length === 0) {
        const res = await api.get("/services/list", {
          params: { id },
        });
        const { data } = res;
        setActiveServices(data?.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };  

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await api.post("/services/summary", null, {
        params: {
          id,
          ...values,
        },
      });
      const { data } = res;
      setBookingSuccess(data?.data?.success);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const setDropownValues = (val: string, valueKey: string): void => {
    setValues({ ...values, [valueKey]: val });
  };
  
  const DropDownComponent: FC<DropDownProps> = ({
    label,
    valueKey,
    searchable,
    options,
    placeholder,
  }) => {
    return (
      <SearchableDropdown
        options={options}
        labelText={label}
        label={"label"}
        id={"id"}
        selectedVal={values[valueKey]}
        handleInputChange={(val) => setDropownValues(val ?? "" , valueKey)}
        searchable={searchable}
        placeholder={placeholder}
      />
    );
  };

  return (
    <main>
      <Section className="intro" maxContent={true}>
        <div className="summary-container shadow-md flex flex-col md:flex-row  px-10 py-8 mt-8">
          <div className={`image-container flex-1 flex flex-col h-full`}>
            {selected === "booking" ? (
              <div className="title-section mb-4 flex flex-col">
                <span className="service-title">{data?.title || ""}</span>
                <span className="service-desc ">{data?.desc || ""}</span>
              </div>
            ) : (
              <div className="title-section mb-4 flex flex-col">
                <span className="service-title">{`Request Booking`}</span>
              </div>
            )}

            {selected === "booking" ? (
              <img src={data.image} alt="" className="w-5/6 h-auto self-center" />
            ) : (
              <img
                src={"/images/first-aid.jpeg"}
                alt=""
                className="requestBookingImg w-5/6 h-auto self-center"
              />
            )}
          </div>

          <div
            className={`desc-container flex flex-2 flex-col h-full ml-0 md:ml-6 ml-0 mt-6 md:mt-0 md:w-3/6 w-full relative`}
          >
            <div className="tabs-container flex flex-column">
              <Tabs
                fullWidth
                size="md"
                selectedKey={selected}
                onSelectionChange={(val) => setSelected(val as string | null)}
                className="tabs"
              >
                <Tab
                  key="booking"
                  title="Booking"
                  className="tab"
                  isDisabled={!id}
                >
                  <div
                    className={`form-container flex flex-col h-full ml-0 ml-0 mt-6 md:mt-0 w-full`}
                  >
                    <div className="mb-2 relative">
                      <GooglePlaces />
                    </div>

                    <div className="flex flex-row mb-3">
                      <Input
                        onChange={handleInputChange}
                        value={values["surgeon"] as string}
                        labelPlacement="outside"
                        classNames={{
                          label: "label",
                          input: "input",
                          inputWrapper: "inputWrapper",
                        }}
                        name={"surgeon"}
                        placeholder="E.g. Ben"
                        label="Name of surgeon"
                      />
                    </div>

                    <div className="flex flex-row mb-3">
                      <Input
                        onChange={handleInputChange}
                        value={values["email"] as string}
                        labelPlacement="outside"
                        classNames={{
                          label: "label",
                          input: "input",
                          inputWrapper: "inputWrapper",
                        }}
                        name={"email"}
                        type="email"
                        label="Email"
                        placeholder="you@example.com"
                      />
                      <div className="md:ml-2" />
                      <Input
                        onChange={handleInputChange}
                        value={values["phone"] as string}
                        labelPlacement="outside"
                        classNames={{
                          label: "label",
                          input: "input",
                          inputWrapper: "inputWrapper",
                        }}
                        name={"phone"}
                        type="tel"
                        placeholder="+44 1234567890"
                        label="Phone"
                      />
                    </div>

                    <div className="flex flex-row mb-3">
                      <Input
                        onChange={handleInputChange}
                        value={values["pateintsCount"] as string}
                        labelPlacement="outside"
                        classNames={{
                          label: "label",
                          input: "input",
                          inputWrapper: "inputWrapper",
                        }}
                        name={"pateintsCount"}
                        type="number"
                        label="No. of patients"
                        placeholder="1"
                      />

                      <div className="md:ml-2" />

                      <Input
                        onChange={handleInputChange}
                        classNames={{
                          label: "label",
                          input: "input",
                          inputWrapper: "inputWrapper mb-2",
                        }}
                        name={"date"}
                        type="date"
                        label="Date"
                        labelPlacement="outside"
                        placeholder="dd/mm/yyyy"
                      />
                    </div>
                  </div>
                </Tab>

                <Tab key="request" title="Request Booking" className="tab">
                  <div
                    className={`form-container flex flex-col h-full ml-0 ml-0 mt-6 md:mt-0 w-full`}
                  >
                    <div className="mb-2 relative">
                      <GooglePlaces />
                    </div>

                    <div className="flex flex-row mb-3">
                      <Input
                        onChange={handleInputChange}
                        value={values["surgeon"] as string}
                        labelPlacement="outside"
                        classNames={{
                          label: "label",
                          input: "input",
                          inputWrapper: "inputWrapper",
                        }}
                        name={"surgeon"}
                        placeholder="E.g. Ben"
                        label="Name of surgeon"
                      />
                    </div>

                    <div className="flex flex-row mb-3">
                      <Input
                        onChange={handleInputChange}
                        value={values["email"] as string}
                        labelPlacement="outside"
                        classNames={{
                          label: "label",
                          input: "input",
                          inputWrapper: "inputWrapper",
                        }}
                        name={"email"}
                        type="email"
                        label="Email"
                        placeholder="you@example.com"
                      />
                      <div className="md:ml-2" />
                      <Input
                        onChange={handleInputChange}
                        value={values["phone"] as string}
                        labelPlacement="outside"
                        classNames={{
                          label: "label",
                          input: "input",
                          inputWrapper: "inputWrapper",
                        }}
                        name={"phone"}
                        type="tel"
                        placeholder="+44 1234567890"
                        label="Phone"
                      />
                    </div>

                    <div className="flex flex-row mb-3">
                      <Input
                        onChange={handleInputChange}
                        value={values["pateintsCount"] as string}
                        labelPlacement="outside"
                        classNames={{
                          label: "label",
                          input: "input",
                          inputWrapper: "inputWrapper",
                        }}
                        name={"pateintsCount"}
                        type="number"
                        label="No. of patients"
                        placeholder="1"
                      />

                      <div className="md:ml-2" />

                      <Input
                        onChange={handleInputChange}
                        classNames={{
                          label: "label",
                          input: "input",
                          inputWrapper: "inputWrapper mb-2",
                        }}
                        type="date"
                        label="Date"
                        name={"date"}
                        labelPlacement="outside"
                        placeholder="dd/mm/yyyy"
                      />
                    </div>

                    {selected === "request" && activeServices.length ? (
                      <div className="mb-2 relative">
                        <DropDownComponent
                          label="Services"
                          valueKey="service"
                          searchable={true}
                          options={activeServices}
                          placeholder={"Select a service"}
                        />
                      </div>
                    ) : null}
                  </div>
                </Tab>
              </Tabs>

              <div
                className={`flex flex-row items-end w-full mt-8 flex-end absolute bottom-4`}
              >
                <SecondaryButton
                  onClick={handleSubmit}
                  coloured
                  className="w-full self-end"
                >
                  {`Confirm`}
                </SecondaryButton>
              </div>
            </div>
          </div>
        </div>
      </Section>
      {loading && (<Loader/>)}

    </main>
  );
};

export default memo(Page);
