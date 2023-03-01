import { Checkbox, FormControlLabel, TextField, Button, Card, CardContent, FormControl, InputLabel, Select, MenuItem, CircularProgress, Snackbar } from '@mui/material';
import { Buliding, Book, Calendar, Slash, Money2, CalendarTick, MessageEdit, ArrowLeft2 } from 'iconsax-react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { get, postData } from '../../helpers/ApiRequest';
import MuiAlert from '@mui/material/Alert';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TodayBookedCard from '../../components/TodayBookedCard';
import AvailableForBookingCard from '../../components/AvailableForBookingCard';
import { BounceLoader } from "react-spinners";

function TodayBooked() {
    const [bookedRooms, setBookedRooms] = useState([])
    const [availableRooms, setAvailableRooms] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const goBack = () => {
        router.back()
    }

    useEffect(() => {
        getBookedRooms()
    }, [])

    const getBookedRooms = async() => {
        const responses = await Promise.all([
            get(`Booking/Today`),
            get(`Room/Available`)
        ])

        if (responses[0].successful) {
            setBookedRooms(responses[0].data)
        }

        if (responses[1].successful) {
            setAvailableRooms(responses[1].data)
        }
        setIsLoading(false)
    }

    const router = useRouter()


    return (
        <div className='h-full font-poppins'>
            <Layout>
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
                    </div> : <><div className='w-full h-auto py-6 flex flex-col gap-6'>
                    <div className='flex justify-between w-full'>
                        <p className='w-full block text-xl font-medium text-[#1A1A1A] leading-8'>
                            Today Booked
                        </p>

                        <div className='flex item-center justify-end gap-2 w-full'>
                            <div onClick={goBack} className="px-2 py-1 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-600 hover:text-gray-800">
                                <ArrowLeft2 size={17} />
                                <span className="text-sm font-medium leading-6">Back</span>
                            </div>
                        </div>
                    </div>


                    <TodayBookedCard rooms={bookedRooms}/>
                    
                </div>

                <div className='w-full h-screen py-6 flex flex-col gap-6'>
                    <div className='flex justify-between w-full'>
                        <p className='w-full block text-xl font-medium text-[#1A1A1A] leading-8'>
                            Available for boking
                        </p>
                    </div>

                    <AvailableForBookingCard rooms={availableRooms}/>
                </div></>}

            </Layout>
        </div>
    )
}

export default TodayBooked;