import {
    Card, CardContent, CardHeader, Paper, TableCell,
    TablePagination, TableRow, Table,
    TableContainer, TableHead, CircularProgress, TableBody, TextField
} from '@mui/material'
import { SidebarRight, Eye } from 'iconsax-react'
import { forwardRef, use, useEffect, useRef, useState } from 'react'
import Sidebar from '../../components/SideBar'
import { get, postData } from '../../helpers/ApiRequest'
import MuiAlert from '@mui/material/Alert'
import Link from 'next/link'


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
        <div className='font-poppins'>
            <Sidebar />
            <div className='ml-64'>

                <div>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <div className='flex justify-between items-center w-full'>
                            <div className='justify-start item-center m-4 text-xl font-medium leading-8'>
                                <span>All Users</span>
                            </div>
                            <div className='flex ml-96 justify-end item-center p-3 gap-4'>
                                <TextField size='small' id="outlined-basic" className="text-base leading-6 font-normal" label='Search Users' variant="outlined"
                                />
                                <button
                                    type="button"
                                    className="text-white font-medium flex items-center py-[7px] px-[22px] rounded-[5px] bg-[#666666] text-sm leading-6 uppercase hover:bg-[#1A1A1A]/50"
                                >
                                    <Link href='users/new'>
                                        Add User
                                    </Link>
                                </button>
                            </div>

                        </div>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table >
                                <TableHead>
                                    <TableRow className='text-sm leading-6 font-medium uppercase text-[#1a1a1a]/80'>
                                        <TableCell className="">S/N</TableCell>
                                        <TableCell className="">User</TableCell>
                                        <TableCell className="">Email</TableCell>
                                        <TableCell className="">Role</TableCell>
                                        <TableCell className="">Joined</TableCell>
                                        <TableCell className="">Action</TableCell>
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
                                        </TableRow>
                                    ) :
                                        rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell>
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
                                                        <TableCell>
                                                            <Link href={{
                                                                pathname: `/users/details`,
                                                                query: {
                                                                    id: row.id
                                                                }
                                                            }}>
                                                                <Eye />
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
                    </Paper>
                </div>

            </div>
        </div>
    )
}

export default UsersPage;