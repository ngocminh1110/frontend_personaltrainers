import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import type { CustomerData } from '../types';
import { addTraining } from '../personaltrainerapi';

type AddTrainingProps = {
    customerData: CustomerData;
}

function AddTraining({ customerData }: AddTrainingProps) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [activity, setActivity] = useState('');
    const [duration, setDuration] = useState('');

    const handleClickOpen = () => {
        setDate(dayjs());
        setActivity('');
        setDuration('');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        if (!date || !activity || !duration) {
            alert('Please fill in date, activity and duration');
            return;
        }

        addTraining({
            date: date.toISOString(),
            activity: activity,
            duration: Number(duration),
            customer: customerData._links?.self.href || '',
        })
            .then(() => handleClose())
            .catch(err => console.error(err));
    };

    return (
        <>
            <Button size="small" onClick={handleClickOpen}>
                Add training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    New training for {customerData.firstname} {customerData.lastname}
                </DialogTitle>
                <DialogContent>
                    <DateTimePicker
                        label="Date"
                        value={date}
                        onChange={newDate => setDate(newDate)}
                        format="DD.MM.YYYY HH:mm"
                        ampm={false}
                        sx={{ mt: 2, width: '100%' }}
                    />
                    <TextField required margin="dense" label="Activity"
                        value={activity} onChange={e => setActivity(e.target.value)}
                        fullWidth variant="standard" />
                    <TextField required margin="dense" label="Duration (min)" type="number"
                        value={duration} onChange={e => setDuration(e.target.value)}
                        fullWidth variant="standard" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddTraining;