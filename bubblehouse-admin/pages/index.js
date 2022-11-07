import { Checkbox, FormControlLabel, TextField, Button, Card, CardContent, FormControl, InputLabel, Select, MenuItem, CircularProgress, Snackbar } from '@mui/material'
import { People, Buildings, Buliding, Book, Notepad2, Calendar, Slash, Money2, CalendarAdd, StatusUp } from 'iconsax-react'
import { forwardRef, useEffect, useRef, useState } from 'react'
import Sidebar from '../components/SideBar'
import { get, postData } from '../helpers/ApiRequest'
import MuiAlert from '@mui/material/Alert';

export default function Home() {
  return (
    <div className='font-poppins h-full bg-[#F4F5FA]' >
        <Sidebar />
        <div className='ml-64'>

            <div className='gap-8'>
                <div className='grid overflow-hidden grid-cols-4 w-full h-auto items-center gap-3 p-3'>

                    <div className="box rounded-lg bg-white flex justify-between items-center p-6 shadow">
                        <div className=''>
                            <People size={56} />
                        </div>
                        <div className='block text-right gap-3'>
                            <p className='text-sm leading-5 font-normal'>Customer</p>
                            <p className='text-2xl leading-8 font-medium'>100</p>
                        </div>
                    </div>

                    <div className="box rounded-lg bg-white flex justify-between items-center p-6 shadow">
                        <div className=''>
                            <Buildings size={56} />
                        </div>
                        <div className='block text-right gap-3'>
                            <p className='text-sm leading-5 font-normal'>Hotels</p>
                            <p className='text-2xl leading-8 font-normal'>96</p>
                        </div>
                    </div>

                    <div className="box rounded-lg bg-white flex justify-between items-center p-6 shadow">
                        <div className=''>
                            <Buliding size={56} />
                        </div>
                        <div className='block text-right gap-3'>
                            <p className='text-sm leading-5 font-normal'>Available Rooms</p>
                            <p className='text-2xl leading-8 font-normal'>356</p>
                        </div>
                    </div>

                    {/* <div className="box rounded-lg bg-white flex justify-between items-center p-6 shadow">
                        <div className=''>
                            <Buliding size={56} />
                        </div>
                        <div className='block text-right gap-3'>
                            <p className='text-sm leading-5 font-normal'>Available Rooms</p>
                            <p className='text-2xl leading-8 font-normal'>100</p>
                        </div>
                    </div> */}

                </div>

                <div className='grid overflow-hidden grid-cols-4 w-full h-auto items-center gap-3 p-3'>

                    <div className="box rounded-lg bg-white flex items-center p-6 shadow gap-5 h-[100px]">
                        {/* <div className='bottom-0'>
                            <Book size={80} color="#1a1a1a1a" />
                        </div> */}
                        <div className='p-3 bg-[#1a1a1a]/10 rounded-lg justify-center'>
                            <Book size={42} />
                        </div>
                        <div className='block text-left gap-3'>
                            <p className='text-2xl leading-8 font-medium'>9</p>
                            <p className='text-sm leading-5 font-normal'>Today&#39;s Booked Room</p>
                        </div>
                    </div>

                    <div className="box rounded-lg bg-white flex items-center p-6 shadow gap-5 h-[100px]">
                        {/* <div className='bottom-0'>
                            <Book size={80} color="#1a1a1a1a" />
                        </div> */}
                        <div className='p-3 bg-[#1a1a1a]/10 rounded-lg justify-center'>
                            <Notepad2 size={42} />
                        </div> 
                        <div className='block text-left gap-3'>
                            <p className='text-2xl leading-8 font-medium'>356</p>
                            <p className='text-sm leading-5 font-normal'>Booking Request</p>
                        </div>
                    </div>

                    <div className="box rounded-lg bg-white flex items-center p-6 shadow gap-5 h-[100px]">
                        {/* <div className='bottom-0'>
                            <Book size={80} color="#1a1a1a1a" />
                        </div> */}
                        <div className='p-3 bg-[#1a1a1a]/10 rounded-lg justify-center'>
                            <Calendar size={42} />
                        </div>
                        <div className='block text-left gap-3'>
                            <p className='text-2xl leading-8 font-medium'>109</p>
                            <p className='text-sm leading-5 font-normal'>Running Booking</p>
                        </div>
                    </div>

                    {/* <div className="box rounded-lg bg-white flex items-center p-6 shadow gap-5 h-[100px]">|
                        <div className='p-3 bg-[#1a1a1a]/10 rounded-lg justify-center'>
                            <Slash size={42} />
                        </div>
                        <div className='block text-left gap-3'>
                            <p className='text-2xl leading-8 font-medium'>34</p>
                            <p className='text-sm leading-5 font-normal'>Cancelled Booking</p>
                        </div>
                    </div> */}

                </div>

                <div className='grid overflow-hidden grid-cols-4 w-full h-auto items-center gap-3 p-3'>

                    <div className="box rounded-lg bg-white flex items-center p-6 shadow gap-5 h-[100px]">
                        {/* <div className='bottom-0'>
                            <Book size={80} color="#1a1a1a1a" />
                        </div> */}
                        <div className='p-3 bg-[#1a1a1a]/10 rounded-lg justify-center'>
                            <Money2 size={42} />
                        </div>
                        <div className='block text-left gap-3'>
                            <p className='text-2xl leading-8 font-medium'>&#8358;920k</p>
                            <p className='text-sm leading-5 font-normal'>Total Payment</p>
                        </div>
                    </div>

                    <div className="box rounded-lg bg-white flex items-center p-6 shadow gap-5 h-[100px]">
                        {/* <div className='bottom-0'>
                            <Book size={80} color="#1a1a1a1a" />
                        </div> */}
                        <div className='p-3 bg-[#1a1a1a]/10 rounded-lg justify-center'>
                            <CalendarAdd size={42} />
                        </div>
                        <div className='block text-left gap-3'>
                            <p className='text-2xl leading-8 font-medium'>&#8358;120.3k</p>
                            <p className='text-sm leading-5 font-normal'>Pending Payment</p>
                        </div>
                    </div>

                    <div className="box rounded-lg bg-white flex items-center p-6 shadow gap-5 h-[100px]">
                        {/* <div className='bottom-0'>
                            <Book size={80} color="#1a1a1a1a" />
                        </div> */}
                        <div className='p-3 bg-[#1a1a1a]/10 rounded-lg justify-center'>
                            <StatusUp size={42} />
                        </div>
                        <div className='block text-left gap-3'>
                            <p className='text-2xl leading-8 font-medium'>1.2k</p>
                            <p className='text-sm leading-5 font-normal'>Transactions</p>
                        </div>
                    </div>

                    {/* <div className="box rounded-lg bg-white flex items-center p-6 shadow gap-5 h-[100px]">
                        <div className='p-3 bg-[#1a1a1a]/10 rounded-lg justify-center'>
                            <Slash size={42} />
                        </div>
                        <div className='block text-left gap-3'>
                            <p className='text-2xl leading-8 font-medium'>34</p>
                            <p className='text-sm leading-5 font-normal'>Cancelled Booking</p>
                        </div>
                    </div> */}

                </div>
            </div>

        </div>
    </div>
)
}
