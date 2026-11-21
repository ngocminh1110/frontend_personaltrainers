import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import type { CustomerData } from '../types';
import CustomerForm from './CustomerForm';
import { updateCustomer } from '../personaltrainerapi';

type EditCustomerProps = {
    customerData: CustomerData;
    fetchCustomers: () => void;
}

function EditCustomer({ customerData, fetchCustomers }: EditCustomerProps) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState<CustomerData>({} as CustomerData);

    const handleClickOpen = () => {
        setCustomer({
            firstname: customerData.firstname,
            lastname: customerData.lastname,
            streetaddress: customerData.streetaddress,
            postcode: customerData.postcode,
            city: customerData.city,
            email: customerData.email,
            phone: customerData.phone,
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        updateCustomer(customerData._links?.self.href || '', customer)
            .then(() => {
                fetchCustomers();
                handleClose();
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            <IconButton onClick={handleClickOpen}>
                <EditIcon color="primary" />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>
                <CustomerForm customer={customer} setCustomer={setCustomer} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditCustomer;