import React from 'react'

function AvailableForBookingCard({rooms, index}) {
    return (
        <div className='grid md:grid-cols-3 grid-cols-2 w-full h-auto items-center gap-x-2 gap-y-3'>

            {rooms.map((room, index) => (<div className="box rounded-2xl bg-white border-[1.5px] border-[#E4E4E4] flex flex-col items-center p-4 md:p-6 gap-4 h-auto" key={index}>
                <div className='p-4 bg-[#F6F6F6] text-[#636363] text-base tracking-wide leading-6 text-center font-medium rounded-full justify-center'>
                    {room.roomNumber}
                </div>
                <div className='block text-center'>
                    <p className='text-xs leading-6 font-normal text-[#636363]'>Room Type: {room.roomType} </p>
                    <p className='text-xs leading-6 font-normal text-[#636363]'>Hotel: {room.hotelName} </p>
                </div>
            </div>))}
        </div>
    )
}

export default AvailableForBookingCard