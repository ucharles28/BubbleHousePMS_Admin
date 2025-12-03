import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function DeleteConfirmationDialog({ open, onClose, onConfirm, title, message, isDeleting }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: {
                    borderRadius: '8px',
                    padding: '8px'
                }
            }}
        >
            <DialogTitle className="flex items-center gap-2 text-[#1A1A1A] font-poppins">
                <span className="text-2xl text-[#FF4C51]">⚠️</span>
                <span className="font-semibold">{title || 'Confirm Delete'}</span>
            </DialogTitle>
            <DialogContent>
                <p className="text-[#636363] text-sm font-poppins">
                    {message || 'Are you sure you want to delete this item? This action cannot be undone.'}
                </p>
            </DialogContent>
            <DialogActions className="px-6 pb-4 gap-2">
                <Button
                    onClick={onClose}
                    disabled={isDeleting}
                    className="text-[#636363] hover:bg-gray-100 normal-case font-poppins"
                    style={{
                        color: '#636363',
                        textTransform: 'none'
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    disabled={isDeleting}
                    className="bg-[#FF4C51] hover:bg-[#ff3338] text-white normal-case font-poppins"
                    style={{
                        backgroundColor: isDeleting ? '#cccccc' : '#FF4C51',
                        color: 'white',
                        textTransform: 'none'
                    }}
                >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteConfirmationDialog;
