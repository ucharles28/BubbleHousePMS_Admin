import { Checkbox, FormControlLabel, TextField, Button, Card, CardContent, FormControl, InputLabel, Select, MenuItem, CircularProgress, Snackbar } from '@mui/material';
import { Buliding, Book, Calendar, Slash, Money2, CalendarTick, MessageEdit } from 'iconsax-react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { get, postData } from '../../helpers/ApiRequest';
import MuiAlert from '@mui/material/Alert';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { BounceLoader } from 'react-spinners';

function AllBookings() {

    const [isLoading, setIsLoading] = useState(true);
    const [bookingsOverview, setBookingsOverview] = useState()

    useEffect(() => {
        getBookingsOverview()
    }, [])

    const getBookingsOverview = async () => {
        const response = await get(`Admin/Booking/Overview`)
        if (response.successful) {
            setBookingsOverview(response.data)
        }
        setIsLoading(false)
    }


    return (
        <div className='h-full font-poppins'>
            <Layout>
                <div className='w-full md:h-screen py-6 flex flex-col gap-6'>
                <p className='w-full block text-lg font-medium text-[#1A1A1A] leading-6'>
                        Bookings
                    </p>

                    {isLoading ? <div className="w-full">
                        <div className="flex flex-col items-center justify-center">
                            <div className="lg:w-2/5 md:w-1/2 pt-10 pl-4 pr-4 justify-center lg:my-16 sm:my-5">
                                <div className="m-12 pt-14 flex flex-col items-center justify-center">
                                    <BounceLoader
                                        heigth={200}
                                        width={200}
                                        color="#FFCC00"
                                        ariaLabel="loading-indicator"
                                    />
                                </div>
                            </div>
                        </div>
                    </div> : <div className='grid grid-cols-2 md:grid-cols-3 w-full h-auto items-center gap-3'>

                        <Link href='/bookings/todaybooked' >
                            <div className="hover:drop-shadow-sm box rounded-2xl bg-white border border-[#E4E4E4] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-4 h-auto">
                                <div className='p-4 bg-[#F6F6F6] rounded-full justify-center'>
                                    <Book size={24} className='text-[#636363]' variant='Bold' />
                                </div>
                                <div className='block text-center md:text-left gap-3'>
                                    <p className='text-sm leading-6 text-[#636363]'>Today Booked</p>
                                    <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>{bookingsOverview ? bookingsOverview.todayBooked : 0}</p>
                                </div>
                            </div>
                        </Link>

                        <Link href='/bookings/running' >
                            <div className="hover:drop-shadow-sm box rounded-2xl bg-white border border-[#E4E4E4] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-4 h-auto">
                                <div className='p-4 bg-[#F6F6F6] rounded-full justify-center'>
                                    <Calendar size={24} className='text-[#636363]' variant='Bold' />
                                </div>
                                <div className='block text-center md:text-left gap-3'>
                                    <p className='text-sm leading-6 text-[#636363]'>Running Booking</p>
                                    <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>{bookingsOverview ? bookingsOverview.runningBookings : 0}</p>
                                </div>
                            </div>
                        </Link>

                        <Link href='/bookings/request' >
                            <div className="hover:drop-shadow-sm box rounded-2xl bg-white border border-[#E4E4E4] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-4 h-auto">
                                <div className='p-4 bg-[#F6F6F6] rounded-full justify-center'>
                                    <MessageEdit size={24} className='text-[#636363]' variant='Bold' />
                                </div>
                                <div className='block text-center md:text-left gap-3'>
                                    <p className='text-sm leading-6 text-[#636363]'>Booking Request</p>
                                    <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>{bookingsOverview ? bookingsOverview.bookingRequest : 0}</p>
                                </div>
                            </div>
                        </Link>

                        <Link href='/bookings/available'>
                            <div className="hover:drop-shadow-sm box rounded-2xl bg-white border border-[#E4E4E4] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-4 h-auto">
                                <div className='p-4 bg-[#F6F6F6] rounded-full justify-center'>
                                    <Buliding size={24} className='text-[#636363]' variant='Bold' />
                                </div>
                                <div className='block text-center md:text-left gap-3'>
                                    <p className='text-xs md:text-sm leading-6 text-[#636363]'>Available Rooms</p>
                                    <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>{bookingsOverview ? bookingsOverview.availableRooms : 0}</p>
                                </div>
                            </div>
                        </Link>

                        <Link href='/bookings/cancelled' >
                            <div className="hover:drop-shadow-sm box rounded-2xl bg-white border border-[#E4E4E4] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-4 h-auto">
                                <div className='p-4 bg-[#F6F6F6] rounded-full justify-center'>
                                    <Slash size={24} className='text-[#636363]' variant='Bold' />
                                </div>
                                <div className='block text-center md:text-left gap-3'>
                                    <p className='text-xs md:text-sm leading-6 text-[#636363]'>Cancelled Bookings</p>
                                    <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>{bookingsOverview ? bookingsOverview.cancelledBookings : 0}</p>
                                </div>
                            </div>
                        </Link>

                        <Link href='/bookings/confirmed' >
                            <div className="hover:drop-shadow-sm box rounded-2xl bg-white border border-[#E4E4E4] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-4 h-auto">
                                <div className='p-4 bg-[#F6F6F6] rounded-full justify-center'>
                                    <Slash size={24} className='text-[#636363]' variant='Bold' />
                                </div>
                                <div className='block text-center md:text-left gap-3'>
                                    <p className='text-xs md:text-sm leading-6 text-[#636363]'>Confirmed Bookings</p>
                                    <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>{bookingsOverview ? bookingsOverview.confirmedBookings : 0}</p>
                                </div>
                            </div>
                        </Link>

                        <Link href='/bookings/all' >
                            <div className="hover:drop-shadow-sm box rounded-2xl bg-white border border-[#E4E4E4] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-4 h-auto">
                                <div className='p-4 bg-[#F6F6F6] rounded-full justify-center'>
                                    <CalendarTick size={24} className='text-[#636363]' variant='Bold' />
                                </div>
                                <div className='block text-center md:text-left gap-3'>
                                    <p className='text-sm leading-6 text-[#636363]'>Total Bookings</p>
                                    <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>{bookingsOverview ? bookingsOverview.totalBookings : 0}</p>
                                </div>
                            </div>
                        </Link>

                        <Link href='/bookings/payments' >
                            <div className="hover:drop-shadow-sm box rounded-2xl bg-white border border-[#E4E4E4] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-4 h-auto">
                                <div className='p-4 bg-[#F6F6F6] rounded-full justify-center'>
                                    <Money2 size={24} className='text-[#636363]' variant='Bold' />
                                </div>
                                <div className='block text-center md:text-left gap-3'>
                                    <p className='text-sm leading-6 text-[#636363]'>Total Payment</p>
                                    <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>{bookingsOverview ? bookingsOverview.totalPayment : 0}</p>
                                </div>
                            </div>
                        </Link>

                    </div>}
                </div>
            </Layout>
        </div>
    )
}

export default AllBookings;