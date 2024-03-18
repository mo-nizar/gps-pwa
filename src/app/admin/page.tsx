// Page.tsx
"use client";
import React, { useState, useEffect, use } from 'react';
import api from '../../api';
import { toast } from 'react-toastify';
import "@styles/dashboard.scss";
import { useRouter, useSearchParams } from 'next/navigation';
import { ENVS, EXCLUDE_EDIT, EXCLUDE_SHOW } from '../../constants';

interface Booking {
    id: number;
    service: {
        name: string;
    };
    date: string;
    time: string;
    day: string;
    status?: string;
    surgeon?: string;
    hospitalName?: string;
    poNumber?: string;
    
}

interface Bookings {
    day: string;
    time: string;
    bookings: Booking[]
}



interface updatedBooking {
    [key: string]: string
}

const daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


const AccessRestricted: React.FC = () => {
    return (
      <div className="access-restricted">
        <p>Access Restricted</p>
      </div>
    );
  };
  

const Page: React.FC = () => {
    const [bookings, setBookings] = useState<Bookings[]>([]);
    const [page, setPage] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [searchInput, setSearchInput] = useState<string>('');
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isAccessRestricted, setIsAccessRestricted] = useState<boolean>(false); // State for access restriction
    const [updatedValues, setUpdatedValues] = useState<updatedBooking>({});
    const [statusAvailable, setStatusAvailable] = useState<updatedBooking>({});
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [permissions, setPermissions] = useState<string[]>([]);
    const [isValidUser, setIsValidUser] = useState<boolean>(false);


    const searchParams = useSearchParams();
    const key = searchParams?.get("key") || null;
    const router = useRouter();

    useEffect(() => {
        if (!selectedDate) {
            // If no date is selected, select the current day
            const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
            if (!daysOfWeek.includes(today)) {
                // If current day is not present in the list, select the first day of the week
                setSelectedDate(daysOfWeek[0].toLowerCase());
            } else {
                setSelectedDate(today.toLowerCase());
            }            
        }
    }, [selectedDate]);


    useEffect(()=>{
        validateUser()
    },[])
    

    useEffect(() => {
        isValidUser && fetchBookingDetails();
    }, [page,isValidUser]);

    useEffect(()=>{
        isAccessRestricted && logout();
    },[isAccessRestricted])


    const validateUser = async () => {
        setIsLoading(true);
        try {
            const { data } = await api.get(`/user/validate`, {
                headers:{
                    authorization: key,
                }
            } );
            if (data && data.status === 200) {
                setIsValidUser(true);
                console.log('response', data);
                
                setPermissions(data.data?.permissions)
                updateCurrentDate(page);
            } else if (data.status == 401 || status) { // Handle 401 status
                setIsAccessRestricted(true);
            } else {
                throw new Error(data.message || 'Failed to fetch bookings');
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                // Handle 401 status code
                setIsAccessRestricted(true);
            } else if (error.message && error.message.includes('unauthorized')) {
                setIsAccessRestricted(true);
            } else if (error.response && error.response.data && error.response.data.message.includes('unauthorized')) {
                setIsAccessRestricted(true);
            } else {
                toast.error(error.response?.data?.message || error.message || 'Error fetching booking details');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const fetchBookingDetails = async () => {
        setIsLoading(true);
        try {
            const response = await api.get(`/dashboard/bookings`, {
                params: {
                    pageNo: page,
                },
                headers:{
                    authorization: key,
                }
            } );
            if (response.data && response.data.status === 200) {
                setBookings(response.data.data?.bookings);
                setStatusAvailable(response.data.data?.statusAvailable)
                updateCurrentDate(page);
            } else if (response.data.status == 401 || response.status) { // Handle 401 status
                setIsAccessRestricted(true);
            } else {
                throw new Error(response.data.message || 'Failed to fetch bookings');
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                // Handle 401 status code
                setIsAccessRestricted(true);
            } else if (error.message && error.message.includes('unauthorized')) {
                setIsAccessRestricted(true);
            } else if (error.response && error.response.data && error.response.data.message.includes('unauthorized')) {
                setIsAccessRestricted(true);
            } else {
                toast.error(error.response?.data?.message || error.message || 'Error fetching booking details');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const updateBooking = async () => {
        try {
            const response = await api.post(`/dashboard/bookings/update`, null , {
                params: {
                    id: selectedBooking?.id,

                    booking:{
                        ...updatedValues
                    },
                },
                headers:{
                    authorization: key,
                }
            });
            if (response.data && response.data.status === 200) {
                // Handle success
                toast.success('Booking status updated successfully');
                // Reload booking details after updating status
                fetchBookingDetails();
                setIsEditing(false);
            } else {
                throw new Error(response.data.message || 'Failed to update booking status');
            }
        } catch (error) {
            // if (error.response && error.response.status === 401) {
            //     // Handle 401 status code
            //     // For example, set state to show access restricted message
            //     setIsAccessRestricted(true);
            // } else {
            //     toast.error(error.message || 'Error fetching booking details');
            // }
        }
    };

    const updateCurrentDate = (page: number): void => {
        const newDate = new Date();
        const increment = page === 0 ? 0 : 7 * page;
        newDate.setDate(newDate.getDate() + increment);
        setCurrentDate(newDate);
    };

    const formatMonthAndYear = (date: Date): string => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
        });
    };

    const formatTime = (time: string): string => {
        return time.replace(/\:\d+ /, ' ');
    };

    const formatDate = (date: Date): string => {
        return date.getDate().toString();
    };

    const formatFullDate = (date: string | Date): string => {
        const formattedDate = new Date(date);
        const day = String(formattedDate.getDate()).padStart(2, '0');
        const month = formattedDate.toLocaleString('default', { month: 'short' });
        const year = formattedDate.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const formatDayOfWeek = (day: string): string => {
        return day.substr(0, 3);
    };

    const isSameDay = (date1: Date, date2: Date): boolean => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    const handlePrevWeek = (): void => {
        setPage(prevPage => prevPage - 1);
    };

    const handleNextWeek = (): void => {
        setPage(prevPage => prevPage + 1);
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchInput(e.target.value);
    };

    const handleCardClick = (booking: Booking): void => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const logout = () => {
      // Clear authentication token or perform other logout operations
      // Redirect the user to the login page
      router.push(`${ENVS.API_BASE_URL}/admin/login`);
    };

    const closeModal = (): void => {
        setIsModalOpen(false);
    };

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
    };

    const handlePrevDay = () => {

        const currentDate = new Date(selectedDate);

        currentDate.setDate(currentDate.getDate() - 1);
        setSelectedDate(currentDate.toISOString().slice(0, 10));
    };

    const handleNextDay = () => {
        const currentDate = new Date(selectedDate);
        currentDate.setDate(currentDate.getDate() + 1);
        setSelectedDate(currentDate.toISOString().slice(0, 10));
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: string) => {
        setUpdatedValues(prevState => ({
            ...prevState,
            [key]: e.target.value,
        }));
    };

    const cancelEdit = () => {
        setIsEditing(false);
        // Reset the updatedValues state if needed
    };

    if(isAccessRestricted || !isValidUser){
        return (<AccessRestricted />);
    }    


    const renderBookingCards = (bookings: Booking[]): JSX.Element[] => {
        return bookings.map(booking => renderBookingCard(booking));
    };

    const renderBookingCard = (booking: Booking): JSX.Element => {
        const highlight = searchInput && booking.id.toString().includes(searchInput); // Check if ID contains search input
        return (
            <div key={booking.id} className={`booking-card ${highlight ? 'highlight' : ''} ${!booking.poNumber ? 'no-po' : ''}`} onClick={() => handleCardClick(booking)}>
                <p className='service-name'>{booking.id}</p>
                <p className='service-name'>{booking.surgeon}</p>
                <p className='service-name'>{booking.hospitalName}</p>
                <p className='details-data'>Date: {formatFullDate(booking.date)}</p>
                <p className='details-data'>Time: {formatTime(booking.time)}</p>
            </div>
        );
    };

    const renderDays = (): JSX.Element[] => {
        const startIndex: number = currentDate.getDay();
        return daysOfWeek.map((day, index) => {
            const bookingOfDay = bookings.find(booking => booking.day === day);
            const columnIndex = (startIndex + index) % 7;
            const columnDate = new Date(currentDate);
            columnDate.setDate(currentDate.getDate() + index - startIndex);
            const isToday = isSameDay(new Date(), columnDate);
            return (
                <div key={day} className={`column col-${columnIndex} ${isToday ? 'current-date' : ''}`}>
                    <p className="day-of-week">{formatDayOfWeek(day)}</p>
                    <p className="date">{formatDate(columnDate)}</p>
                    {bookingOfDay ? renderBookingCards(bookingOfDay.bookings) : <p>No bookings</p>}
                </div>
            );
        });
    };    

    const renderMobileDays = () =>{
        const startIndex: number = currentDate.getDay();
        let hasSelectedDate = false; // Flag to check if selected date exists in the list
        return daysOfWeek.map((day, index) => {
            const columnIndex = (startIndex + index) % 7;
            const columnDate = new Date(currentDate);
            columnDate.setDate(currentDate.getDate() + index - startIndex);
            const dayLowerCase = day.toLowerCase();
            if (dayLowerCase === selectedDate) {
                hasSelectedDate = true; // Set flag to true if selected date exists in the list
            };
            return (

                <div key={day} onClick={() => handleDateSelect(day.toLowerCase())} className={`date column col-${columnIndex}`}>
                    <div className={`dateWrapper ${selectedDate === day.toLowerCase() ? 'selected' : ''}`}>
                        <p className="day-of-week">{formatDayOfWeek(day)}</p>
                        <p className="date">{formatDate(columnDate)}</p>
                    </div>
                </div>
            );
        })
    }

    const renderMobileBookings = (bookings: any) =>{
        const selectedDaysBookings = bookings.filter((booking: any) => booking.day.toLowerCase() === selectedDate)
        if(selectedDaysBookings.length){
            return selectedDaysBookings.map((booking: any) => renderBookingCards(booking.bookings))
        }else{
            return <p>No bookings</p>
        }
        

    }

    return (
        <main className='screen'>
            <header className="header header-nav">
                <div className="header-left">
                    <button disabled={isLoading} className={`${isLoading} ? 'disabled' : '' `} onClick={() => router.push('https://admin.globalprostatesolutions.com/admin')}>
                        <img className='back-icon' src="/images/back-arrow.svg" alt="Back" />
                    </button>
                    <h1>Bookings</h1>
                </div>
                <div className="header-right">
                    <input
                        type="text"
                        placeholder="Search by ID"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                    />
                    <button disabled={isLoading} className='logout' onClick={logout}>Logout</button>
                </div>
            </header>


                <main className="dashboard">
                    <div className="header">
                        <button disabled={isLoading} className='prev-next' onClick={handlePrevWeek}>&larr; <span className='max-md:hidden'>Prev</span></button>
                        <h1>{formatMonthAndYear(currentDate)}</h1>
                        <button disabled={isLoading} className='prev-next' onClick={handleNextWeek}><span className='max-md:hidden'>Next</span> &rarr;</button>
                    </div>

                    <div className='desktop-component'>
                        <div className="grid">
                            {renderDays()}
                        </div>
                    </div>

                    <div className='mobile-component'>
                        <div className="mobile-booking-container">

                            <div className="date-column">
                                {renderMobileDays()}
                            </div>

                            <div className="booking-column">
                                <div className="booking-container">

                                    {renderMobileBookings(bookings)}
                                </div>
                            </div>


                        </div>
                    </div>

                </main>

                {isModalOpen && selectedBooking && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Booking Details</h2>
                            {/* Display booking details in view mode */}
                            {!isEditing && (
                                <>
                                    {Object.entries(selectedBooking).map(([key, value]) => {
                                        if (!EXCLUDE_SHOW.includes(key)) {
                                            return (
                                                <div key={key} className="view-field">
                                                    <p className="field-label">{key}:</p>
                                                    <p className="field-value">{typeof value === 'object' ? JSON.stringify(value) : value}</p>
                                                </div>
                                            );
                                        }
                                    })}
                                    <div className="edit-buttons">
                                        {permissions?.includes('UPDATE') && (<button className={`${isLoading} ? 'disabled' : '' `} disabled={isLoading} onClick={toggleEditMode}>Update</button>)}
                                        <button className={`${isLoading} ? 'disabled' : '' `} disabled={isLoading} onClick={closeModal}>Close</button>
                                    </div>
                                </>
                            )}
                                                    {/* Display booking details in edit mode */}
                            {isEditing && (
                            <>
                                {Object.entries(selectedBooking).map(([key, value]) => {
                                    if (!EXCLUDE_EDIT.includes(key)) {
                                        return (
                                            <div key={key} className="edit-field">
                                                <label htmlFor={key}>{key}:</label>
                                                <input
                                                    id={key}
                                                    type="text"
                                                    value={updatedValues[key] ?? value}
                                                    onChange={(e) => handleInputChange(e, key)}
                                                />
                                            </div>
                                        );
                                    }
                                })}
                                <div className="edit-field">
                                    <label htmlFor="status">Status:</label>
                                    <select id="status" value={updatedValues.status ?? selectedBooking.status} onChange={(e)=>handleInputChange(e, 'status')}>
                                        {Object.entries(statusAvailable).map(([key, value]) => (
                                            <option key={key} value={value}>{key}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="edit-buttons">
                                    <button className={`${isLoading} ? 'disabled' : '' `} disabled={isLoading} onClick={updateBooking}>Submit</button>
                                    <button className={`${isLoading} ? 'disabled' : '' `} disabled={isLoading} onClick={cancelEdit}>Cancel</button>
                                    <button className={`${isLoading} ? 'disabled' : '' `} disabled={isLoading} onClick={closeModal}>Close</button>
                                </div>
                            </>
                            )}

                        </div>
                    </div>
                )}

        </main>
    );
};

export default Page;


