import { Checkbox, FormControlLabel, TextField, Button, Card, CardContent, FormControl, InputLabel, Select, MenuItem, CircularProgress, Snackbar } from '@mui/material';
import { Buliding, Book, Calendar, Slash, Money2, CalendarTick, MessageEdit } from 'iconsax-react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { get, postData } from '../../helpers/ApiRequest';
import MuiAlert from '@mui/material/Alert';
import Layout from '../../components/Layout';
import Link from 'next/link';

function AllBookings() {

    // const Alert = forwardRef(function Alert(props, ref) {
    //     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    // });

    // const saveHotel = async () => {
    //     setIsLoading(true)
    //     const formData = new FormData()
    //     formData.append("FullName", fullName)
    //     formData.append("City", city)
    //     formData.append("Gender", gender)
    //     formData.append("Email", email)
    //     formData.append("PhoneNumber", phone)
    //     formData.append("ProfileImageFile", userImageFile)
    //     formData.append("AccountType", role)

    //     const response = await postData('User/Create', formData)
    //     if (response.successful) {
    //         showAlert('User saved successfully', 'success')
    //     } else {
    //         showAlert(response.data, 'error')
    //     }
    //     setIsLoading(false)
    // }

    // const handleClick = () => {
    //     // 👇️ open file input box on click of other element
    //     inputRef.current.click();
    // };

    // const handleChange = (event) => {
    //     setSelectedManager(event.target.value)
    // }

    // const clearImage = (event) => {
    //     setUserImageFile('')
    //     setUserImageSrc('')
    // }

    // const handleFileChange = e => {
    //     setUserImageFile(e.target.files[0])
    //     const reader = new FileReader();
    //     reader.onload = function (e) {
    //         setUserImageSrc(e.target.result);
    //     };
    //     reader.readAsDataURL(e.target.files[0]);
    // };

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }

    //     setOpen(false);
    // };


    // const showAlert = (alertMessage, alertType) => {
    //     setAlertMessage(alertMessage)
    //     setOpen(true)
    //     setAlertType(alertType)
    // }

    // //states
    // const inputRef = useRef(null);
    // const [fullName, setFullName] = useState('');
    // const [city, setCity] = useState('');
    // const [gender, setGender] = useState('');
    // const [genders, setGenders] = useState(['Male', 'Female']);
    // const [userRoles, setUserRoles] = useState(['Admin', 'Manager', 'Staff']);
    // const [email, setEmail] = useState('');
    // const [phone, setPhone] = useState('');
    // const [role, setRole] = useState('');
    // const [userImageFile, setUserImageFile] = useState();
    // const [userImageSrc, setUserImageSrc] = useState();
    // const [isLoading, setIsLoading] = useState(false);
    // const [open, setOpen] = useState(false);
    // const [alertType, setAlertType] = useState('');
    // const [alertMessage, setAlertMessage] = useState('');


    return (
        <div className='h-full font-poppins'>
            <Layout>
                <div className='w-full h-screen py-6 flex flex-col gap-6'>
                    <p className='w-full block text-xl font-medium text-[#1A1A1A] leading-8'>
                        Bookings
                    </p>

                    <div className='grid md:grid-cols-4 grid-cols-2 w-full h-auto items-center gap-x-2 gap-y-3'>

                        <Link href='/bookings/todaybooked' >
                            <div className="hover:shadow-sm box rounded-2xl bg-white border-[1.5px] border-[#E4E4E4] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-4 h-auto">
                                <div className='p-4 bg-[#F6F6F6] rounded-full justify-center'>
                                    <Book size={24} className='text-[#636363]' variant='Bold' />
                                </div>
                                <div className='block text-center md:text-left gap-3'>
                                    <p className='text-sm leading-6 text-[#636363]'>Today Booked</p>
                                    <p className='text-2xl leading-10 font-semibold text-[#1a1a1a]'>12</p>
                                </div>
                            </div>
                        </Link>


                        <Link href='/bookings/running' >
                            <div className="hover:shadow-sm box rounded-2xl bg-white border-[1.5px] border-[#E4E4E4] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-4 h-auto">
                                <div className='p-4 bg-[#F6F6F6] rounded-full justify-center'>
                                    <Calendar size={24} className='text-[#636363]' variant='Bold' />
                                </div>
                                <div className='block text-center md:text-left gap-3'>
                                    <p className='text-sm leading-6 text-[#636363]'>Running Booking</p>
                                    <p className='text-2xl leading-10 font-semibold text-[#1a1a1a]'>21</p>
                                </div>
                            </div>
                        </Link>


                        <Link href='/bookings/request' >
                            <div className="hover:shadow-sm box rounded-2xl bg-white border-[1.5px] border-[#E4E4E4] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-4 h-auto">
                                <div className='p-4 bg-[#F6F6F6] rounded-full justify-center'>
                                    <MessageEdit size={24} className='text-[#636363]' variant='Bold' />
                                </div>
                                <div className='block text-center md:text-left gap-3'>
                                    <p className='text-sm leading-6 text-[#636363]'>Booking Request</p>
                                    <p className='text-2xl leading-10 font-semibold text-[#1a1a1a]'>3</p>
                                </div>
                            </div>
                        </Link>


                        <Link href='/bookings/available'>
                            <div className="hover:shadow-sm box rounded-2xl bg-white border-[1.5px] border-[#E4E4E4] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-4 h-auto">
                                <div className='p-4 bg-[#F6F6F6] rounded-full justify-center'>
                                    <Buliding size={24} className='text-[#636363]' variant='Bold' />
                                </div>
                                <div className='block text-center md:text-left gap-3'>
                                    <p className='text-xs md:text-sm leading-6 text-[#636363]'>Available Rooms</p>
                                    <p className='text-2xl leading-10 font-semibold text-[#1a1a1a]'>18</p>
                                </div>
                            </div>
                        </Link>


                        <Link href='/bookings/cancelled' >
                            <div className="hover:shadow-sm box rounded-2xl bg-white border-[1.5px] border-[#E4E4E4] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-4 h-auto">
                                <div className='p-4 bg-[#F6F6F6] rounded-full justify-center'>
                                    <Slash size={24} className='text-[#636363]' variant='Bold' />
                                </div>
                                <div className='block text-center md:text-left gap-3'>
                                    <p className='text-xs md:text-sm leading-6 text-[#636363]'>Cancelled Bookings</p>
                                    <p className='text-2xl leading-10 font-semibold text-[#1a1a1a]'>18</p>
                                </div>
                            </div>
                        </Link>


                        <Link href='/' >
                            <div className="hover:shadow-sm box rounded-2xl bg-white border-[1.5px] border-[#E4E4E4] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-4 h-auto">
                                <div className='p-4 bg-[#F6F6F6] rounded-full justify-center'>
                                    <CalendarTick size={24} className='text-[#636363]' variant='Bold' />
                                </div>
                                <div className='block text-center md:text-left gap-3'>
                                    <p className='text-sm leading-6 text-[#636363]'>Total Bookings</p>
                                    <p className='text-2xl leading-10 font-semibold text-[#1a1a1a]'>21</p>
                                </div>
                            </div>
                        </Link>


                        <Link href='/' >
                            <div className="hover:shadow-sm box rounded-2xl bg-white border-[1.5px] border-[#E4E4E4] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-4 h-auto">
                                <div className='p-4 bg-[#F6F6F6] rounded-full justify-center'>
                                    <Money2 size={24} className='text-[#636363]' variant='Bold' />
                                </div>
                                <div className='block text-center md:text-left gap-3'>
                                    <p className='text-sm leading-6 text-[#636363]'>Total Payment</p>
                                    <p className='text-2xl leading-10 font-semibold text-[#1a1a1a]'>NGN 300K</p>
                                </div>
                            </div>
                        </Link>

                        {/* <div className="box rounded-2xl bg-white border-[1.5px] border-[#E4E4E4] w-full flex flex-col m-auto justify-center p-6 px-16 gap-4 h-auto">
                            <div className='bg-[#F6F6F6] flex justify-center mx-auto p-4 rounded-full'>
                                <Book size={24} className='text-[#636363]' variant='Bold' />
                            </div>
                            <div className='block text-center gap-3'>
                                <p className='text-sm leading-6 text-[#636363]'>Today booked</p>
                                <p className='text-2xl leading-10 font-semibold text-[#1a1a1a]'>10</p>
                            </div>
                        </div> */}

                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default AllBookings;