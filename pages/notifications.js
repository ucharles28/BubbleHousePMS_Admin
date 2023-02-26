import { Checkbox, FormControlLabel, TextField, Button, Card, CardContent, FormControl, InputLabel, Select, MenuItem, CircularProgress, Snackbar } from '@mui/material'
import { People, Buildings, Buliding, Book, DirectNotification, Calendar, Slash, Money2, CalendarAdd, StatusUp, Profile2User } from 'iconsax-react'
import { forwardRef, useEffect, useRef, useState } from 'react'
import Sidebar from '../components/SideBar'
import { get, postData } from '../helpers/ApiRequest'
import MuiAlert from '@mui/material/Alert';
import Layout from '../components/Layout'


function Notifications() {

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
                <div className='w-full h-screen py-6 flex flex-col gap-4'>
                    
                    <p className='w-full block text-xl font-medium text-[#1A1A1A] leading-8'>
                        Notifications
                    </p>

                    <div className='w-full h-auto flex flex-col items-center gap-3'>

                        <div className='bg-white w-full rounded-md p-2 px-3 flex items-start border border-[#E4E4E4] gap-2'>
                            <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                                <DirectNotification className="h-4 w-4 text-green-600" />
                            </div>
                            <div className='flex flex-col w-full '>
                                <p className='text-sm text-[#1a1a1a] font-medium italic leading-6'>New Notification</p>
                                <p className='text-xs text-[#636363] leading-5'>Ipsum ad pariatur voluptate elit sunt.</p>
                            </div>
                        </div>

                        <div className='bg-white w-full rounded-md p-2 px-3 flex items-start border border-[#E4E4E4] gap-2'>
                            <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                                <DirectNotification className="h-4 w-4 text-green-600" />
                            </div>
                            <div className='flex flex-col w-full '>
                                <p className='text-sm text-[#1a1a1a] font-medium italic leading-6'>New Notification</p>
                                <p className='text-xs text-[#636363] leading-5'>Ipsum ad pariatur voluptate elit sunt.</p>
                            </div>
                        </div>

                        <div className='bg-white w-full rounded-md p-2 px-3 flex items-start border border-[#E4E4E4] gap-2'>
                            <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                                <DirectNotification className="h-4 w-4 text-green-600" />
                            </div>
                            <div className='flex flex-col w-full '>
                                <p className='text-sm text-[#1a1a1a] font-medium italic leading-6'>New Notification</p>
                                <p className='text-xs text-[#636363] leading-5'>Ipsum ad pariatur voluptate elit sunt.</p>
                            </div>
                        </div>

                        <div className='bg-white w-full rounded-md p-2 px-3 flex items-start border border-[#E4E4E4] gap-2'>
                            <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                                <DirectNotification className="h-4 w-4 text-green-600" />
                            </div>
                            <div className='flex flex-col w-full '>
                                <p className='text-sm text-[#1a1a1a] font-medium italic leading-6'>New Notification</p>
                                <p className='text-xs text-[#636363] leading-5'>Ipsum ad pariatur voluptate elit sunt.</p>
                            </div>
                        </div>


                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Notifications;