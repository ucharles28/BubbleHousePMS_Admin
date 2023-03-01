import { Checkbox, FormControlLabel, TextField, Button, Card, CardContent, FormControl, InputLabel, Select, MenuItem, CircularProgress, Snackbar } from '@mui/material';
import { People, Buildings, Buliding, Book, Notepad2, Calendar, Slash, Money2, CalendarAdd, StatusUp, Profile2User, MessageEdit } from 'iconsax-react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import Sidebar from '../components/SideBar';
import { get, postData } from '../helpers/ApiRequest';
import MuiAlert from '@mui/material/Alert';
import Layout from '../components/Layout';
import { PieChart, Pie, Cell } from "recharts";

function Dashboard() {

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
    const data = [
        {
            name: "Group A",
            value: 150,
        },
        {
            name: "Group B",
            value: 390,
        }
    ];
    const COLORS = [
        "#636363",
        "#FFCC00"
    ];


    return (
        <div className='h-full font-poppins'>
            <Layout>
                <div className='w-full h-full py-6 flex flex-col gap-6'>
                    <p className='w-full block text-xl font-medium text-[#1A1A1A] leading-8'>
                        Overview
                    </p>

                    <div className='flex flex-col md:flex-row w-full h-auto items-center gap-3 mb-3'>

                        <div className="rounded-2xl bg-white  border border-[#FFDD55] w-full md:w-auto flex flex-col justify-center items-center p-4 md:p-6 gap-2 h-auto">
                            <p className='text-lg leading-8 font-medium text-[#1a1a1a]'>
                                Available RoomS Today
                            </p>

                            <PieChart width={180} height={180}>
                                <Pie
                                    data={data}
                                    innerRadius={55}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={1}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
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
                                    <p className='text-xs font-medium leading-6 text-[#1A1A1A]'> 120 </p>
                                </div>
                                <div className='flex items-center w-full justify-between gap-2'>
                                    <p className='text-xs font-normal leading-6 flex items-center gap-2 text-[#636363]'>
                                        <span className='w-5 h-3 bg-gray-600 rounded-sm'></span>
                                        Booked rooms
                                    </p>
                                    <p className='text-xs font-medium leading-6 text-[#1A1A1A]'> 38 </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='grid md:grid-cols-4 grid-cols-2 w-full h-auto items-center gap-3'>

                        <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                            <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                                <Buildings size={24} className='text-[#D4AA00]' variant='Bold' />
                            </div>
                            <div className='block text-center md:text-left gap-3'>
                                <p className='text-sm leading-6 text-[#636363]'>Hotels</p>
                                <p className='text-2xl leading-10 font-semibold text-[#1a1a1a]'>10</p>
                            </div>
                        </div>

                        <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                            <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                                <Profile2User size={24} className='text-[#D4AA00]' variant='Bold' />
                            </div>
                            <div className='block text-center md:text-left gap-3'>
                                <p className='text-sm leading-6 text-[#636363]'>Customers</p>
                                <p className='text-2xl leading-10 font-semibold text-[#1a1a1a]'>900</p>
                            </div>
                        </div>

                        <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                            <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                                <Profile2User size={24} className='text-[#D4AA00]' variant='Bold' />
                            </div>
                            <div className='block text-center md:text-left gap-3'>
                                <p className='text-sm leading-6 text-[#636363]'>Managers</p>
                                <p className='text-2xl leading-10 font-semibold text-[#1a1a1a]'>10</p>
                            </div>
                        </div>

                        <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                            <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                                <Profile2User size={24} className='text-[#D4AA00]' variant='Bold' />
                            </div>
                            <div className='block text-center md:text-left gap-3'>
                                <p className='text-sm leading-6 text-[#636363]'>Staff</p>
                                <p className='text-2xl leading-10 font-semibold text-[#1a1a1a]'>100</p>
                            </div>
                        </div>

                        <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                            <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                                <Book size={24} className='text-[#D4AA00]' variant='Bold' />
                            </div>
                            <div className='block text-center md:text-left gap-3'>
                                <p className='text-sm leading-6 text-[#636363]'>Today Booked</p>
                                <p className='text-2xl leading-10 font-semibold text-[#1a1a1a]'>12</p>
                            </div>
                        </div>

                        <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                            <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                                <MessageEdit size={24} className='text-[#D4AA00]' variant='Bold' />
                            </div>
                            <div className='block text-center md:text-left gap-3'>
                                <p className='text-sm leading-6 text-[#636363]'>Booking Request</p>
                                <p className='text-2xl leading-10 font-semibold text-[#1a1a1a]'>3</p>
                            </div>
                        </div>

                        <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                            <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                                <Calendar size={24} className='text-[#D4AA00]' variant='Bold' />
                            </div>
                            <div className='block text-center md:text-left gap-3'>
                                <p className='text-sm leading-6 text-[#636363]'>Running Booking</p>
                                <p className='text-2xl leading-10 font-semibold text-[#1a1a1a]'>21</p>
                            </div>
                        </div>

                        <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                            <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                                <Slash size={24} className='text-[#D4AA00]' variant='Bold' />
                            </div>
                            <div className='block text-center md:text-left gap-3'>
                                <p className='text-xs md:text-sm leading-6 text-[#636363]'>Cancelled Booking</p>
                                <p className='text-2xl leading-10 font-semibold text-[#1a1a1a]'>18</p>
                            </div>
                        </div>

                        <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                            <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                                <Money2 size={24} className='text-[#D4AA00]' variant='Bold' />
                            </div>
                            <div className='block text-center md:text-left gap-3'>
                                <p className='text-sm leading-6 text-[#636363]'>Total Payment</p>
                                <p className='text-2xl leading-10 font-semibold text-[#1a1a1a]'>NGN 300K</p>
                            </div>
                        </div>

                        <div className="box rounded-2xl bg-white  border border-[#FFDD55] flex md:flex-row flex-col items-center md:items-start p-4 md:p-6 pb-6 md:pb-8 gap-5 h-auto">
                            <div className='p-4 bg-[#fff7d8] rounded-full justify-center'>
                                <StatusUp size={24} className='text-[#D4AA00]' variant='Bold' />
                            </div>
                            <div className='block text-center md:text-left gap-3'>
                                <p className='text-sm leading-6 text-[#636363]'>Transactions</p>
                                <p className='text-2xl leading-10 font-semibold text-[#1a1a1a]'>21</p>
                            </div>
                        </div>

                    </div>

                </div>
            </Layout>
        </div>
    )
}

export default Dashboard;