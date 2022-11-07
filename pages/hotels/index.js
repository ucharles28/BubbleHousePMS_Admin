import {
    Card, CardContent, CardHeader, Paper, TableCell,
    TablePagination, TableRow, Table,
    TableContainer, TableHead, CircularProgress, TableBody, TextField
} from '@mui/material'
import { ExportCurve } from 'iconsax-react'
import { forwardRef, use, useEffect, useRef, useState } from 'react'
import Sidebar from '../../components/SideBar'
import { get, postData } from '../../helpers/ApiRequest'
import MuiAlert from '@mui/material/Alert'
import Link from 'next/link'



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
        <div className='font-poppins'>
            <Sidebar />
            <div className='ml-64 mt-3'>

                <div>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <div className='flex w-full'>
                            {/* <h6 className='justify-start item-center m-4'>All Users</h6> */}
                            <div className='flex justify-start item-center p-3'>
                                <button
                                    type="button"
                                    className="text-[#666666] font-medium flex items-center py-[7px] px-[22px] rounded-[5px] border-[#666666] border-[1.2px] text-sm leading-6 uppercase hover:bg-[#666666] hover:text-white"
                                >
                                    <ExportCurve size={20}/>
                                    <span className='ml-2'>EXPORT</span>
                                </button>
                            </div>

                            <div className='flex ml-96 justify-end item-center p-3'>
                                <TextField size='small' id="outlined-basic" label='Search Hotels' variant="outlined"
                                />
                                <button
                                    type="button"
                                    className="text-white ml-3 font-medium flex items-center py-[7px] px-[22px] rounded-[5px] bg-[#666666] text-sm leading-6 uppercase hover:bg-[#1A1A1A]/50"
                                >
                                    <Link href='hotels/new'>
                                        Add Hotel
                                    </Link>
                                </button>
                            </div>

                        </div>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="">HOTEL NAME </TableCell>
                                        <TableCell className="">EMAIL</TableCell>
                                        <TableCell className="">PHONE</TableCell>
                                        <TableCell className="">MANAGER</TableCell>
                                        <TableCell className="">ROOMS</TableCell>
                                        <TableCell className="">AVAILABLE ROOMS</TableCell>
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
                                            <TableCell></TableCell>
                                        </TableRow>
                                    ) :
                                        rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell >
                                                            {row.email}
                                                        </TableCell>
                                                        <TableCell>{row.phoneNumber}</TableCell>
                                                        <TableCell>{row.manager.fullName}</TableCell>
                                                        <TableCell>{row.numberOfRooms}</TableCell>
                                                        <TableCell>{row.availableRooms}</TableCell>
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
                    </Paper>
                </div>

            </div>
        </div>
    )
}

export default HotelsPage;