import { forwardRef, use, useEffect, useRef, useState } from 'react';
import {
    Card, CardContent, CardHeader, Paper, TableCell,
    TablePagination, TableRow, Table,
    TableContainer, TableHead, CircularProgress, TableBody, TextField
} from '@mui/material'
import { Eye, ArrowLeft2 } from 'iconsax-react'
import { get, postData } from '../../../helpers/ApiRequest'
import MuiAlert from '@mui/material/Alert'
import Link from 'next/link'
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';


function BookingRequest() {

    // const getAllUsers = async () => {
    //     setIsLoading(true)
    //     const response = await get('User')
    //     if (response.successful) {
    //         var list = response.data.map((user) => {
    //             const obj = {
    //                 user: user.fullName,
    //                 email: user.email,
    //                 joined: user.createdDate,
    //                 id: user.id,
    //             }
    //             switch (user.accountType) {
    //                 case 0:
    //                     obj.role = 'Customer'
    //                     break;
    //                 case 1:
    //                     obj.role = 'Admin'
    //                     break;
    //                 case 2:
    //                     obj.role = 'Manager'
    //                     break;
    //                 case 3:
    //                     obj.role = 'Staff'
    //                     break;
    //             }
    //             return obj;
    //         })
    //         setRows(list)
    //     }
    //     setIsLoading(false)

    // }

    // useEffect(() => {
    //     getAllUsers()
    // }, [])

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(event.target.value);
    //     setPage(0);
    // };

    // //states
    // const [page, setPage] = useState(0);
    // const [rowsPerPage, setRowsPerPage] = useState(10);
    // const [rows, setRows] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    const goBack = () => {
        router.back()
    }

    const router = useRouter()


    return (
        <div className='h-screen font-poppins'>
            <Layout>
                <div className='w-full h-screen py-6 flex flex-col gap-6'>

                    {/* <div className='flex w-full'>
                        <p className='w-full block text-xl font-medium text-[#1A1A1A] leading-8'>
                            Running booking
                        </p>

                        <div className='flex item-center justify-end gap-2 w-full'>
                            <TextField size='small' id="outlined-basic" className="z-0text-sm leading-6 font-normal" label='Search Users' variant="outlined"
                            />
                            <Link href='users/new'>
                                <button
                                    type="button"
                                    className="bg-[#666666] hover:bg-[#1A1A1A]/50 uppercase text-white font-medium leading-6 rounded-md text-xs md:text-sm py-2.5 px-5 text-center"
                                >
                                    Add User
                                </button>
                            </Link>
                        </div>
                    </div> */}
                    <div className='flex justify-between w-full'>
                        {/* <div className='w-full flex flex-row flex-wrap gap-2'> */}
                        <p className='w-full block text-xl font-medium text-[#1A1A1A] leading-8'>
                            Booking Request
                        </p>

                        {/* <div className='text-xs font-medium rounded-full px-2 py-0.5 flex items-center leading-6 bg-[#E8F3F9] text-[#139CE0]'> */}
                        {/* 12 bookings */}
                        {/* </div> */}
                        {/* </div> */}

                        <div className='flex item-center justify-end gap-2 w-full'>
                            <div onClick={goBack} className="px-2 py-1 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-600 hover:text-gray-800">
                                <ArrowLeft2 size={17} />
                                <span className="text-sm font-medium leading-6">Back</span>
                            </div>
                            <TextField size='small' id="outlined-basic" className="z-0 bg-white text-sm leading-6 font-normal" label='Search Bookings' variant="outlined"
                            />
                        </div>
                    </div>

                    {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
                    <div className='bg-white border border-gray-50 shadow rounded-lg w-full overflow-hidden h-auto py-1 px-2'>
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
                                        <TableCell className=" ">Booking Number</TableCell>
                                        <TableCell className=" ">Booked By</TableCell>
                                        <TableCell className=" ">Date</TableCell>
                                        <TableCell className=" ">Status</TableCell>
                                        <TableCell className="w-20">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {isLoading ? ( */}
                                    {/* <TableRow  >
                                        <TableCell></TableCell>

                                        <TableCell></TableCell>

                                        <TableCell >
                                            <div className="flex items-center justify-center tableLoadingProgressDiv">
                                                <CircularProgress color="inherit" />
                                            </div>
                                        </TableCell>

                                        <TableCell></TableCell>
                                    </TableRow> */}
                                    {/* ) :
                                        rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                return ( */}
                                    <TableRow
                                    // key={index}
                                    >
                                        <TableCell className='w-10'>
                                            {/* {index + 1} */}
                                            1
                                        </TableCell>
                                        <TableCell>
                                            SCRWAQJ1C3PG
                                        </TableCell>
                                        <TableCell >
                                            Uzoma Charles
                                        </TableCell>
                                        <TableCell>
                                            31-10-2022 to 31-10-2022
                                        </TableCell>
                                        <TableCell>
                                            <span className='text-xs mx-auto text-center font-medium rounded-full p-2 px-3 leading-6 bg-[#EDEDED] text-[#636363]'>
                                                Pending
                                            </span>
                                        </TableCell>
                                        <TableCell className='w-20'>
                                            <Link
                                                href='/bookings/request/details'
                                            // h ref={{
                                            //     pathname: `/users/details`,
                                            //     query: {
                                            //         id: row.id
                                            //     }
                                            // }}
                                            >
                                                <Eye className='text-[#636363]' />
                                            </Link>

                                        </TableCell>
                                    </TableRow>
                                    {/* );
                                            })} */}
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
                    </div>
                    {/* </Paper> */}
                </div>
            </Layout>
        </div>
    )
}

export default BookingRequest;