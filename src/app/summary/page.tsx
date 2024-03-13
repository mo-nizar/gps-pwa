
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
import Image from "next/image";
import { toast } from "react-toastify";
import DateTimeInput from "@/components/DateTimePicker";
import { COMMON_ERROR } from "@/constants";

interface PageProps {
  params: { id: string; type?: string };
}

interface Option {
  [key: string]: string;
}

interface Address{
  [key: string]: any,
}

interface Errors{
  [key: string]: boolean,
}

interface DropDownProps {
  label: string;
  searchable: boolean;
  valueKey: string;
  options: Option[];
  placeholder: string;
}

const Page: FC<PageProps> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const type = searchParams?.get("type") || "booking";
  const id = searchParams?.get("id") || null;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({});
  const [selected, setSelected] = useState<string | null>(type || "booking");
  const [values, setValues] = useState<{ [key: string]: number | string | Address | null | Date}>({ id: id ? Number(id) : null });
  const [successData, setSuccessData] = useState<Address>({});
  const [activeServices, setActiveServices] = useState<Option[]>([]);
  const [errored, setError] = useState<Errors>({});


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
      toast.error(COMMON_ERROR);
    } finally {
      setLoading(false);
    }
  };  

  const validateInputs = () => {
    const errors: Errors = {};
    const requiredFields = ["surgeon", "email", "phone", "patientsCount", "address", 'dateTime'];

    requiredFields.map((field: string) => {
      if (!values[field]) {
        errors[field] = true;
      } else {
        errors[field] = false;
      }
    });

    setError(errors);

    return !Object.values(errors).some((error) => error); // Returns true if all fields are non-empty
  };  


  const handleSubmit = async () => {
    setLoading(true);
    try {

      const isValid = validateInputs();

      if (isValid) {
        const res = await api.post("/services/summary", null, {
          params: {
            id,
            ...values,
          },
        });
        const { data } = res;      
        if(data?.status =='200'){
          setSuccessData({
          title: data?.data?.title,
          desc: data?.data?.description,
          isSuccess: true,
          })
        }else{
          setSuccessData({
            title: data?.data?.title,
            desc: data?.data?.description,
            isSuccess: false,
            isFailed: true,
          })
          toast.error(data?.message,{
            theme: "colored",
            })
        }
      } else {
        toast.error("please provide mandatory details",{
          theme: "colored",
          })
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    
    if (name === 'patientsCount' && parseInt(value, 10) <= 0) {
      value = '1';
    }
    setValues({ ...values, [name]: value });

    errored[name] && setError({ ...errored, [name]: false });
  };

  const setDateTime = (val: any, valueKey: string): void => {
    const dateTime = val?.$d;

    const date = dateTime.toISOString().split('T')[0]; // YYYY-MM-DD format

    // Get time separately
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    const seconds = dateTime.getSeconds().toString().padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`; // HH:MM:SS format
    setValues({ ...values, [valueKey]: val, date, time });
  
    errored[valueKey] && setError({ ...errored, [valueKey]: false });
  };
  

  const setValueForKey = (val: string, valueKey: string): void => {
   
    setValues({ ...values, [valueKey]: val });
    errored[valueKey] && setError({ ...errored, [valueKey]: false });
  };
  

  const setSelectedAddress = (address: Address)=>{    
    setValues({ ...values, address });
  }  
  
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
        id={"key"}
        selectedVal={options?.find((item)=> item?.key == values[valueKey])?.label ?? ""  as string}
        handleInputChange={(val) => setValueForKey(val ?? "" , valueKey)}
        searchable={searchable}
        placeholder={placeholder}
      />
    );
  };

  const handleExplore = () =>{
    router.push('/')
  }

  const SuccessComponent: FC = () => {
    return (
      <div className="success-container flex flex-2 flex-col h-full ml-0 md:ml-6 ml-0 mt-6 md:mt-0 md:w-3/6 w-full relative`">
        <Image src={'/images/success.svg'} width={300} height={300} alt='success' className="success-image"/>
        <span className="success-title">{successData.title}</span>
        <span className="success-disclaimer">{successData.desc}</span>
          <SecondaryButton
            onClick={handleExplore}
            coloured={false}
            className="w-full self-end success-button"
          >
            {`Explore More`}
          </SecondaryButton>
      </div>
    );
  };

  const inputClassNames = (key: string)=>({
    label: "label",
    input: ["input", "placeholder:text-default-700/30"],
    inputWrapper: ["inputWrapper",  errored[key]&& 'errored'],
  });
  
  return (
    <main>
      <Section className="intro" maxContent={true}>
        <div className="summary-container shadow-md flex flex-col md:flex-row  md:px-10 md:py-8 md:py-0 mt-8 ">
        { loading ?
            <Loader/>
           : successData.isSuccess
            ? <SuccessComponent/>
            :(
              <>
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
                      src={"/images/request_booking.png.jpeg"}
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
                          {selected =='booking' && (<GooglePlaces isErrored= {errored['address']} onSelect={setSelectedAddress}/>)}
                          </div>

                          <div className="flex flex-row mb-3">
                            <Input
                              onChange={handleInputChange}
                              value={values["surgeon"] as string}
                              labelPlacement="outside"
                              classNames={{...inputClassNames('surgeon')}}
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
                              classNames={{...inputClassNames('email')}}
                              name={"email"}
                              type="email"
                              label="Email"
                              placeholder="you@example.com"
                            />
                            <div className="ml-2" />
                            <Input
                              onChange={handleInputChange}
                              value={values["phone"] as string}
                              labelPlacement="outside"
                              classNames={{...inputClassNames('phone')}}
                              name={"phone"}
                              type="tel"
                              placeholder="+44 1234567890"
                              label="Phone"
                            />
                          </div>

                          <div className="flex flex-row mb-3">

                            <Input
                              onChange={handleInputChange}
                              value={values["poNumber"] as string}
                              labelPlacement="outside"
                              classNames={{...inputClassNames('poNumber')}}
                              name={"poNumber"}
                              placeholder="XQWRDTDDGGSWF"
                              label="Purchase Order Number"
                            />

                            <div className="ml-2" />

                            <Input
                              onChange={handleInputChange}
                              value={values["patientsCount"] as string}
                              labelPlacement="outside"
                              classNames={{...inputClassNames('patientsCount')}}
                              name={"patientsCount"}
                              type="number"
                              label="No. of patients"
                              placeholder="1"
                            />
                          </div>

                          <div className="flex flex-row mb-3">
                            <div className="flex flex-col w-full">
                              <label className="label mb-2">Select Date and Time</label>

                              <div className={`flex flex-col w-full ${errored['dateTime'] ? 'errored': ''}`}>
                                <DateTimeInput value={values['dateTime'] as Date } onChange={(val)=>setDateTime(val, 'dateTime')}/>
                              </div>

                            </div>

                            {/* <Input
                              onChange={handleInputChange}
                              value={values["time"] as string}
                              labelPlacement="outside"
                              classNames={{...inputClassNames('time')}}
                              name={"time"}
                              type="time"
                              label="Time"
                              placeholder="1"
                            />

                            <div className="ml-2" />

                            <Input
                              onChange={handleInputChange}
                              classNames={{...inputClassNames('date'),
                              inputWrapper: ["inputWrapper mb-2", errored['date'] && 'errored'],
                              }}
                              type="date"
                              label="Date"
                              name={"date"}
                              labelPlacement="outside"
                              placeholder="dd-mm-yyyy"
                            /> */}
                          </div>
                        </div>
                      </Tab>

                      <Tab key="request" title="Request Booking" className="tab">
                        <div
                          className={`form-container flex flex-col h-full ml-0 ml-0 mt-6 md:mt-0 w-full`}
                        >
                          <div className="mb-2 relative">
                            {selected =='request' && (<GooglePlaces isErrored= {errored['address']} onSelect={setSelectedAddress}/>)}
                          </div>

                          <div className="flex flex-row mb-3">
                            <Input
                              onChange={handleInputChange}
                              value={values["surgeon"] as string}
                              labelPlacement="outside"
                              classNames={{...inputClassNames('surgeon')}}
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
                              classNames={{...inputClassNames('email')}}
                              name={"email"}
                              type="email"
                              label="Email"
                              placeholder="you@example.com"
                            />
                            <div className="ml-2" />
                            <Input
                              onChange={handleInputChange}
                              value={values["phone"] as string}
                              labelPlacement="outside"
                              classNames={{...inputClassNames('phone')}}
                              name={"phone"}
                              type="tel"
                              placeholder="+44 1234567890"
                              label="Phone"
                            />
                          </div>

                          <div className="flex flex-row mb-3">

                          <Input
                              onChange={handleInputChange}
                              value={values["poNumber"] as string}
                              labelPlacement="outside"
                              classNames={{...inputClassNames('poNumber')}}
                              name={"poNumber"}
                              placeholder="XQWRDTDDGGSWF"
                              label="Purchase Order Number"
                            />

                            <div className="ml-2" />
                            <Input
                              onChange={handleInputChange}
                              value={values["patientsCount"] as string}
                              labelPlacement="outside"
                              classNames={{...inputClassNames('patientsCount')}}
                              name={"patientsCount"}
                              type="number"
                              label="No. of patients"
                              placeholder="1"
                            />
                          </div>

                          <div className="flex flex-row mb-3">

                            <div className="flex flex-col w-full">
                              <label className="label mb-2">Select Date and Time</label>

                              <div className={`flex flex-col w-full ${errored['dateTime'] ? 'errored': ''}`}>
                                <DateTimeInput value={values['dateTime'] as Date } onChange={(val)=>setDateTime(val as Date, 'dateTime')}/>
                              </div>

                            </div>                            {/* <Input
                              onChange={handleInputChange}
                              value={values["time"] as string}
                              labelPlacement="outside"
                              classNames={{...inputClassNames('time')}}
                              name={"time"}
                              type="time"
                              label="Time"
                              placeholder="1"
                            />

                            <div className="ml-2" />

                            <Input
                              onChange={handleInputChange}
                              classNames={{...inputClassNames('date'),
                                inputWrapper: ["inputWrapper mb-2", errored['date'] && 'errored'],
                              }}
                              type="date"
                              label="Date"
                              name={"date"}
                              labelPlacement="outside"
                              placeholder="dd-mm-yyyy"
                            /> */}
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
                      className={`flex flex-row items-end w-full mt-8`}
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
            </>
            )
            }
        </div>
      </Section>
    </main>
  );
};

export default memo(Page);
