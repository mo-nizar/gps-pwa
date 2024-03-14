"use client";
import React, { FC, useEffect, useState } from "react";
import api from "@/api";
import "@styles/bookings.scss";
import { useRouter, useSearchParams } from "next/navigation";
import Section from "@/layouts/Section";
import { toast } from "react-toastify";
import { SecondaryButton } from "@/components/CustomButtons";
import { Loader } from "@/components/Loader";
import { COMMON_ERROR } from "@/constants";

const Page: FC = () => {
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const searchParams = useSearchParams();

  const router = useRouter();

  const bookingId = searchParams?.get("bookingId") || null;
  const key = searchParams?.get("key") || null;
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);

  const [isLoading, setIsloading] = useState(true);


  const fetchBookingDetails = async () => {
    setIsloading(true);
    try {
      const {data} = await api.get(`/services/booking`, {
        params: { bookingId, key },
      });

      if(data.status ==200){
        setBookingDetails(data?.data);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(COMMON_ERROR)
    } finally{
      setIsloading(false)
    }
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

  // Fetch booking details on component mount
  useEffect(() => {
    fetchBookingDetails();
  }, []);

  const BookingDetails: FC<{ booking: any }> = ({ booking }) => {
    const details = [
      { label: 'Booking ID', value: booking.id },
      { label: 'Service Name', value: booking.service.name },
      { label: 'Surgeon', value: booking.surgeon },
      { label: 'Email', value: booking.email },
      { label: 'Phone', value: booking.phone },
      { label: 'Patients Count', value: booking.patientsCount },
      { label: 'PO Number', value: booking.poNumber },
      { label: 'Address', value: booking.address },
      { label: 'Date', value: booking.date },
      { label: 'Time', value: booking.time },
      { label: 'Status', value: booking.status },
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
        <div className="modal">
          <p className="confirm-text">Are you sure you want to cancel this booking?</p>
          <div className="modal-buttons">
            <button onClick={onClose}>No</button>
            <button onClick={onConfirm}>Yes</button>
          </div>
        </div>
      </div>
    );
  };

  const handleExplore = () => {
    router.push('/');
  };

  return (
    <Section className="section">
      <div className={'container'}>
        {!bookingDetails || isLoading
          ? <Loader/>
          :(
            <>
              <div className={'bookingDetails'}>
                <BookingDetails booking={bookingDetails} />
              </div>

              {/* Cancel button */}
              {bookingDetails.status === 'Cancelled' ? (
                <SecondaryButton
                  onClick={handleExplore}
                  coloured={false}
                  className="w-full self-end success-button"
                >
                  Explore More
                </SecondaryButton>
              ) : (
                <button className={'cancelButton'} onClick={handleCancelBooking}>
                  Cancel Booking
                </button>
              )}
            </>
          )
        }


        <Modal
          isOpen={isCancelModalOpen}
          onClose={() => setCancelModalOpen(false)}
          onConfirm={confirmCancelBooking}
        />
      </div>
    </Section>
  );
};

export default Page;
