import { forwardRef, useEffect, useRef, useState } from 'react';
import { Checkbox, FormControlLabel, TextField, Button, Card, CardContent, FormControl, InputLabel, Select, MenuItem, CircularProgress, Snackbar } from '@mui/material'
import { ArrowLeft2 } from 'iconsax-react'
import { get, postData } from '../../helpers/ApiRequest'
import MuiAlert from '@mui/material/Alert';
import Layout from '../../components/Layout'
import { useRouter } from 'next/router';


function NewUser() {

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const saveHotel = async () => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append("FullName", fullName)
        formData.append("City", city)
        formData.append("Gender", gender)
        formData.append("Email", email)
        formData.append("PhoneNumber", phone)
        formData.append("ProfileImageFile", userImageFile)
        formData.append("AccountType", role)

        const response = await postData('User/Create', formData)
        if (response.successful) {
            showAlert('User saved successfully', 'success')
        } else {
            showAlert(response.data, 'error')
        }
        setIsLoading(false)
    }

    const handleClick = () => {
        // 👇️ open file input box on click of other element
        inputRef.current.click();
    };

    const handleChange = (event) => {
        setSelectedManager(event.target.value)
    }

    const clearImage = (event) => {
        setUserImageFile('')
        setUserImageSrc('')
    }

    const handleFileChange = e => {
        setUserImageFile(e.target.files[0])
        const reader = new FileReader();
        reader.onload = function (e) {
            setUserImageSrc(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const showAlert = (alertMessage, alertType) => {
        setAlertMessage(alertMessage)
        setOpen(true)
        setAlertType(alertType)
    }

    const goBack = () => {
        router.back()
    }

    //states
    const inputRef = useRef(null);
    const [fullName, setFullName] = useState('');
    const [city, setCity] = useState('');
    const [gender, setGender] = useState('Male');
    const [genders, setGenders] = useState(['Male', 'Female']);
    const [userRoles, setUserRoles] = useState(['Admin', 'Manager', 'Staff', 'Customer']);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('Admin');
    const [userImageFile, setUserImageFile] = useState();
    const [userImageSrc, setUserImageSrc] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const router = useRouter()


    return (
        <div className='min-h-screen font-poppins'>
            <Layout>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                        {alertMessage}
                    </Alert>
                </Snackbar>

                <div className='w-full h-full py-6 flex flex-col gap-4'>

                    <div className='flex items-end justify-between w-full'>

                        <p className='w-full block text-base font-medium text-[#1A1A1A] leading-6'>
                            Add New User
                        </p>

                        <div onClick={goBack} className="px-2 py-1 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-600 hover:text-gray-800">
                            <ArrowLeft2 size={14} />
                            <span className="text-xs font-medium leading-6">Back</span>
                        </div>
                    </div>

                    <div className='bg-white drop-shadow-sm rounded-lg w-full overflow-auto p-4'>
                        <div className="flex md:flex-row flex-col items-start gap-3 w-full h-full">

                            <div className='item md:w-1/3 w-full h-full'>
                                <div className='flex flex-col gap-3 items-center'>

                                    <div className="rounded-lg h-28 w-28 bg-[#1A1A1A]/25 flex items-center cursor-pointer" onClick={handleClick}>

                                        {!userImageFile ? <span className='flex items-center justify-center m-auto'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5.74 16c.11-.49-.09-1.19-.44-1.54l-2.43-2.43c-.76-.76-1.06-1.57-.84-2.27.23-.7.94-1.18 2-1.36l3.12-.52c.45-.08 1-.48 1.21-.89l1.72-3.45C10.58 2.55 11.26 2 12 2s1.42.55 1.92 1.54l1.72 3.45c.13.26.4.51.69.68L5.56 18.44c-.14.14-.38.01-.34-.19L5.74 16ZM18.7 14.462c-.36.36-.56 1.05-.44 1.54l.69 3.01c.29 1.25.11 2.19-.51 2.64a1.5 1.5 0 0 1-.9.27c-.51 0-1.11-.19-1.77-.58l-2.93-1.74c-.46-.27-1.22-.27-1.68 0l-2.93 1.74c-1.11.65-2.06.76-2.67.31-.23-.17-.4-.4-.51-.7l12.16-12.16c.46-.46 1.11-.67 1.74-.56l1.01.17c1.06.18 1.77.66 2 1.36.22.7-.08 1.51-.84 2.27l-2.42 2.43Z" fill="#666666"></path></svg>
                                        </span> :
                                            <img src={userImageSrc} className='rounded-lg h-28 w-28 bg-[#1A1A1A]/25 object-fill' />}
                                    </div>

                                    <input
                                        style={{ display: 'none' }}
                                        ref={inputRef}
                                        type="file"
                                        onChange={handleFileChange}
                                    />

                                    <button
                                        type="button"
                                        className="text-white font-medium flex items-center px-3 py-2 rounded-md bg-[#1a1a1a]/50 text-xs leading-6 uppercase hover:bg-[#636363]"
                                        onClick={handleClick}
                                    >
                                        Upload photo
                                    </button>

                                    <button
                                        type="button"
                                        className="text-[#666666] font-medium flex items-center px-3 py-1.5 rounded-md border-[#1a1a1a]/50 border text-xs leading-6 uppercase hover:bg-[#636363] hover:text-white"
                                        onClick={clearImage}
                                    >
                                        Reset
                                    </button>

                                    <span className="text-xs leading-5 font-normal">
                                        Allow JPEG, GIF, or PNG. Max size of 800KB
                                    </span>
                                </div>
                            </div>

                            <div className='item w-full h-full'>
                                <div className='flex flex-col gap-4 w-full'>

                                    <div className="flex flex-col space-y-1" >
                                        <label className='text-xs font-medium leading-5 text-gray-700'>Full Name</label>
                                        <input
                                            type='text'
                                            placeholder='Full Name'
                                            className='w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md'
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-1" >
                                        <label className='text-xs font-medium leading-5 text-gray-700'>Email Address</label>
                                        <input
                                            type='email'
                                            placeholder='Email Address'
                                            className='w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-1" >
                                        <label className='text-xs font-medium leading-5 text-gray-700'>Phone Number</label>
                                        <input
                                            type='phone'
                                            placeholder='Phone Number'
                                            className='w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md'
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-1" >
                                        <label className='text-xs font-medium leading-5 text-gray-700'>State/City</label>
                                        <input
                                            type='text'
                                            placeholder='State/City'
                                            className='w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md'
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-1" >
                                        <label className='text-xs font-medium leading-5 text-gray-700'>Gender</label>
                                        <select
                                            className='w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md'
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                        >
                                            {genders.map((gen) => <option>{gen}</option>)}
                                        </select>
                                    </div>

                                    <div className="flex flex-col space-y-1" >
                                        <label className='text-xs font-medium leading-5 text-gray-700'>User Role</label>
                                        <select
                                            className='w-full border border-[#666666]/50 placeholder:text-[#636363] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md'
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            {userRoles.map((rol) => <option>{rol}</option>)}
                                        </select>
                                    </div>


                                    <div className="flex items-center w-full gap-4">
                                        <button
                                            type="button"
                                            className="text-white font-medium flex items-center px-3 py-2 rounded-md bg-[#1a1a1a]/50 text-xs leading-6 uppercase hover:bg-[#636363]"
                                            onClick={saveHotel}
                                            disabled={!fullName || !email || !phone || !city || !role || !gender}
                                        >
                                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                                        </button>

                                        <button
                                            type="button"
                                            className="text-[#666666] font-medium flex items-center px-3 py-1.5 rounded-md border-[#1a1a1a]/50 border text-xs leading-6 uppercase hover:bg-[#636363] hover:text-white"
                                            onClick={goBack}
                                        >
                                            Cancel
                                        </button>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </div>
    )
}

export default NewUser;