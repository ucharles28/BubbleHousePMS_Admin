import { forwardRef, use, useEffect, useRef, useState } from 'react';
import {
    TableCell, TablePagination, TableRow, Table,
    TableContainer, TableHead, CircularProgress, TableBody, TextField
} from '@mui/material'
import { Eye, ArrowLeft2 } from 'iconsax-react'
import { get, postData } from '../../helpers/ApiRequest'
import MuiAlert from '@mui/material/Alert'
import Link from 'next/link'
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import styled from "@emotion/styled";
import { BounceLoader } from "react-spinners";


function CancelledBookings() {
    const [managers, setManagers] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getManagers()
    }, [])
    const goBack = () => {
        router.back()
    }

    const getManagers = async () => {
        const response = await get('User/GetAllManagers')
        if (response.successful) {
            setManagers(response.data)
        }
        setIsLoading(false)
    }

    const router = useRouter();

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
    const TableRowStyled = styled(TableRow)`
    &:nth-of-type(odd) {
        background-color: #f8f8f8;
    }
    & > td {
        color: #636363;
        font-size: 0.75rem;
    }
`;

    return (
        <div className='h-screen font-poppins'>
            <Layout>
                <div className='w-full h-screen py-6 flex flex-col gap-6'>

                    <div className='flex flex-col items-end gap-y-1 md:flex-row w-full'>
                        <p className='block w-full text-lg font-medium text-[#1A1A1A] leading-6'>
                            Managers
                        </p>

                        <div className='flex justify-end gap-2 w-full'>

                            <input
                                type='text'
                                placeholder='Search Managers'
                                className='w-1/2 h-9 border border-[#1a1a1a]/50 text-xs font-normal pl-2 focus:outline-0 bg-transparent rounded-md'
                            />

                            <div onClick={goBack} className="px-2 py-1 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-600 hover:text-gray-800">
                                <ArrowLeft2 size={14} />
                                <span className="text-xs font-medium leading-6">Back</span>
                            </div>

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
                    </div> : <div className='bg-white border border-gray-50 drop-shadow-sm rounded-lg w-full h-auto py-1 px-2'>
                        <TableContainer>
                            <Table >
                                <TableHead>
                                    <TableRow
                                        sx={{
                                            color: "#1A1A1A",
                                            "& th": {
                                                fontSize: "0.75rem",
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
                                        <TableCell className=" ">Role</TableCell>
                                        {/* <TableCell className=" ">Status</TableCell>*/}
                                        <TableCell className="w-20">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {managers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((manager, index) => (
                                            <TableRowStyled
                                                key={index}
                                            >
                                                <TableCell className='w-10'>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    {manager.fullName}
                                                </TableCell>
                                                <TableCell >
                                                    {manager.email}
                                                </TableCell>
                                                <TableCell >
                                                    {manager.phoneNumber}
                                                </TableCell>
                                                <TableCell>
                                                    Manager
                                                </TableCell>
                                                {/* <TableCell>
                                                <span className='text-xs mx-auto text-center font-medium rounded-full p-2 px-3 leading-6 bg-[#FFF1F1] text-[#FF4C51]'>
                                                    Cancelled
                                                </span>
                                            </TableCell>*/}
                                                <TableCell className='w-20'>
                                                    <Link
                                                        href={{
                                                            pathname: `/users/details`,
                                                            query: {
                                                                id: manager.id
                                                            }
                                                        }}
                                                    >
                                                        <Eye size={18} className='text-[#636363] hover:text-[#1a1a1a]' />
                                                    </Link>

                                                </TableCell>
                                            </TableRowStyled>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50, 100]}
                            component="div"
                            count={managers.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>}
                </div>
            </Layout>
        </div>
    )
}

export default CancelledBookings;