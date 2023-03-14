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
import styled from "@emotion/styled";

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

    const TableRowStyled = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #f8f8f8;
  }
  & > td {
    color: #1a1a1a;
  }
`;


    return (
        <div className='h-full font-poppins'>
            <Layout>

                <div className='w-full h-screen py-6 pb-8 flex flex-col gap-6'>

                    <div className='flex flex-col gap-y-1 md:flex-row w-full'>
                        <p className='block w-full text-lg font-medium text-[#1A1A1A] leading-6'>
                            Hotels
                        </p>

                        <div className='flex justify-end gap-2 w-full'>

                            {/* <TextField size='small' id="outlined-basic" label='Search Hotels' variant="outlined"
                            /> */}

                            <input 
                            type='text'
                            placeholder='Search Hotels'
                            className='w-1/2 h-9 border border-[#1a1a1a]/50 text-xs font-normal pl-2 focus:outline-0 bg-transparent rounded-md'
                            />

                            <Link href='#'>
                                <button
                                    type="button"
                                    className="w-auto border-[#1a1a1a]/50 border hover:bg-[#636363] uppercase text-[#666666] hover:border-0 hover:text-white font-medium leading-6 rounded-md text-xs text-center px-2.5 py-1.5"
                                >
                                    Export
                                </button>
                            </Link>

                            <Link href='hotels/new'>
                                <button
                                    type="button"
                                    className="w-auto bg-[#1a1a1a]/50 hover:bg-[#1a1a1a] uppercase text-white font-medium leading-6 rounded-md text-xs text-center px-2.5 py-1.5"
                                >
                                    Add Hotel
                                </button>
                            </Link>
                            
                        </div>
                    </div>

                    <div className='bg-white border border-gray-50 drop-shadow-sm rounded-lg w-full h-auto py-1 px-2'>
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
                                        <TableCell className="">Hotel Name</TableCell>
                                        <TableCell className="">Email</TableCell>
                                        <TableCell className="">Phone</TableCell>
                                        {/* <TableCell className="">MANAGER</TableCell> */}
                                        <TableCell className="">Number of Rooms</TableCell>
                                        <TableCell className="">Available Rooms</TableCell>
                                        <TableCell className="w-20">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {isLoading ? (
                                        <TableRow>
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
                                                    <TableRowStyled key={index}>
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
                                                        <TableCell className='w-20'>
                                                            <Link href={{
                                                                pathname: `/hotels/details`,
                                                                query: {
                                                                    id: row.id
                                                                }
                                                            }}>
                                                                <Edit2 size={18} className='text-[#636363] hover:text-[#1a1a1a]' />
                                                            </Link>
                                                        </TableCell>
                                                    </TableRowStyled>
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