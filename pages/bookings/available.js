import { Checkbox, FormControlLabel, TextField, Button, Card, CardContent, FormControl, InputLabel, Select, MenuItem, CircularProgress, Snackbar } from '@mui/material';
import { Buliding, Book, Calendar, Slash, Money2, CalendarTick, MessageEdit, ArrowLeft2 } from 'iconsax-react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { get, postData } from '../../helpers/ApiRequest';
import MuiAlert from '@mui/material/Alert';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AvailableForBookingCard from '../../components/AvailableForBookingCard';
import { BounceLoader } from 'react-spinners';

function TodayBooked() {
    const [isLoading, setIsLoading] = useState(true);
    const [availableRooms, setAvailableRooms] = useState([])
    const goBack = () => {
        router.back()
    }

    useEffect(() => {
        getAvailableRooms()
    }, [])

    const getAvailableRooms = async () => {
        const response = await get(`Room/Available`)
        if (response.successful) {
            setAvailableRooms(response.data)
        }
        setIsLoading(false)
    }

    const router = useRouter()


    return (
        <div className='min-h-screen font-poppins'>
            <Layout>
                <div className='w-full h-full py-6 flex flex-col gap-6'>
                    <div className='flex flex-col items-end gap-y-1 md:flex-row w-full'>
                        <p className='block w-full text-lg font-medium text-[#1A1A1A] leading-6'>
                            Available Rooms
                        </p>

                        <div className='flex justify-end gap-2 w-full'>

                            <div onClick={goBack} className="px-2 py-1 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-600 hover:text-gray-800">
                                <ArrowLeft2 size={14} />
                                <span className="text-xs font-medium leading-6">Back</span>
                            </div>

                        </div>
                    </div>

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
                    </div> : <AvailableForBookingCard rooms={availableRooms} />}

                </div>

            </Layout>
        </div>
    )
}

export default TodayBooked;