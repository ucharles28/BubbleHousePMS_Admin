import { forwardRef, use, useEffect, useRef, useState } from 'react';
import {
    Card, CardContent, CardHeader, Paper, TableCell,
    TablePagination, TableRow, Table,
    TableContainer, TableHead, CircularProgress, TableBody, TextField
} from '@mui/material'
import { Eye, ArrowLeft2 } from 'iconsax-react'
import { get, postData } from '../../helpers/ApiRequest'
import MuiAlert from '@mui/material/Alert'
import Link from 'next/link'
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { BounceLoader } from "react-spinners";


function CancelledBookings() {
    const [staffs, setStaffs] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getStaffs()
    }, [])
    const goBack = () => {
        router.back()
    }

    const getStaffs = async () => {
        const response = await get('User/GetAllStaffs')
        if (response.successful) {
            setStaffs(response.data)
        }
        setIsLoading(false)
    }

    const router = useRouter()


    return (
        <div className='h-screen font-poppins'>
            <Layout>
                <div className='w-full h-screen py-6 flex flex-col gap-6'>

                    <div className='flex justify-between w-full'>
                        <p className='w-full block text-xl font-poppins font-medium text-[#1A1A1A] leading-8'>
                            Managers
                        </p>

                        <div className='flex item-center justify-end gap-2 w-full'>
                            <div onClick={goBack} className="px-2 py-1 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-600 hover:text-gray-800">
                                <ArrowLeft2 size={17} />
                                <span className="text-sm font-medium leading-6">Back</span>
                            </div>
                            <TextField size='small' id="outlined-basic" className="z-0text-sm leading-6 font-normal" label='Search Bookings' variant="outlined"
                            />
                        </div>
                    </div>

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
                    </div> : <div className='bg-white border border-gray-50 shadow rounded-lg w-full overflow-hidden h-auto py-1 px-2'>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table >
                                <TableHead>
                                    <TableRow
                                        sx={{
                                            color: "#1A1A1A",
                                            "& th": {
                                                fontSize: "12px",
                                                fontWeight: "550",
                                                letterSpacing: "0.20px"
                                            }
                                        }}
                                        className='text-xs leading-6 font-[600] uppercase text-[#1a1a1a]'
                                    >
                                        <TableCell className="w-10">S/N</TableCell>
                                        <TableCell className=" ">Full Name</TableCell>
                                        <TableCell className=" ">Email</TableCell>
                                        <TableCell className=" ">Phone</TableCell>
                                        <TableCell className=" ">Hotel</TableCell>
                                        {/* <TableCell className=" ">Status</TableCell>
                                        <TableCell className="w-20">Action</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {staffs.map((staff, index) => (
                                        <TableRow
                                            key={index}
                                        >
                                            <TableCell className='w-10'>
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                {staff.fullName}                                                
                                            </TableCell>
                                            <TableCell >
                                                {staff.email}
                                            </TableCell>
                                            <TableCell >
                                                {staff.phone}
                                            </TableCell>
                                            <TableCell>
                                                {staff.hotelName}
                                            </TableCell>
                                            {/* <TableCell>
                                                <span className='text-xs mx-auto text-center font-medium rounded-full p-2 px-3 leading-6 bg-[#FFF1F1] text-[#FF4C51]'>
                                                    Cancelled
                                                </span>
                                            </TableCell>
                                            <TableCell className='w-20'>
                                                <Link
                                                    href={{
                                                        pathname: `/bookings/details`,
                                                        query: {
                                                            id: manager.id
                                                        }
                                                    }}
                                                >
                                                    <Eye className='text-[#636363]' />
                                                </Link>

                                            </TableCell> */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/* <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        /> */}
                    </div>}
                </div>
            </Layout>
        </div>
    )
}

export default CancelledBookings;