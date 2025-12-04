import { forwardRef, use, useEffect, useRef, useState } from 'react';
import {
    TableCell, TablePagination, TableRow, Table,
    TableContainer, TableHead, CircularProgress, TableBody, TextField, Snackbar
} from '@mui/material'
import { Eye, ArrowLeft2, Trash } from 'iconsax-react'
import { get, postData, deleteData } from '../../../helpers/ApiRequest'
import MuiAlert from '@mui/material/Alert'
import Link from 'next/link'
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import styled from "@emotion/styled";
import { BounceLoader } from "react-spinners";
import DeleteConfirmationDialog from '../../../components/DeleteConfirmationDialog';


function Managers() {
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
            // Filter out soft-deleted managers
            const activeManagers = response.data.filter(manager =>
                !manager.isDeleted && !manager.IsDeleted && !manager.deleted && !manager.Deleted
            );
            console.log('Total managers:', response.data.length, 'Active managers:', activeManagers.length);
            setManagers(activeManagers)
        }
        setIsLoading(false)
    }

    const handleSearch = async (text) => {
        setIsLoading(true)
        if (text) {
            filterManagers(text)
        } else {
            getManagers()
        }
    }

    const filterManagers = async (text) => {
        const response = await get(`User/Filter?queryText=${text}&accountType=${2}`)
        if (response.successful) {
            // Filter out soft-deleted managers
            const activeManagers = response.data.filter(manager =>
                !manager.isDeleted && !manager.IsDeleted && !manager.deleted && !manager.Deleted
            );
            setManagers(activeManagers)
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

    const handleDeleteClick = (manager) => {
        setManagerToDelete(manager);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!managerToDelete) return;

        setIsDeleting(true);
        try {
            // Call the backend DELETE endpoint when available
            // Expected endpoint: DELETE /api/User/{id}
            const response = await deleteData(`User/${managerToDelete.id}`);

            if (response.successful) {
                // Remove the manager from the local state
                setManagers(managers.filter(manager => manager.id !== managerToDelete.id));
                setSnackbar({
                    open: true,
                    message: 'Manager deleted successfully',
                    severity: 'success'
                });
            } else {
                setSnackbar({
                    open: true,
                    message: response.data || 'Failed to delete manager',
                    severity: 'error'
                });
            }
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'An error occurred while deleting the manager',
                severity: 'error'
            });
        } finally {
            setIsDeleting(false);
            setDeleteDialogOpen(false);
            setManagerToDelete(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setManagerToDelete(null);
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    //states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [managerToDelete, setManagerToDelete] = useState(null);
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

                    <div className='flex flex-col items-end gap-y-1 md:flex-row w-full'>
                        <p className='block w-full text-lg font-medium text-[#1A1A1A] leading-6'>
                            Managers
                        </p>

                        <div className='flex justify-end gap-2 w-full'>

                            <input
                                type='text'
                                onChange={(e) => handleSearch(e.target.value)}
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
                                                    <div className='flex items-center gap-3'>
                                                        <Link
                                                            href={{
                                                                pathname: `/users/manager/details`,
                                                                query: {
                                                                    id: manager.id
                                                                }
                                                            }}
                                                        >
                                                            <Eye size={18} className='text-[#636363] hover:text-[#1a1a1a] cursor-pointer' />
                                                        </Link>
                                                        <Trash
                                                            size={18}
                                                            className='text-[#FF4C51] hover:text-[#ff3338] cursor-pointer'
                                                            onClick={() => handleDeleteClick(manager)}
                                                        />
                                                    </div>
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

                <DeleteConfirmationDialog
                    open={deleteDialogOpen}
                    onClose={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                    title="Delete Manager"
                    message={`Are you sure you want to delete ${managerToDelete?.fullName}? This action cannot be undone.`}
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

export default Managers;