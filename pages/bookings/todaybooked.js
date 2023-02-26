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

function TodayBooked() {

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

    const goBack = () => {
        router.back()
    }

    const router = useRouter()


    return (
        <div className='h-full font-poppins'>
            <Layout>
                <div className='w-full h-auto py-6 flex flex-col gap-6'>
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

                    {/* <div className='grid md:grid-cols-3 grid-cols-2 w-full h-auto items-center gap-x-2 gap-y-3'> */}

                    <TodayBookedCard />
                    {/* <div className='flex flex-col w-full box rounded-2xl bg-white border-[1.5px] border-[#E4E4E4] items-center md:items-start p-4 md:px-4 py-6 h-auto'>
                            <div className='hidden group cursor-pointer -mt-3 md:flex justify-end w-full'>
                                <p className='text-xs font-normal cursor-pointer leading-5 tracking-wide hover:underline text-[#636363] bg-[#e4e4e4] rounded-md items-end px-1 w-auto'>
                                    View
                                </p>
                            </div>
                            <div className="md:-mt-4 w-full box flex md:flex-row flex-col md:items-start items-center gap-4">
                                <div className='p-4 bg-[#FFF7D8] text-[#D4AA00] text-base tracking-wide leading-6 text-center font-medium border-[1.5px] border-[#ffcc00] rounded-full justify-center'>
                                    102
                                </div>
                                <div className='w-full text-center md:text-left'>
                                    <p className='text-base leading-8 font-medium text-[#1a1a1a]'>Uzoma Chijioke Samuel </p>
                                    <p className='text-xs leading-6 font-normal text-[#636363]'>Booking Number: SCRWAQJ1C3PG </p>
                                    <p className='text-xs leading-6 font-normal text-[#636363]'>Room Type: Mini </p>
                                    <p className='text-xs leading-6 font-normal text-[#636363]'>Hotel: Gold Range Hotel & Suites </p>
                                </div>
                            </div>
                        </div> */}

                    {/* </div> */}
                </div>

                <div className='w-full h-screen py-6 flex flex-col gap-6'>
                    <div className='flex justify-between w-full'>
                        <p className='w-full block text-xl font-medium text-[#1A1A1A] leading-8'>
                            Available for boking
                        </p>
                    </div>

                    {/* <div className='grid md:grid-cols-3 grid-cols-2 w-full h-auto items-center gap-x-2 gap-y-3'> */}
                        <AvailableForBookingCard />

                        {/* <div className="box rounded-2xl bg-white border-[1.5px] border-[#E4E4E4] flex flex-col items-center p-4 md:p-6 gap-4 h-auto">
                            <div className='p-4 bg-[#F6F6F6] text-[#636363] text-base tracking-wide leading-6 text-center font-medium rounded-full justify-center'>
                                102
                            </div>
                            <div className='block text-center'>
                                <p className='text-xs leading-6 font-normal text-[#636363]'>Room Type: Mini </p>
                                <p className='text-xs leading-6 font-normal text-[#636363]'>Hotel: Gold Range Hotel & Suites </p>
                            </div>
                        </div> */}

                    {/* </div> */}
                </div>

            </Layout>
        </div>
    )
}

export default TodayBooked;