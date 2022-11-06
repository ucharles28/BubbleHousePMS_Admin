import { Checkbox, FormControlLabel, TextField, Button, Card, CardContent, FormControl, InputLabel, Select, MenuItem, CircularProgress, Snackbar } from '@mui/material'
import { People } from 'iconsax-react'
import { forwardRef, useEffect, useRef, useState } from 'react'
import Sidebar from '../components/SideBar'
import { get, postData } from '../helpers/ApiRequest'
import MuiAlert from '@mui/material/Alert';


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


    return (
        <div className='font-poppins h-full bg-[#F4F5FA]' >
            <Sidebar />
            <div className='ml-64 mt-3' >
                <div className='grid overflow-hidden grid-cols-3 h-auto items-center gap-3 mt-5'>
                    <div className="box rounded-lg h-28 w-80 bg-white grid grid-cols-2">
                        <People size={60} className='m-5' strokeWidth={10}/>
                        <div className='grid grid-row-2 gap-x-0 p-6'>
                            <span className='text-sm flex justify-end font-poppins'>Customer</span>
                            <span className='text-lg font-bold flex justify-end'>100</span>
                        </div>
                    </div>
                    <div className="box rounded-lg h-28 w-80 bg-white grid grid-cols-2">
                        <People size={60} className='m-5'/>
                        <div className='grid grid-row-2 gap-x-0 p-6'>
                            <span className='text-sm flex justify-end font-poppins'>Hotels</span>
                            <span className='text-lg font-bold flex justify-end'>96</span>
                        </div>
                    </div>
                    <div className="box rounded-lg h-28 w-80 bg-white grid grid-cols-2">
                        <People size={60} className='m-5'/>
                        <div className='grid grid-row-2 gap-x-0 p-6'>
                            <span className='text-sm flex justify-end font-poppins'>Available Rooms</span>
                            <span className='text-lg font-bold flex justify-end'>100</span>
                        </div>
                    </div>
                    <div className="box rounded-lg h-28 w-80 bg-white grid grid-cols-2">
                        <People size={60} className='m-5'/>
                        <div className='grid grid-row-2 gap-x-0 p-6'>
                            <span className='text-lg font-bold flex justify-end'>8</span>
                            <span className='text-sm flex justify-end font-poppins'>Today's Booked Rooms</span>
                        </div>
                    </div>
                    <div className="box rounded-lg h-28 w-80 bg-white grid grid-cols-2">
                        <People size={60} className='m-5'/>
                        <div className='grid grid-row-2 gap-x-0 py-6 pr-6'>
                            <span className='text-lg font-bold flex justify-end'>365</span>
                            <span className='text-sm flex justify-end font-poppins'>Booking's Request</span>
                        </div>
                    </div>
                    <div className="box rounded-lg h-28 w-80 bg-white grid grid-cols-2">
                        <People size={60} className='m-5'/>
                        <div className='grid grid-row-2 gap-x-0 py-6 pr-6'>
                            <span className='text-lg font-bold flex justify-end'>100</span>
                            <span className='text-sm flex justify-end font-poppins'>Running Booking</span>
                        </div>
                    </div>
                    <div className="box rounded-lg h-28 w-80 bg-white grid grid-cols-2">
                        <People size={60} className='m-5'/>
                        <div className='grid grid-row-2 gap-x-0 py-6 pr-6'>
                            <span className='text-lg font-bold flex justify-end'>34</span>
                            <span className='text-sm flex justify-end font-poppins'>Canceled Booking</span>
                        </div>
                    </div>
                    <div className="box rounded-lg h-28 w-80 bg-white grid grid-cols-2">
                        <People size={60} className='m-5'/>
                        <div className='grid grid-row-2 gap-x-0 py-6 pr-6'>
                            <span className='text-lg font-bold flex justify-end'>$45,987</span>
                            <span className='text-sm flex justify-end font-poppins'>Total Payment</span>
                        </div>
                    </div>
                    <div className="box rounded-lg h-28 w-80 bg-white grid grid-cols-2">
                        <People size={60} className='m-5'/>
                        <div className='grid grid-row-2 gap-x-0 py-6 pr-6'>
                            <span className='text-lg font-bold flex justify-end'>$45,987</span>
                            <span className='text-sm flex justify-end font-poppins'>Pending Payment</span>
                        </div>
                    </div>
                    <div className="box rounded-lg h-28 w-80 bg-white grid grid-cols-2">
                        <People size={60} className='m-5'/>
                        <div className='grid grid-row-2 gap-x-0 py-6 pr-6'>
                            <span className='text-lg font-bold flex justify-end'>$45,987</span>
                            <span className='text-sm flex justify-end font-poppins'>Pending Payment</span>
                        </div>
                    </div>
                    <div className="box rounded-lg h-28 w-80 bg-white grid grid-cols-2">
                        <People size={60} className='m-5'/>
                        <div className='grid grid-row-2 gap-x-0 py-6 pr-6'>
                            <span className='text-lg font-bold flex justify-end'>$45,987</span>
                            <span className='text-sm flex justify-end font-poppins'>Pending Payment</span>
                        </div>
                    </div>
                    <div className="box rounded-lg h-28 w-80 bg-white grid grid-cols-2">
                        <People size={60} className='m-5'/>
                        <div className='grid grid-row-2 gap-x-0 py-6 pr-6'>
                            <span className='text-lg font-bold flex justify-end'>$45,987</span>
                            <span className='text-sm flex justify-end font-poppins'>Pending Payment</span>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Dashboard;