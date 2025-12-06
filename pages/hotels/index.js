import {
    TableCell, TablePagination, TableRow, Table,
    TableContainer, TableHead, CircularProgress, TableBody, TextField, Snackbar
} from '@mui/material';
import { Edit2, Export, Trash } from 'iconsax-react';
import { forwardRef, use, useEffect, useRef, useState } from 'react';
import { get, postData, deleteData } from '../../helpers/ApiRequest';
import MuiAlert from '@mui/material/Alert';
import Link from 'next/link';
import { FiEdit3 } from 'react-icons/fi';
import Layout from '../../components/Layout';
import styled from "@emotion/styled";
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';

function HotelsPage() {

    const getAllHotels = async () => {
        const response = await get('Hotel')
        if (response.successful) {
            // Filter out soft-deleted hotels
            const activeHotels = response.data.filter(hotel =>
                !hotel.isDeleted && !hotel.IsDeleted && !hotel.deleted && !hotel.Deleted
            );
            console.log('Total hotels:', response.data.length, 'Active hotels:', activeHotels.length);
            setRows(activeHotels)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getAllHotels()
    }, [])

    const handleSearch = async (text) => {
        setIsLoading(true)
        if (text) {
            filterHotel(text)
        } else {
            getAllHotels()
        }
    }

    const filterHotel = async (text) => {
        const response = await get(`Hotel/Filter?queryText=${text}`)
        if (response.successful) {
            // Filter out soft-deleted hotels
            const activeHotels = response.data.filter(hotel =>
                !hotel.isDeleted && !hotel.IsDeleted && !hotel.deleted && !hotel.Deleted
            );
            setRows(activeHotels)
        }
        setIsLoading(false)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDeleteClick = (hotel) => {
        setHotelToDelete(hotel);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!hotelToDelete) return;

        setIsDeleting(true);
        console.log('Deleting hotel with ID:', hotelToDelete.id);
        console.log('API endpoint will be: Hotel/' + hotelToDelete.id);

        try {
            // Call the backend DELETE endpoint: DELETE /api/Hotel/{hotelId}
            const response = await deleteData(`Hotel/${hotelToDelete.id}`);
            console.log('Delete response:', response);

            if (response.successful) {
                // Remove the hotel from the local state
                setRows(rows.filter(row => row.id !== hotelToDelete.id));
                setSnackbar({
                    open: true,
                    message: 'Hotel deleted successfully',
                    severity: 'success'
                });
            } else {
                console.error('Delete failed:', response.data);
                setSnackbar({
                    open: true,
                    message: response.data || 'Failed to delete hotel',
                    severity: 'error'
                });
            }
        } catch (error) {
            console.error('Delete error:', error);
            setSnackbar({
                open: true,
                message: 'An error occurred while deleting the hotel',
                severity: 'error'
            });
        } finally {
            setIsDeleting(false);
            setDeleteDialogOpen(false);
            setHotelToDelete(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setHotelToDelete(null);
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
    const [hotelToDelete, setHotelToDelete] = useState(null);
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
        <div className='h-full font-poppins'>
            <Layout>

                <div className='w-full h-screen py-6 pb-8 flex flex-col gap-6'>

                    <div className='flex flex-col items-end gap-y-1 md:flex-row w-full'>
                        <p className='block w-full text-lg font-medium text-[#1A1A1A] leading-6'>
                            Hotels
                        </p>

                        <div className='flex justify-end gap-2 w-full'>

                            <input
                                type='text'
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder='Search Hotel'
                                className='w-1/2 h-9 border border-[#1a1a1a]/50 text-xs font-normal pl-2 focus:outline-0 bg-transparent rounded-md'
                            />

                            <Link href='hotels/new'>
                                <button
                                    type="button"
                                    className="w-auto bg-[#1a1a1a]/50 hover:bg-[#636363] uppercase text-white font-medium leading-6 rounded-md text-xs text-center px-2.5 py-1.5"
                                >
                                    Add New
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
                                                fontSize: "0.75rem",
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
                                                            <div className='flex items-center gap-3'>
                                                                <Link href={{
                                                                    pathname: `/hotels/details`,
                                                                    query: {
                                                                        id: row.id
                                                                    }
                                                                }}>
                                                                    <Edit2 size={18} className='text-[#636363] hover:text-[#1a1a1a] cursor-pointer' />
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
                    </div>
                </div>

                <DeleteConfirmationDialog
                    open={deleteDialogOpen}
                    onClose={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                    title="Delete Hotel"
                    message={`Are you sure you want to delete ${hotelToDelete?.name}? This action cannot be undone.`}
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

export default HotelsPage;