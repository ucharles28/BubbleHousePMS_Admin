import {
    Card, CardContent, CardHeader, Paper, TableCell,
    TablePagination, TableRow, Table,
    TableContainer, TableHead, CircularProgress, TableBody, TextField
} from '@mui/material'
import { SidebarRight, Eye } from 'iconsax-react'
import { forwardRef, use, useEffect, useRef, useState } from 'react'
import Layout from '../../components/Layout'
import { get, postData } from '../../helpers/ApiRequest'
import MuiAlert from '@mui/material/Alert'
import Link from 'next/link'


function RoomsPage() {

    const getAllRooms = async () => {
        setIsLoading(true)
        const response = await get('Room')
        if (response.successful) {
            // var list = response.data.map((user) => {
            //     const obj = {
            //         user: user.fullName,
            //         email: user.email,
            //         joined: user.createdDate,
            //     }
            //     switch (user.accountType) {
            //         case 0:
            //             obj.role = 'Customer'
            //             break;
            //         case 1:
            //             obj.role = 'Admin'
            //             break;
            //         case 2:
            //             obj.role = 'Manager'
            //             break;
            //         case 3:
            //             obj.role = 'Staff'
            //             break;
            //     }
            //     return obj;
            // })
            setRows(response.data)
        }
        setIsLoading(false)

    }

    useEffect(() => {
        getAllRooms()
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    //states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    return (
        <div className='h-full font-poppins'>
            <Layout>

                <div className='w-full h-screen py-6 flex flex-col gap-6'>

                    <div className='flex w-full'>
                        <p className='w-full block text-xl font-medium text-[#1A1A1A] leading-8'>
                            Rooms
                        </p>

                        <div className='flex item-center justify-end gap-2 w-full'>
                            <TextField size='small' id="outlined-basic" className="z-0 bg-white text-base leading-6 font-normal" label='Search Rooms' variant="outlined"
                            />
                            {/* <button
                                type="button"
                                className="text-[#666666] font-medium flex gap-1 items-center py-2 px-5 rounded-md border-[#666666] border-[1.2px] text-xs md:text-sm leading-6 uppercase hover:bg-[#666666] hover:text-white"
                            >
                                <Export size={18} />
                                Export
                            </button> */}
                            <Link href='hotels/new'>
                                <button
                                    type="button"
                                    className="bg-[#666666] hover:bg-[#1A1A1A]/50 uppercase text-white font-medium leading-6 rounded-md text-xs md:text-sm py-2.5 px-5 text-center"
                                >
                                    Add Room
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className='bg-white border border-gray-50 shadow rounded-lg w-full overflow-auto h-auto py-1 px-2'>
                        <TableContainer >
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
                                        <TableCell className="">Type</TableCell>
                                        <TableCell className="">Cost (₦)</TableCell>
                                        <TableCell className="">Room Number</TableCell>
                                        <TableCell className="">Status</TableCell>
                                        {/* <TableCell className="">Action</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {isLoading ? (
                                        <TableRow  >
                                            <TableCell></TableCell>

                                            <TableCell></TableCell>

                                            <TableCell >
                                                <div className="tableLoadingProgressDiv">
                                                    <CircularProgress color="inherit" />
                                                </div>
                                            </TableCell>

                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    ) :
                                        rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                return (
                                                    <TableRow key={index}>

                                                        <TableCell className='w-10'>
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell >
                                                            {row.roomType.name}
                                                        </TableCell>
                                                        <TableCell>{row.roomType.price}</TableCell>
                                                        <TableCell>{row.roomNumber}</TableCell>
                                                        <TableCell>{row.statusText}</TableCell>
                                                        {/* <TableCell>
                                                            <Link href="#">
                                                                <Eye />
                                                            </Link>

                                                        </TableCell> */}
                                                    </TableRow>
                                                );
                                            })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </div>

            </Layout>
        </div>
    )
}

export default RoomsPage;