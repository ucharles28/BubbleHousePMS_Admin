import {
    Card, CardContent, CardHeader, Paper, TableCell,
    TablePagination, TableRow, Table,
    TableContainer, TableHead, CircularProgress, TableBody, TextField
} from '@mui/material'
import { Edit2, Export } from 'iconsax-react'
import { forwardRef, use, useEffect, useRef, useState } from 'react';
import { get, postData } from '../../helpers/ApiRequest'
import MuiAlert from '@mui/material/Alert'
import Link from 'next/link'
import { FiEdit3 } from 'react-icons/fi';
import Layout from '../../components/Layout';




function HotelsPage() {

    const getAllHotels = async () => {
        setIsLoading(true)
        const response = await get('Hotel')
        if (response.successful) {
            setRows(response.data)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getAllHotels()
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
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
                        <p className='w-full block text-xl md:text-2xl font-medium text-[#1A1A1A] leading-8'>
                            Hotels
                        </p>

                        <div className='flex item-center justify-end gap-4 w-full'>
                            <TextField size='small' id="outlined-basic" className="z-0 bg-white text-base leading-6 font-normal" label='Search Hotels' variant="outlined"
                            />
                            <button
                                type="button"
                                className="text-[#666666] font-medium flex gap-1 items-center py-2 px-5 rounded-md border-[#666666] border-[1.2px] text-xs md:text-sm leading-6 uppercase hover:bg-[#666666] hover:text-white"
                            >
                                <Export size={18} />
                                Export
                            </button>
                            <Link href='hotels/new'>
                                <button
                                    type="button"
                                    className="bg-[#666666] hover:bg-[#1A1A1A]/50 uppercase text-white font-medium leading-6 rounded-md text-xs md:text-sm py-2.5 px-5 text-center"
                                >
                                    Add Hotel
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className='bg-white border border-gray-50 shadow rounded-lg w-full overflow-auto h-auto py-1 px-2'>
                        <TableContainer >
                            <Table >
                                <TableHead>
                                    <TableRow className='text-sm leading-6 font-[600] uppercase text-[#1a1a1a]'>
                                        <TableCell className="w-10">S/N</TableCell>
                                        <TableCell className="">Hotel Name</TableCell>
                                        <TableCell className="">Email</TableCell>
                                        <TableCell className="">Phone</TableCell>
                                        {/* <TableCell className="">MANAGER</TableCell> */}
                                        <TableCell className="">Number of Rooms</TableCell>
                                        <TableCell className="">Available Rooms</TableCell>
                                        <TableCell className="w-28">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {isLoading ? (
                                        <TableRow  >
                                            <TableCell></TableCell>

                                            <TableCell></TableCell>

                                            <TableCell >
                                                <div className="flex items-center justify-center tableLoadingProgressDiv">
                                                    <CircularProgress color="inherit" />
                                                </div>
                                            </TableCell>

                                            <TableCell></TableCell>
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
                                                        <TableCell>
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell >
                                                            {row.email}
                                                        </TableCell>
                                                        <TableCell>
                                                            {row.phoneNumber}
                                                        </TableCell>
                                                        {/* <TableCell>{row.manager.fullName}</TableCell> */}
                                                        <TableCell className='text-center'>
                                                            {row.numberOfRooms}
                                                        </TableCell>
                                                        <TableCell className='text-center'>
                                                            {row.availableRooms}
                                                        </TableCell>
                                                        <TableCell className='w-28'>
                                                            {/* <p className="text-gray-500 flex items-center gap-2"> */}
                                                            <Link href={{
                                                                pathname: `/hotels/details`,
                                                                query: {
                                                                    id: row.id
                                                                }
                                                            }}>
                                                                <Edit2 size={18} className='text-[#636363]' />
                                                            </Link>
                                                            {/* </p> */}
                                                        </TableCell>
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

export default HotelsPage;