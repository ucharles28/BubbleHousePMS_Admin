import { CircularProgress } from '@mui/material'
import { SidebarRight, Money2, Book, Calendar, Notepad2 } from 'iconsax-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Sidebar from '../../../components/SideBar'
import { get } from '../../../helpers/ApiRequest'
// import MuiAlert from '@mui/material/Alert';


function UserDetails() {
    const { query } = useRouter();
    const id = query.id;
    const [selectedUser, setSelectedUser] = useState()
    const [isLoading, setIsLoading] = useState(true)


    const getUser = async () => {
        if (id) {
            const response = await get(`User/${id}`)
            if (response.successful) {
                setSelectedUser(response.data)
            } else {
                alert(response.data)
            }
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getUser()
    }, [id])

    const getRole = (value) => {
        let role = ''
        switch (value) {
            case 0:
                role = 'Customer';
                break;
            case 1:
                role = 'Admin';
                break;
            case 2:
                role = 'Manager';
                break;
            case 3:
                role = 'Staff';
                break;
        }
        return role;
    }


    return (
        <div className='font-poppins bg-[#F4F5FA] h-full text-[#1a1a1a]'>
            <Sidebar />
            <div className='ml-64'>
                {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                        {alertMessage}
                    </Alert>
                </Snackbar> */}
                {/* <Card>
                    <CardContent> */}

                {/* <div className='border-b-[1px] border-[#3a354125] text-lg font-medium leading-7'>
                    <span>Add Hotel</span>
                </div> */}
                <div className='flex space-x-6 w-full h-full p-3'>

                    <div className="item w-3/6 h-full bg-white rounded-md">
                        <div className='px-5 pt-14 pb-5 flex flex-col gap-5 justify-center'>

                            <div className='flex flex-col justify-center items-center gap-3'>

                                <div className="rounded-lg h-28 w-28 bg-[#1A1A1A]/25 flex items-center">
                                    {!selectedUser ? <span className='flex items-center justify-center m-auto'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5.74 16c.11-.49-.09-1.19-.44-1.54l-2.43-2.43c-.76-.76-1.06-1.57-.84-2.27.23-.7.94-1.18 2-1.36l3.12-.52c.45-.08 1-.48 1.21-.89l1.72-3.45C10.58 2.55 11.26 2 12 2s1.42.55 1.92 1.54l1.72 3.45c.13.26.4.51.69.68L5.56 18.44c-.14.14-.38.01-.34-.19L5.74 16ZM18.7 14.462c-.36.36-.56 1.05-.44 1.54l.69 3.01c.29 1.25.11 2.19-.51 2.64a1.5 1.5 0 0 1-.9.27c-.51 0-1.11-.19-1.77-.58l-2.93-1.74c-.46-.27-1.22-.27-1.68 0l-2.93 1.74c-1.11.65-2.06.76-2.67.31-.23-.17-.4-.4-.51-.7l12.16-12.16c.46-.46 1.11-.67 1.74-.56l1.01.17c1.06.18 1.77.66 2 1.36.22.7-.08 1.51-.84 2.27l-2.42 2.43Z" fill="#666666"></path></svg>
                                    </span> :
                                        <img src={selectedUser.profileImageUrl} className='rounded-lg h-36 w-36 bg-[#1A1A1A]/25 object-cover' />}
                                </div>

                                {selectedUser && <p className='block font-medium leading-8 text-lg'>{selectedUser.fullName}</p>}

                                <div className="px-[10px] py-1 rounded-md bg-[#1a1a1a]/10 flex justify-center">
                                    <span className='text-xs font-normal leading-4 text-[#666666] text-center'>Customer</span>
                                </div>

                            </div>
                            {!isLoading ?
                                selectedUser && <>
                                    <div className='flex flew-row justify-between gap-3 px-1'>

                                        <div className='flex items-center gap-2'>
                                            <div className='p-3 bg-[#1a1a1a]/10 rounded-lg justify-center'>
                                                <Money2 />
                                            </div>
                                            <div className='block text-left gap-2'>
                                                <p className='text-lg leading-8 font-medium'>&#8358;920k</p>
                                                <p className='text-xs leading-5 font-normal'>Total Payment</p>
                                            </div>
                                        </div>

                                        <div className='flex items-center gap-2'>
                                            <div className='p-3 bg-[#1a1a1a]/10 rounded-lg justify-center'>
                                                <Book />
                                            </div>
                                            <div className='block text-left gap-2'>
                                                <p className='text-lg leading-8 font-medium'>12</p>
                                                <p className='text-xs leading-5 font-normal'>Total Bookings</p>
                                            </div>
                                        </div>

                                    </div>

                                    <div className='flex flew-row justify-between gap-3 px-1'>

                                        <div className='flex items-center gap-2'>
                                            <div className='p-3 bg-[#1a1a1a]/10 rounded-lg justify-center'>
                                                <Calendar />
                                            </div>
                                            <div className='block text-left gap-2'>
                                                <p className='text-lg leading-8 font-medium'>1</p>
                                                <p className='text-xs leading-5 font-normal'>Running Booking</p>
                                            </div>
                                        </div>

                                        <div className='flex items-center gap-2'>
                                            <div className='p-3 bg-[#1a1a1a]/10 rounded-lg justify-center'>
                                                <Notepad2 />
                                            </div>
                                            <div className='block text-left gap-2'>
                                                <p className='text-lg leading-8 font-medium'>0</p>
                                                <p className='text-xs leading-5 font-normal'>Booking Request</p>
                                            </div>
                                        </div>

                                    </div>

                                    <div className=' flex flex-col gap-3 px-1'>

                                        <div className='pb-2 border-b-2 border-[#1a1a1a]/10 w-full flex'>
                                            <p className='text-lg leading-8 font-medium'>User Details</p>
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <p className='text-sm leading-5 font-medium'>Username: <span className='text-sm font-normal leading-5 text-[#1a1a1a]/70'>{selectedUser.username}</span></p>

                                            <p className='text-sm leading-5 font-medium'>Billing Email: <span className='text-sm font-normal leading-5 text-[#1a1a1a]/70'>{selectedUser.email}</span></p>

                                            <p className='text-sm leading-5 font-medium'>Gender: <span className='text-sm font-normal leading-5 text-[#1a1a1a]/70'>{selectedUser.gender}</span></p>

                                            <p className='text-sm leading-5 font-medium'>Role: <span className='text-sm font-normal leading-5 text-[#1a1a1a]/70'>{getRole(selectedUser.accountType)}</span></p>

                                            <p className='text-sm leading-5 font-medium'>Contact: <span className='text-sm font-normal leading-5 text-[#1a1a1a]/70'>{selectedUser.phoneNumber}</span></p>

                                            {/* <p className='text-sm leading-5 font-medium'>Language: <span className='text-sm font-normal leading-5 text-[#1a1a1a]/70'>English</span></p> */}

                                            {/* <p className='text-sm leading-5 font-medium'>Country: <span className='text-sm font-normal leading-5 text-[#1a1a1a]/70'>Nigeria</span></p> */}

                                        </div>

                                    </div>

                                    {/* <div className="flex justify-center">
                                        <button
                                            type="button"
                                            className="text-white font-medium flex items-center py-[7px] px-[22px] rounded-[5px] bg-[#666666] text-sm leading-6 uppercase hover:bg-[#1A1A1A]/50"
                                        >
                                            Edit Details
                                        </button>
                                    </div> */}

                                </> :
                                <div className='flex justify-center'><CircularProgress /></div>}


                        </div>
                    </div>

                    {/* <div className='item w-full h-full bg-white rounded-md'>
                        <div className='p-4'>
                            <p>Hola</p>
                        </div>
                    </div> */}

                </div>
                {/* </CardContent>
                </Card> */}

            </div>
        </div>
    )
}

export default UserDetails;