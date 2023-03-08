import * as React from 'react';
import { env } from '@/next.config';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { axios } from '../../../services/api';
import { LoadedDataSelection } from '@/components/select/LoadedDataSelection';

const initialForm = { name: "", email: "", role: "0" };

export function CreateUser(props) {

    const [open, setOpen] = React.useState(false);
    const [form, setForm] = React.useState(initialForm);

    function handleSubmit() {
        console.log(form);
    }

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <IconButton onClick={handleClickOpen} disabled={props.disabled}>
                <AddIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Create User</DialogTitle>
                <Divider />

                <DialogContent>
                    <DialogContentText mb={2}>
                        Fill the formulary to create a new user.
                    </DialogContentText>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="name"
                                label="Full name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="email"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="outlined"
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <LoadedDataSelection
                                fetch_from={`${env.API_URL}/api/action/get-roles`}
                                selected={"0"}
                                key_name={"name"}
                                key_value={"id"}
                                name={"role"}
                                setForm={setForm}
                                label={"Role"}
                            />
                        </Grid>
                    </Grid>

                </DialogContent>

                <Divider />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="outlined">Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}