import { Checkbox, FormControlLabel, TextField, Button, Card, CardContent, FormControl, InputLabel, Select, MenuItem, CircularProgress, Snackbar } from '@mui/material'
import { People, Buildings, Buliding, Book, DirectNotification, Calendar, Slash, Money2, CalendarAdd, StatusUp, Profile2User } from 'iconsax-react'
import { forwardRef, useEffect, useRef, useState } from 'react'
import Sidebar from '../components/SideBar'
import { get, postData } from '../helpers/ApiRequest'
import MuiAlert from '@mui/material/Alert';
import Layout from '../components/Layout';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { BounceLoader } from "react-spinners";
import { format } from 'date-fns'


function Notifications() {
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenNotification = (notification) => {
        setSelectedNotification(notification);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        getNotifications(user.id)
    }, [])

    const getNotifications = async(id) => {
        const response = await get(`Notification/${id}`)
        console.log(response)
        // const response = await get(`Notification/${id}`)
        if (response.successful) {
            setNotifications(response.data)
        }
        setIsLoading(false)
    };

    const [isLoading, setIsLoading] = useState(true);
    const [selectedNotification, setSelectedNotification] = useState('');
    const [notifications, setNotifications] = useState([]);


    return (
        <div className='h-full font-poppins'>
            <Layout>
                {isLoading ? <div className="w-full">
                    <div className="flex flex-col items-center justify-center">
                        <div className="lg:w-2/5 md:w-1/2 pt-10 pl-4 pr-4 justify-center lg:my-16 sm:my-5">
                            <div className="m-12 pt-14 flex flex-col items-center justify-center">
                                <BounceLoader
                                    heigth={200}
                                    width={200}
                                    color="#FFCC00"
                                    ariaLabel="loading-indicator"
                                />
                            </div>
                        </div>
                    </div>
                </div> : <div className='w-full h-screen py-6 flex flex-col gap-4'>

                    <p className='w-full block text-xl font-medium text-[#1A1A1A] leading-8'>
                        Notifications
                    </p>

                    <div className='w-full h-auto flex flex-col items-center gap-3'>

                        {notifications.map((notification) => (<div className='cursor-pointer bg-white w-full rounded-md p-2 px-3 flex items-start border border-[#E4E4E4] gap-2'
                            onClick={() => handleOpenNotification(notification)}
                        >
                            <div className="rounded-full shrink-0 bg-green-200 h-9 w-9 flex items-center justify-center">
                                <DirectNotification className="h-4 w-4 text-green-600" />
                            </div>
                            <div className='flex flex-col w-full'>
                                <p className='text-sm text-[#1a1a1a] text-justify hover:text-[#D4AA00] truncate md:w-1/2 w-3/4 font-medium leading-6'>{notification.body}</p>
                                <p className='text-xs text-[#636363]'>{format(new Date(notification.createdDate), 'dd MMMM yyyy - HH:mm')}</p>
                            </div>
                        </div>))}

                        <Dialog open={openDialog} onClose={handleClose}>
                            <DialogTitle
                                className='font-poppins'
                                sx={{
                                    padding: "16px",
                                    fontSize: "1rem",
                                    letterSpacing: "0rem",
                                    fontWeight: "600",
                                    width: "auto",
                                    color: "#364a63",
                                }}
                            >
                                {selectedNotification.title}
                            </DialogTitle>
                            <DialogContent
                                sx={{
                                    padding: "16px",
                                    textAlign: 'justify',
                                }}
                                className='scrollbar-thin scroll-smooth scrollbar-thumb-gray-300 scrollbar-rounded-full scrollbar-thumb-rounded-full'
                            >
                                <DialogContentText className='text-sm font-normal leading-5 text-gray-600'>
                                    {selectedNotification.body}
                                </DialogContentText>
                            </DialogContent>
                        </Dialog>

                    </div>
                </div>}
            </Layout>
        </div>
    )
}

export default Notifications;