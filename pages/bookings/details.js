import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { ArrowLeft2 } from 'iconsax-react';
import { get } from '../../helpers/ApiRequest';
import { useState, useEffect } from 'react';
import { BounceLoader } from 'react-spinners';
import { format } from "date-fns";

function RequestDetails() {
    const [booking, setBooking] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    const id = router.query.id;
    const goBack = () => {
        router.back()
    }

    useEffect(() => {
        if (id) {
            getBookingDetails();
        }
    }, [id])

    const getBookingDetails = async() => {
        const response = await get(`Booking/${id}`);

        if (response.successful){
            console.log(response.data.roomTypes)
            setBooking(response.data)
        }
        setIsLoading(false)
    }


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
                    </div> : <div className='w-full h-screen py-6 flex flex-col gap-6'>

                    <div className='flex justify-between w-full'>
                        <p className='w-full block text-xl font-medium text-[#1A1A1A] leading-8'>
                            Request Details for {booking && booking.code}
                        </p>

                        <div className='flex item-center justify-end gap-2 w-full'>
                            <div onClick={goBack} className="px-2 py-1 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-600 hover:text-gray-800">
                                <ArrowLeft2 size={17} />
                                <span className="text-sm font-medium leading-6">Back</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className='grid grid-cols-1 md:grid-cols-3 justify-between gap-6 md:gap-8 w-full h-auto bg-white border border-[#E4E4E4] p-4 py-5 rounded-lg'>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Booking Number</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>{booking && booking.code}</p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Guest Name</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>{booking && booking.fullName} </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Guest Phone</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>{booking && booking.phone}</p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Guest Email</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>
                            {booking && booking.email}
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Room Type</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>
                                {booking && booking.roomTypes.map(roomType => roomType.roomType.name).join(', ')}
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Number of Rooms</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>
                            {booking && booking.roomTypes.map(roomType => roomType.numberBookedRooms).reduce((prev, next) => prev + next)}
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Check-In</p>
                            <p className='text-sm tracking-widest font-medium text-[#1A1A1A]'>
                               {booking && format(new Date(booking.checkInDate), 'dd-MM-yyyy')}
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Check-Out</p>
                            <p className='text-sm tracking-widest font-medium text-[#1A1A1A]'>
                            {booking && format(new Date(booking.checkOutDate), 'dd-MM-yyyy')}
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Adults</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>
                            {booking && booking.totalAdults}
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Children</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>
                            {booking && booking.totalChildren}
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Total</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>
                                NGN {booking && Number(booking.totalAmount).toLocaleString()}
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Total Paid</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>
                            {booking && booking.isPaid ? `NGN ${Number(booking.totalAmount).toLocaleString()}` : 'None'}
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Payment Method</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>
                            {booking && booking.isReservation ? 'Premise' : 'Online'}
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-normal text-[#636363]'>Payment Status</p>
                            <p className='text-sm font-medium text-[#1A1A1A]'>
                            {booking && booking.isPaid ? 'Paid' : 'Not paid'}
                            </p>
                        </div>

                    </div>

                </div>}
            </Layout>
        </div>
    )
}

export default RequestDetails