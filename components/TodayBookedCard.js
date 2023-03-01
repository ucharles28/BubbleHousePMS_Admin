import Link from 'next/link'
import React from 'react'

function TodayBookedCard({ rooms }) {
    return (
        <div className='grid md:grid-cols-3 grid-cols-2 w-full h-auto items-center gap-x-2 gap-y-3'>
            {rooms.map((room) => (<div className='flex flex-col w-full box rounded-2xl bg-white border-[1.5px] border-[#E4E4E4] items-center md:items-start p-4 md:px-4 py-6 h-auto'>
                <Link href={
                    {
                        pathname: "/bookings/details",
                        query: {
                            id: room.id
                        }
                    }
                }>
                    <div className='hidden group cursor-pointer -mt-3 md:flex justify-end w-full'>
                        <p className='text-xs font-normal cursor-pointer leading-5 tracking-wide hover:underline text-[#636363] bg-[#e4e4e4] rounded-md items-end px-1 w-auto'>
                            View
                        </p>
                    </div>
                </Link>
                <div className="md:-mt-4 w-full box flex md:flex-row flex-col md:items-start items-center gap-4">
                    <div className='p-4 bg-[#FFF7D8] text-[#D4AA00] text-base tracking-wide leading-6 text-center font-medium border-[1.5px] border-[#ffcc00] rounded-full justify-center'>
                        {room.roomNumber}
                    </div>
                    <div className='w-full text-center md:text-left'>
                        <p className='text-base leading-8 font-medium text-[#1a1a1a]'>{room.customerFullName} </p>
                        <p className='text-xs leading-6 font-normal text-[#636363]'>Booking Number: {room.bookingCode} </p>
                        <p className='text-xs leading-6 font-normal text-[#636363]'>Room Type: {room.roomType} </p>
                        <p className='text-xs leading-6 font-normal text-[#636363]'>Hotel: {room.hotelName} </p>
                    </div>
                </div>
            </div>))}
        </div>
    )
}

export default TodayBookedCard