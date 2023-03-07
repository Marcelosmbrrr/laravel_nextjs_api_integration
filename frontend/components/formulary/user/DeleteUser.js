import * as React from 'react';
import { Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function DeleteUser(props) {

    const [open, setOpen] = React.useState(false);

    function handleSubmit() {
        console.log('handle submit');
    }

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <DeleteIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Delete User</DialogTitle>
                <Divider />

                <DialogContent>
                    <DialogContentText>
                        The selected users will be deleted. This action is reversible.
                    </DialogContentText>
                </DialogContent>

                <Divider />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="outlined" color="error">Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
