import { CircularProgress, Snackbar } from '@mui/material';
import { Buildings, Book, Notepad2, Calendar, Slash, Money2, CalendarAdd, StatusUp, Profile2User, MessageEdit } from 'iconsax-react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import Sidebar from '../components/SideBar';
import { get, postData } from '../helpers/ApiRequest';
import MuiAlert from '@mui/material/Alert';
import Layout from '../components/Layout';
import { PieChart, Pie, Cell } from "recharts";
import Link from 'next/link';
import { BounceLoader } from 'react-spinners';

function Dashboard() {

    const [isLoading, setIsLoading] = useState(true);
    const [dashboardOverview, setDashboardOverview] = useState()
    const [pieChartData, setPieChartData] = useState([])

    useEffect(() => {
        getDashboardOverview()
    }, [])

    const getDashboardOverview = async () => {
        const response = await get(`Admin/Dashboard/Overview`)
        if (response.successful) {
            setDashboardOverview(response.data)
            setPieChartData([
                {
                    name: "Group A",
                    value: response.data.todayBooked,
                },
                {
                    name: "Group B",
                    value: response.data.availableRooms,
                }
            ])
        }
        setIsLoading(false)
    }


    const COLORS = [
        "#636363",
        "#FFCC00"
    ];


    return (
        <div className='h-full font-poppins'>
            <Layout>
                <div className='w-full h-full py-6 flex flex-col gap-6'>
                    <p className='w-full block text-lg font-medium text-[#1A1A1A] leading-6'>
                        Overview
                    </p>

                    {isLoading ? <div className="w-full h-screen">
                        <div className="flex flex-col items-center justify-center">
                            <div className="lg:w-2/5 md:w-1/2 pt-10 pl-4 pr-4 justify-center lg:my-16 sm:my-5">
                                <div className="m-12 pt-14 flex flex-col items-center justify-center">
                                    <BounceLoader
                                        heigth={220}
                                        width={220}
                                        color="#FFCC00"
                                        aria-label="loading-indicator"
                                    />
                                </div>
                            </div>
                        </div>
                    </div> : <div>
                        <div className='flex flex-col md:flex-row w-full h-auto items-center gap-3 mb-3'>

                            <div className="rounded-2xl bg-white  border border-[#FFDD55] w-full md:w-auto flex flex-col justify-center items-center p-4 md:p-6 gap-2 h-auto">
                                <p className='text-lg leading-8 font-medium text-[#1a1a1a]'>
                                    Available Rooms Today
                                </p>

                                <PieChart width={180} height={180}>
                                    <Pie
                                        data={pieChartData}
                                        innerRadius={55}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={1}
                                        dataKey="value"
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>

                                <div className='flex flex-col w-full'>
                                    <div className='flex items-center w-full justify-between gap-2'>
                                        <p className='text-xs font-normal leading-6 flex items-center gap-2 text-[#636363]'>
                                            <span className='w-5 h-3 bg-[#FFCC00] rounded-sm'></span>
                                            Available rooms
                                        </p>
                                        <p className='text-xs font-medium leading-6 text-[#1A1A1A]'> {dashboardOverview ? dashboardOverview.availableRooms : 0} </p>
                                    </div>
                                    <div className='flex items-center w-full justify-between gap-2'>
                                        <p className='text-xs font-normal leading-6 flex items-center gap-2 text-[#636363]'>
                                            <span className='w-5 h-3 bg-gray-600 rounded-sm'></span>
                                            Booked rooms
                                        </p>
                                        <p className='text-xs font-medium leading-6 text-[#1A1A1A]'> {dashboardOverview ? dashboardOverview.todayBooked : 0} </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 w-full h-auto items-center gap-3'>

                            <Link href='/hotels' >
                                <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                                    <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                                        <Buildings size={24} className='text-[#D4AA00]' variant='Bold' />
                                    </div>
                                    <div className='block text-center md:text-left gap-3'>
                                        <p className='text-sm leading-6 text-[#636363]'>Hotels</p>
                                        <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>{dashboardOverview ? dashboardOverview.noOfHotels : 0}</p>
                                    </div>
                                </div>
                            </Link>


                            <Link href='/users/manager' >
                                <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                                    <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                                        <svg fill="#D4AA00" height="24px" width="24px" version="1.1" viewBox="0 0 297 297" enable-background="new 0 0 297 297">
                                            <g>
                                                <path d="M148.51,117.216c32.317,0,58.608-26.291,58.608-58.608S180.827,0,148.51,0c-32.317,0-58.608,26.291-58.608,58.608   S116.193,117.216,148.51,117.216z" />
                                                <path d="m227.154,145.618c-0.025-0.008-0.073-0.026-0.098-0.032-7.631-1.864-30.999-5.133-30.999-5.133-2.638-0.812-5.457,0.585-6.406,3.188l-35.174,96.509c-2.029,5.567-9.903,5.567-11.932,0l-35.174-96.509c-0.766-2.102-2.75-3.42-4.876-3.42-0.504,0-24.531,3.369-32.53,5.358-21.858,5.435-35.645,26.929-35.645,49.329v80.302c0,12.034 9.756,21.79 21.79,21.79h184.782c12.034,0 21.79-9.756 21.79-21.79v-80.569c-0.001-22.303-14.328-42.096-35.528-49.023z" />
                                                <path d="m161.775,138.613c-1.404-1.53-3.456-2.299-5.532-2.299h-15.485c-2.076,0-4.129,0.77-5.532,2.299-2.173,2.368-2.489,5.789-0.946,8.462l8.278,12.479-3.875,32.69 7.631,20.3c0.744,2.042 3.631,2.042 4.375,0l7.631-20.3-3.875-32.69 8.278-12.479c1.541-2.673 1.225-6.094-0.948-8.462z" />
                                            </g>
                                        </svg>
                                    </div>
                                    <div className='block text-center md:text-left gap-3'>
                                        <p className='text-sm leading-6 text-[#636363]'>Managers</p>
                                        <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>{dashboardOverview ? dashboardOverview.noOfManager : 0}</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href='/users' >
                                <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                                    <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                                        <Profile2User size={24} className='text-[#D4AA00]' variant='Bold' />
                                    </div>
                                    <div className='block text-center md:text-left gap-3'>
                                        <p className='text-sm leading-6 text-[#636363]'>Customers</p>
                                        <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>{dashboardOverview ? dashboardOverview.noOfCustomers : 0}</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href="/bookings/request">
                                <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                                    <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                                        <MessageEdit size={24} className='text-[#D4AA00]' variant='Bold' />
                                    </div>
                                    <div className='block text-center md:text-left gap-3'>
                                        <p className='text-sm leading-6 text-[#636363]'>Booking Request</p>
                                        <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>{dashboardOverview ? dashboardOverview.bookingRequests : 0}</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href='/bookings/todaybooked' >
                                <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                                    <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                                        <Book size={24} className='text-[#D4AA00]' variant='Bold' />
                                    </div>
                                    <div className='block text-center md:text-left gap-3'>
                                        <p className='text-sm leading-6 text-[#636363]'>Today Booked</p>
                                        <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>{dashboardOverview ? dashboardOverview.todayBooked : 0}</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href='/bookings/running' >
                                <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                                    <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                                        <Calendar size={24} className='text-[#D4AA00]' variant='Bold' />
                                    </div>
                                    <div className='block text-center md:text-left gap-3'>
                                        <p className='text-sm leading-6 text-[#636363]'>Running Booking</p>
                                        <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>{dashboardOverview ? dashboardOverview.runningBookings : 0}</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href='/bookings/cancelled' >
                                <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                                    <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                                        <Slash size={24} className='text-[#D4AA00]' variant='Bold' />
                                    </div>
                                    <div className='block text-center md:text-left gap-3'>
                                        <p className='md:text-[0.75rem] text-xs sm:text-sm leading-6 text-[#636363]'>Cancelled Booking</p>
                                        <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>{dashboardOverview ? dashboardOverview.cancelledBookings : 0}</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href='/bookings/confirmed' >
                                <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                                    <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                                        <Slash size={24} className='text-[#D4AA00]' variant='Bold' />
                                    </div>
                                    <div className='block text-center md:text-left gap-3'>
                                        <p className='md:text-[0.75rem] text-xs sm:text-sm leading-6 text-[#636363]'>Confirmed Booking</p>
                                        <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>{dashboardOverview ? dashboardOverview.confirmedBookings : 0}</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href='/bookings/payments' >
                                <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                                    <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                                        <Money2 size={24} className='text-[#D4AA00]' variant='Bold' />
                                    </div>
                                    <div className='block text-center md:text-left gap-3'>
                                        <p className='text-sm leading-6 text-[#636363]'>Total Payment</p>
                                        <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>NGN {dashboardOverview ? dashboardOverview.totalPayment : 0}</p>
                                    </div>
                                </div>
                            </Link>

                            <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                                <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                                    <StatusUp size={24} className='text-[#D4AA00]' variant='Bold' />
                                </div>
                                <div className='block text-center md:text-left gap-3'>
                                    <p className='text-sm leading-6 text-[#636363]'>Transactions</p>
                                    <p className='text-xl leading-10 font-semibold text-[#1a1a1a]'>{dashboardOverview ? dashboardOverview.transactions : 0}</p>
                                </div>
                            </div>

                        </div>
                    </div>}

                </div>
            </Layout>
        </div>
    )
}

export default Dashboard;