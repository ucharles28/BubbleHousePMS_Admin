import { ArrowLeft2, Call, DirectNotification, Notification, Send2 } from 'iconsax-react';
import { FiMoreVertical } from 'react-icons/fi';
import { forwardRef, Fragment, useEffect, useRef, useState } from 'react';
import { get, postData } from '../helpers/ApiRequest';
import Layout from '../components/Layout';
import { Checkbox, FormControlLabel, TextField, Button, Card, CardContent, FormControl, InputLabel, Select, MenuItem, CircularProgress, Snackbar } from '@mui/material';
import Link from 'next/link';
import { Menu, Transition, Popover } from "@headlessui/react";
import { useRouter } from 'next/router';
import { Drawer } from 'antd';


function Notifications() {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const { query } = useRouter();
    const id = query.id;

    const getAllManagers = async () => {
        const response = await get('User/GetAllManagers')
        if (response.successful) {
            setManagers(response.data)
        }
    }

    const getHotelById = async () => {
        // setIsLoading(true)
        const response = await get(`Hotel/${id}`)
        if (response.successful) {
            // console.log(response.data)
            // setHotelName(response.data.name)
            // setDescription(response.data.description)
            // setEmail(response.data.email)
            // setPhone(response.data.phoneNumber)
            // setAltPhone(response.data.altPhoneNumber)
            // setNumberOfRooms(response.data.numberOfRooms)
            setSelectedManager(response.data.managerId)
            // setHotelImageSrc(response.data.imageUrl)
            // setCity(response.data.city)
            // setAddress(response.data.address.line)
            // setIsFeatured(response.data.isFeatured ? "Yes" : "No")
            console.log(selectedManager)
        } else {

        }
        // setIsLoading(false)
    }

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
    const [managers, setManagers] = useState([]);
    const [selectedManager, setSelectedManager] = useState();
    const handleChange = (event) => {
        setSelectedManager(event.target.value)
    }

    useEffect(() => {
        getAllManagers();
        if (id) {
            getHotelById()
        }
    }, [id])

    return (
        <div className='h-full font-poppins'>
            <Layout>
                <div className='w-full h-screen py-6 flex flex-col gap-4'>

                    <p className='w-full block text-xl font-medium text-[#1A1A1A] leading-8'>
                        Chats
                    </p>

                    <div className='w-full h-auto flex flex-col items-center gap-3'>

                        <div className="md:min-w-full md:grid md:grid-cols-3 hidden bg-white rounded-lg shadow-sm border-[1.5px] border-[#E4E4E4]">

                            <div className="md:col-span-1 border-dashed border-r-[1.5px] border-[#E4E4E4]">

                                <div className="p-2 mb-2">
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 text-gray-400">
                                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                            </svg>
                                        </span>
                                        <input type="search" className="pl-8 w-full flex outline-none h-auto bg-[#F6F6F6] rounded-lg p-2 text-sm font-normal placeholder:text-xs" name="search" placeholder="Search Messages.." />
                                    </div>
                                </div>

                                <div className="h-[32rem] scrollbar-thin scrollbar-track-white scroll-smooth scrollbar-thumb-[#ffde59] scrollbar-rounded-full scrollbar-thumb-rounded-full overflow-y-scroll">

                                    <div className='flex items-center md:p-3 p-2 text-xs transition duration-150 ease-in-out border-b-[1.5px] border-[#E4E4E4] cursor-pointer bg-[#fff7d8]'>
                                        <div className='flex gap-2 items-start w-full'>

                                            <img className="object-cover shadow-sm w-10 h-10 rounded-full border border-[#E4E4E4]" src='/logo.png' alt="africanvo" />

                                            <div className="w-full flex flex-col gap-0.5">
                                                <p className="flex items-center gap-x-1 font-medium hover:text-[#D4AA00] text-gray-900">
                                                    Chijioke Emechebe
                                                    <span className='font-medium text-[#636363] leading-5'>29 July 2023</span>
                                                </p>

                                                <div className="block text-xs font-medium text-[#636363]">Last message</div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='flex items-center md:p-3 p-2 text-xs transition duration-150 ease-in-out border-b-[1.5px] border-[#E4E4E4] cursor-pointer hover:bg-[#fff7d8]'>
                                        <div className='flex gap-2 items-start w-full'>

                                            <img className="object-cover shadow-sm w-10 h-10 rounded-full border border-[#E4E4E4]" src='/logo.png' alt="africanvo" />

                                            <div className="w-full flex flex-col gap-0.5">
                                                <p className="flex items-center gap-x-1 font-medium hover:text-[#D4AA00] text-gray-900">
                                                    Chijioke Emechebe
                                                    <span className='font-medium text-[#636363] leading-5'>29 July 2023</span>
                                                </p>

                                                <div className="block text-xs font-medium text-[#636363]">Last message</div>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="col-span-2 md:block ">

                                <div className='flex items-center md:p-3 p-2 text-sm transition duration-150 ease-in-out justify-between border-b-[1.5px] border-[#E4E4E4]'>

                                    <div className='flex gap-3 items-center w-full'>

                                        <img className="object-cover shadow-sm w-9 h-9 rounded-full border border-[#E4E4E4]" src='/logo.png' alt="africanvo" />

                                        <p className="block font-medium text-gray-900">Chijioke Emechebe</p>

                                    </div>

                                    <div className='text-[#636363] p-2 rounded-md hover:text-[#D4AA00] cursor-pointer hover:transition hover:bg-[#fff7d8] hover:ease-in duration-300'>
                                        <Call className="h-5 w-5" variant='Bold' />
                                    </div>

                                    <Popover className="relative">
                                        <Popover.Button className='outline-none text-[#636363] p-2 rounded-md hover:text-[#D4AA00] cursor-pointer hover:transition hover:bg-[#fff7d8] hover:ease-in duration-300'>
                                            <FiMoreVertical className='h-5 w-5' />
                                        </Popover.Button>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform scale-95"
                                            enterTo="transform scale-100"
                                            leave="transition ease-in duration=75"
                                            leaveFrom="transform scale-100"
                                            leaveTo="transform scale-95"
                                        >
                                            <Popover.Panel className="absolute -right-16 sm:right-4 z-50 mt-2 gap-3 p-4 bg-white border border-[#E4E4E4] shadow-sm rounded-md max-w-xs sm:max-w-sm w-screen">
                                                <div className='flex flex-col w-full gap-y-3'>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="Manager Assigned">Manager Assigned</InputLabel>
                                                        <Select
                                                            labelId="Manager Assigned"
                                                            id="outlined-basic"
                                                            value={selectedManager}
                                                            onChange={handleChange}
                                                        >
                                                            {managers.map((manager) => <MenuItem value={manager.id}>{manager.fullName}</MenuItem>)}
                                                        </Select>
                                                    </FormControl>

                                                    <div className="flex items-center w-full gap-4">
                                                        <button
                                                            type="button"
                                                            className="text-white font-medium flex items-center py-2 px-5 rounded-md bg-[#666666] text-sm leading-6 uppercase hover:bg-[#1A1A1A]/50"
                                                        // onClick={saveHotel}
                                                        // disabled={!hotelName || !description || !address || !email || !phone || !numberOfRooms || !selectedManager}
                                                        >
                                                            {/* {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Save Changes'} */}
                                                            Assign
                                                        </button>
                                                    </div>
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </Popover>

                                </div>

                                <div>
                                    <div className="bg-[#f8f8f8] relative w-full h-[32rem] scrollbar-thin scrollbar-track-white scroll-smooth scrollbar-thumb-[#ffde59] scrollbar-rounded-full scrollbar-thumb-rounded-full py-3 overflow-y-scroll">
                                        <div className="space-y-3 text-sm ">

                                            <div className="flex justify-start">
                                                <div className="relative lg:max-w-xl max-w-lg px-2 py-1.5 text-[#1A1A1A] rounded-t-lg rounded-br-lg mx-2 border border-[#E4E4E4] bg-gray-400/25">
                                                    <span className="block"> Eiusmod ex amet anim ea proident anim in aliqua ea reprehenderit quis quis pariatur voluptate. Adipisicing velit enim id cupidatat adipisicing duis dolore irure. Tempor sint nostrud laboris cillum ex consectetur. Consectetur eu proident ut culpa laborum officia elit eu quis pariatur. Do dolor officia labore ea officia cupidatat pariatur pariatur aute excepteur id. Enim sint laborum pariatur in elit ex commodo. Nulla est sit sunt aliqua sunt culpa commodo Lorem.</span>
                                                </div>
                                            </div>

                                            <div className="flex justify-end">
                                                <div className="relative lg:max-w-xl px-2 py-1.5 text-[#1A1A1A] bg-white rounded-t-lg rounded-bl-lg mx-2 border border-[#E4E4E4]">
                                                    <span className="block"> Message </span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between w-full p-2 text-sm">
                                        {/* <button>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                </svg>
                                            </button> */}
                                        <input type="text" className="block w-full py-2 mx-2 rounded-lg outline-none" name="message" placeholder='Type your message..' />
                                        <button type="submit" className='text-[#636363] p-2 rounded-md hover:text-[#D4AA00] cursor-pointer hover:transition hover:ease-in duration-300'>

                                            <Send2 className="h-5 w-5" variant='Bold' />

                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="min-w-full grid grid-cols-1 md:hidden bg-white rounded-lg shadow-sm border-[1.5px] border-[#E4E4E4]">

                            <div className="border-dashed border-r-[1.5px] border-[#E4E4E4]">

                                <div className="p-2 mb-2">
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 text-gray-400">
                                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                            </svg>
                                        </span>
                                        <input type="search" className="pl-8 w-full flex outline-none h-auto bg-[#F6F6F6] rounded-lg p-2 text-sm font-normal placeholder:text-xs" name="search" placeholder="Search Messages.." />
                                    </div>
                                </div>

                                <div className="h-[32rem] scrollbar-thin scrollbar-track-white scroll-smooth scrollbar-thumb-[#ffde59] scrollbar-rounded-full scrollbar-thumb-rounded-full overflow-y-scroll">

                                    <div
                                        className='flex items-center md:p-3 p-2 text-xs transition duration-150 ease-in-out border-b-[1.5px] border-[#E4E4E4] cursor-pointer bg-[#fff7d8]'
                                        onClick={showDrawer}
                                    >
                                        <div className='flex gap-2 items-start w-full'>

                                            <img className="object-cover shadow-sm w-10 h-10 rounded-full border border-[#E4E4E4]" src='/logo.png' alt="africanvo" />

                                            <div className="w-full flex flex-col gap-0.5">
                                                <p className="flex items-center gap-x-1 font-semibold hover:text-[#D4AA00] text-gray-900">
                                                    Chijioke Emechebe
                                                    <span className='font-medium text-[#636363] leading-5'>29 July 2023</span>
                                                </p>

                                                <div className="block text-xs font-medium text-[#636363]">Last message</div>
                                            </div>

                                        </div>

                                        {/* <div className='tracking-widest text-lg font-bold leading-6 text-[#636363]'>
                                            ...
                                        </div> */}
                                    </div>

                                    <div className='flex items-center md:p-3 p-2 text-xs transition duration-150 ease-in-out border-b-[1.5px] border-[#E4E4E4] cursor-pointer hover:bg-[#fff7d8]'>
                                        <div className='flex gap-2 items-start w-full'>

                                            <img className="object-cover shadow-sm w-10 h-10 rounded-full border border-[#E4E4E4]" src='/logo.png' alt="africanvo" />

                                            <div className="w-full flex flex-col gap-0.5">
                                                <p className="flex items-center gap-x-1 font-medium hover:text-[#D4AA00] text-gray-900">
                                                    Chijioke Emechebe
                                                    <span className='font-medium text-[#636363] leading-5'>29 July 2023</span>
                                                </p>

                                                <div className="block text-xs font-medium text-[#636363]">Last message</div>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </div>

                            <Drawer placement="right" onClose={onClose} open={open} closeIcon={<ArrowLeft2 size={20} />}
                                bodyStyle={{ backgroundColor: "#ffffff", padding: "4px 6px", borderBottom: '2', borderColor: '#E4E4E4', borderStyle: 'solid' }}
                                headerStyle={{ padding: "16px 12px" }}
                                // footerStyle={{ backgroundColor: "#000", position: "fixed", bottom: '0' }}
                                title={
                                    <div className='flex items-center p-2 text-sm transition duration-150 ease-in-out justify-between'>

                                        <div className='flex gap-3 items-center w-full'>

                                            <img className="object-cover shadow-sm w-9 h-9 rounded-full border border-[#E4E4E4]" src='/logo.png' alt="africanvo" />

                                            <p className="block font-medium text-gray-900">Chijioke Emechebe</p>

                                        </div>

                                        <div className='text-[#636363] p-2 rounded-md hover:text-[#D4AA00] cursor-pointer hover:transition hover:bg-[#fff7d8] hover:ease-in duration-300'>
                                            <Call className="h-5 w-5" variant='Bold' />
                                        </div>

                                    </div>}
                            >

                                <div className='w-full'>
                                    <div className="bg-white relative w-full h-[40rem] scrollbar-thin scrollbar-track-white scroll-smooth scrollbar-thumb-[#ffde59] scrollbar-rounded-full scrollbar-thumb-rounded-full py-3 overflow-y-scroll">
                                        <div className="space-y-3 text-sm ">

                                            <div className="flex justify-start">
                                                <div className="relative max-w-xs px-2 py-1.5 text-[#1A1A1A] rounded-t-lg rounded-br-lg mx-2 border border-[#E4E4E4] bg-gray-400/25">
                                                    <span className="block"> Eiusmod ex amet anim ea proident anim in aliqua ea reprehenderit quis quis pariatur voluptate. Adipisicing velit enim id cupidatat adipisicing duis dolore irure. Tempor sint nostrud laboris cillum ex consectetur. Consectetur eu proident ut culpa laborum officia elit eu quis pariatur. Do dolor officia labore ea officia cupidatat pariatur pariatur aute excepteur id. Enim sint laborum pariatur in elit ex commodo. Nulla est sit sunt aliqua sunt culpa commodo Lorem.</span>
                                                </div>
                                            </div>

                                            <div className="flex justify-end">
                                                <div className="relative max-w-xs px-2 py-1.5 text-[#1A1A1A] bg-[#f8f8f8] rounded-t-lg rounded-bl-lg mx-2 border border-[#E4E4E4]">
                                                    <span className="block"> Message </span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <footer className="bg-white flex items-center justify-between w-full p-2 text-sm border-t-[1.5px] border-[#e4e4e4]">
                                    <input type="text" className="block w-full py-2 mx-2 rounded-lg outline-none" name="message" placeholder='Type your message..' />
                                    <button type="submit" className='text-[#636363] p-2 rounded-md hover:text-[#D4AA00] cursor-pointer hover:transition hover:ease-in duration-300'>

                                        <Send2 className="h-5 w-5" variant='Bold' />

                                    </button>
                                </footer>
                            </Drawer>
                        </div>

                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Notifications;