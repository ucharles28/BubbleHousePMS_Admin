import { forwardRef, use, useEffect, useRef, useState } from 'react';
import {
    TableCell, TablePagination, TableRow, Table,
    TableContainer, TableHead, CircularProgress, TableBody, TextField, Snackbar
} from '@mui/material'
import { Eye, Trash } from 'iconsax-react';
import { get, postData, deleteData } from '../../helpers/ApiRequest';
import MuiAlert from '@mui/material/Alert';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { BounceLoader } from "react-spinners";
import styled from "@emotion/styled";
import { format } from "date-fns";
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';


function UsersPage() {

    const getAllUsers = async () => {
        const response = await get('User')
        if (response.successful) {
            // Filter out soft-deleted users
            const activeUsers = response.data.filter(user =>
                !user.isDeleted && !user.IsDeleted && !user.deleted && !user.Deleted
            );
            console.log('Total users:', response.data.length, 'Active users:', activeUsers.length);
            populateRows(activeUsers)
        }
        setIsLoading(false)
    }

    const handleSearch = async (text) => {
        setIsLoading(true)
        if (text) {
            filterUsers(text)
        } else {
            getAllUsers()
        }
    }

    const filterUsers = async (text) => {
        const response = await get(`User/Filter?queryText=${text}&accountType=${0}`)
        if (response.successful) {
            // Filter out soft-deleted users
            const activeUsers = response.data.filter(user =>
                !user.isDeleted && !user.IsDeleted && !user.deleted && !user.Deleted
            );
            populateRows(activeUsers)
        }
        setIsLoading(false)
    }

    const populateRows = (users) => {
        var list = users.map((user) => {
            const obj = {
                user: user.fullName,
                email: user.email,
                joined: format(new Date(user.createdDate), 'dd-MM-yyyy'),
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

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!userToDelete) return;

        setIsDeleting(true);
        try {
            // Call the backend DELETE endpoint when available
            // Expected endpoint: DELETE /api/User/{id}
            const response = await deleteData(`User/${userToDelete.id}`);

            if (response.successful) {
                // Remove the user from the local state
                setRows(rows.filter(row => row.id !== userToDelete.id));
                setSnackbar({
                    open: true,
                    message: 'User deleted successfully',
                    severity: 'success'
                });
            } else {
                setSnackbar({
                    open: true,
                    message: response.data || 'Failed to delete user',
                    severity: 'error'
                });
            }
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'An error occurred while deleting the user',
                severity: 'error'
            });
        } finally {
            setIsDeleting(false);
            setDeleteDialogOpen(false);
            setUserToDelete(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setUserToDelete(null);
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    //states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

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
        <div className='min-h-screen font-poppins'>
            <Layout>
                <div className='w-full h-full py-6 flex flex-col gap-6'>

                    <div className='flex flex-col items-end gap-y-1 md:flex-row w-full '>
                        <p className='block w-full text-lg font-medium text-[#1A1A1A] leading-6'>
                            Customers
                        </p>

                        <div className='flex justify-end gap-2 w-full'>

                            <input
                                type='text'
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder='Search Users'
                                className='w-1/2 h-9 border border-[#1a1a1a]/50 text-xs font-normal pl-2 focus:outline-0 bg-transparent rounded-md'
                            />

                            <Link href='users/new'>
                                <button
                                    type="button"
                                    className="w-auto bg-[#1a1a1a]/50 hover:bg-[#636363] uppercase text-white font-medium leading-6 rounded-md text-xs text-center px-2.5 py-1.5"
                                >
                                    Add New
                                </button>
                            </Link>

                            <Link href='users/manager'>
                                <button
                                    type="button"
                                    className="w-auto bg-[#1a1a1a]/50 hover:bg-[#636363] uppercase text-white font-medium leading-6 rounded-md text-xs text-center px-2.5 py-1.5"
                                >
                                    Managers
                                </button>
                            </Link>

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
                                        <TableCell className=" ">User</TableCell>
                                        <TableCell className=" ">Email</TableCell>
                                        <TableCell className=" ">Role</TableCell>
                                        <TableCell className=" ">Joined</TableCell>
                                        <TableCell className="w-20">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            return (
                                                <TableRowStyled key={index}>
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
                                                        <div className='flex items-center gap-3'>
                                                            <Link href={{
                                                                pathname: `/users/details`,
                                                                query: {
                                                                    id: row.id
                                                                }
                                                            }}>
                                                                <Eye size={18} className='text-[#636363] hover:text-[#1a1a1a] cursor-pointer' />
                                                            </Link>
                                                            <Trash
                                                                size={18}
                                                                className='text-[#FF4C51] hover:text-[#ff3338] cursor-pointer'
                                                                onClick={() => handleDeleteClick(row)}
                                                            />
                                                        </div>
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
                    </div>}
                </div>

                <DeleteConfirmationDialog
                    open={deleteDialogOpen}
                    onClose={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                    title="Delete User"
                    message={`Are you sure you want to delete ${userToDelete?.user}? This action cannot be undone.`}
                    isDeleting={isDeleting}
                />

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        onClose={handleSnackbarClose}
                        severity={snackbar.severity}
                    >
                        {snackbar.message}
                    </MuiAlert>
                </Snackbar>
            </Layout>
        </div>
    )
}

export default UsersPage;