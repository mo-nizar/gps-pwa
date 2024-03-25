"use client";
import React, { FC, useEffect, useState } from "react";
import api from "@/api";
import "@styles/bookings.scss";
import { useRouter, useSearchParams } from "next/navigation";
import Section from "@/layouts/Section";
import { toast } from "react-toastify";
import { SecondaryButton } from "@/components/CustomButtons";
import { Loader } from "@/components/Loader";
import { COMMON_ERROR, EXCLUDE_EDIT, EXCLUDE_USER_EDIT, FORMATTED_KEYS, FormattedKeys, inputKeys } from "@/constants";
import DateTimeInput from "@/components/DateTimePicker";
import dayjs from "dayjs";

const { DATE_TIME, PO_NUMBER } = inputKeys;


interface updatedBooking {
  [key: string]: string
}

const Page: FC = () => {
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const searchParams = useSearchParams();

  const router = useRouter();

  const bookingId = searchParams?.get("bookingId") || null;
  const key = searchParams?.get("key") || null;
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [updatedValues, setUpdatedValues] = useState<updatedBooking>({});
  const [statusAvailable, setStatusAvailable] = useState<updatedBooking>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isLoading, setIsloading] = useState(true);


  const fetchBookingDetails = async () => {
    setIsloading(true);
    try {
      const {data} = await api.get(`/services/booking`, {
        params: { bookingId, key },
      });

      if(data.status ==200){

        await formatDateTimeAndSetBooking(data?.data?.booking);
        setStatusAvailable(data?.data?.statusAvailable);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(COMMON_ERROR)
    } finally{
      setIsloading(false)
    }
  };

  const formatDateTimeAndSetBooking = async(booking: any)=>{
    const dateTime = dayjs(booking?.date+' '+booking.time, 'YYYY-MM-DD h:mm:ss A')
    const time = dayjs(booking?.time, 'h:mm:ss A').format('h:mm A');
    const date = dayjs(booking?.date).format('ddd, DD MMM YYYY');

    setBookingDetails({...booking, dateTime, time, date})
  };  
  const confirmCancelBooking = async () => {
    setCancelModalOpen(false);
    try {
      const { data } = await api.post(`/services/cancel`, null, {
        params: { bookingId, key },
      });

      if (data.status === 200) {
        setBookingDetails({ ...bookingDetails, status: 'Cancelled' });
        toast(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };  

  const validateUpdatedValues = (): boolean => {
    for (const key in updatedValues) {
      if (key !== PO_NUMBER && (!updatedValues[key] || updatedValues[key].trim() === '')) {
        return false; // If any value is empty or null, return false
      }
    }
    return true; // All values are non-empty
  };


  const updateBooking = async () => {
    try {
        if (!validateUpdatedValues()) {
          toast.error('Please fill in all fields before submitting.');
          return;
        }

        const { data } = await api.post(`/services/bookings/user-update`, null , {
            params: {
                id: bookingDetails?.id,

                booking:{
                    ...updatedValues
                },
            },
            headers:{
              'security-token': key,
            }
        });
        if (data && data.status === 200) {
            // Handle success
            toast.success('Booking updated successfully');
            // Reload booking details after updating status
            fetchBookingDetails();
            setIsModalOpen(false);
        } else if(data.status == 202){
          toast.error(data.message || 'No changes on existing details');
        }else{
          throw new Error(data.message || 'Failed to update booking details');
        }
      
    } catch (error: any) {
      toast.error(error.message || COMMON_ERROR);
    }
  };

  // Fetch booking details on component mount
  useEffect(() => {
    fetchBookingDetails();
  }, []);

  const BookingDetails: FC<{ booking: any }> = ({ booking }) => {
    const details = [
      { label: 'Booking ID', value: booking?.id },
      { label: 'Service Name', value: booking?.service?.name ?? ""  },
      { label: 'Surgeon', value: booking?.surgeon },
      { label: 'Email', value: booking?.email },
      { label: 'Phone', value: booking?.phone },
      { label: 'Patients Count', value: booking?.patientsCount },
      { label: 'PO Number', value: booking?.poNumber },
      { label: 'Address', value: booking?.address },
      { label: 'Date', value: booking?.date },
      { label: 'Time', value: booking?.time },
      { label: 'Status', value: booking?.status },
    ];

    return (
      <div className="booking-details-container">
        <table>
          <tbody>
            {details.map((detail, index) => (
              <tr key={index}>
                <td className="detail-label">{`${detail.label}`}</td>
                <td className="detail-value">{`${detail.value ?? ''}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }

  const handleCancelBooking = () => {
    setCancelModalOpen(true);
  };

  const Modal: FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="cancel-modal">
          <p className="confirm-text">{`Are you sure you want to cancel this booking?`}</p>
          <div className="modal-buttons">
            <button onClick={onClose}>{`No`}</button>
            <button onClick={onConfirm}>{`Yes`}</button>
          </div>
        </div>
      </div>
    );
  };

  const handleExplore = () => {
    router.push('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
      setUpdatedValues(prevState => ({
          ...prevState,
          [key]: e.target.value,
      }));
  };

  const setDateTime = (val: any, valueKey: string): void => {
    const dateTime = val?.$d;

    const date = dateTime.toISOString().split('T')[0]; // YYYY-MM-DD format

    // Get time separately
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    const seconds = dateTime.getSeconds().toString().padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`; // HH:MM:SS format
    setUpdatedValues({ ...updatedValues, [valueKey]: val, date, time });
  };


  return (
    <Section className="section">
      <div className={'container'}>
        {!bookingDetails || isLoading
          ? <Loader/>
          :(
            <>
            <p className="bookings-title">{`Booking Details`}</p>
              <div className={'bookingDetails'}>
                <BookingDetails booking={bookingDetails} />
                <div className="buttons-wrapper">
                  {bookingDetails.status === 'Cancelled' ? (
                    <SecondaryButton
                      onClick={handleExplore}
                      coloured={false}
                      className="w-full self-end success-button"
                    >
                      {`Explore More`}
                    </SecondaryButton>
                  ) : (
                    <div className="button-container flex flex-row justify-between">
                      <button className={'cancelButton update-button'} onClick={()=>setIsModalOpen(true)}>
                        {`Modify`}
                      </button>
                      <button className={'cancelButton'} onClick={handleCancelBooking}>
                        {`Cancel`}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )
        }


        <Modal
          isOpen={isCancelModalOpen}
          onClose={() => setCancelModalOpen(false)}
          onConfirm={confirmCancelBooking}
        />

        {isModalOpen && (
            <div className="modal">
                <div className="modal-content">
                    <h2>{`Update Details`}</h2>
                        {Object.entries(bookingDetails).map(([key, value]) => {
                            if (!EXCLUDE_USER_EDIT.includes(key)) {
                                return (
                                    <div key={key} className="edit-field">
                                        <label className="text-left" htmlFor={key}>{FORMATTED_KEYS[key as keyof FormattedKeys] ?? key}:</label>
                                        <input
                                            id={key}
                                            type="text"

                                            className="input-field"

                                            value={updatedValues[key] ?? value ?? ''}
                                            onChange={(e) => handleInputChange(e, key)}
                                        />
                                    </div>
                                );
                            }
                        })}
                        <div key={key} className="edit-field">
                            <label className="text-left">{`Date Time`}:</label>
                            <div className="date-field">
                              <DateTimeInput className='datetime-container input-field' isRequired={true} value={bookingDetails?.dateTime} onChange={(val)=>setDateTime(val, DATE_TIME)}/>
                            </div>
                        </div>
                        <div className="edit-buttons">
                            <button className={`${isLoading} ? 'disabled' : '' `} disabled={isLoading} onClick={()=>setIsModalOpen(false)}>{`Close`}</button>
                            <button className={`${isLoading} ? 'disabled' : '' `} disabled={isLoading} onClick={updateBooking}>{`Submit`}</button>
                        </div>
                </div>
            </div>
        )}
      </div>
    </Section>
  );
};

export default Page;
