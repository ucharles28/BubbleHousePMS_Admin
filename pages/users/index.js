import { forwardRef, use, useEffect, useRef, useState } from 'react';
import {
    Card, CardContent, CardHeader, Paper, TableCell,
    TablePagination, TableRow, Table,
    TableContainer, TableHead, CircularProgress, TableBody, TextField
} from '@mui/material'
import { Eye } from 'iconsax-react';
import { get, postData } from '../../helpers/ApiRequest'
import MuiAlert from '@mui/material/Alert'
import Link from 'next/link'
import Layout from '../../components/Layout'


function UsersPage() {

    const getAllUsers = async () => {
        setIsLoading(true)
        const response = await get('User')
        if (response.successful) {
            var list = response.data.map((user) => {
                const obj = {
                    user: user.fullName,
                    email: user.email,
                    joined: user.createdDate,
                    id: user.id,
                }
                switch (user.accountType) {
                    case 0:
                        obj.role = 'Customer'
                        break;
                    case 1:
                        obj.role = 'Admin'
                        break;
                    case 2:
                        obj.role = 'Manager'
                        break;
                    case 3:
                        obj.role = 'Staff'
                        break;
                }
                return obj;
            })
            setRows(list)
        }
        setIsLoading(false)

    }

    useEffect(() => {
        getAllUsers()
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
        <div className='h-screen font-poppins'>
            <Layout>
                <div className='w-full h-screen py-6 flex flex-col gap-6'>

                    <div className='flex w-full'>
                        <p className='w-full block text-xl font-medium text-[#1A1A1A] leading-8'>
                            Users
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
                    </div>

                    {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
                    <div className='bg-white border border-gray-50 shadow rounded-lg w-full overflow-auto h-auto py-1 px-2'>
                        <TableContainer>
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
                                        <TableCell className=" ">User</TableCell>
                                        <TableCell className=" ">Email</TableCell>
                                        <TableCell className=" ">Role</TableCell>
                                        <TableCell className=" ">Joined</TableCell>
                                        <TableCell className="w-20">Action</TableCell>
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
                                                            {row.user}
                                                        </TableCell>
                                                        <TableCell >
                                                            {row.email}
                                                        </TableCell>
                                                        <TableCell>{row.role}</TableCell>
                                                        <TableCell>{row.joined}</TableCell>
                                                        <TableCell className='w-20'>
                                                            <Link href={{
                                                                pathname: `/users/details`,
                                                                query: {
                                                                    id: row.id
                                                                }
                                                            }}>
                                                                <Eye className='text-[#636363]' />
                                                            </Link>

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
                    {/* </Paper> */}
                </div>
            </Layout>
        </div>
    )
}

export default UsersPage;