import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import type { CustomerData } from '../types';
import React from 'react';

type CustomerFormProps = {
    customer: CustomerData;
    setCustomer: React.Dispatch<React.SetStateAction<CustomerData>>;
}

function CustomerForm({ customer, setCustomer }: CustomerFormProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    return (
        <DialogContent>
            <TextField required margin="dense" label="First name" name="firstname"
                value={customer.firstname} onChange={handleChange} fullWidth variant="standard" />
            <TextField required margin="dense" label="Last name" name="lastname"
                value={customer.lastname} onChange={handleChange} fullWidth variant="standard" />
            <TextField margin="dense" label="Street address" name="streetaddress"
                value={customer.streetaddress} onChange={handleChange} fullWidth variant="standard" />
            <TextField margin="dense" label="Postcode" name="postcode"
                value={customer.postcode} onChange={handleChange} fullWidth variant="standard" />
            <TextField margin="dense" label="City" name="city"
                value={customer.city} onChange={handleChange} fullWidth variant="standard" />
            <TextField margin="dense" label="Email" name="email" type="email"
                value={customer.email} onChange={handleChange} fullWidth variant="standard" />
            <TextField margin="dense" label="Phone" name="phone"
                value={customer.phone} onChange={handleChange} fullWidth variant="standard" />
        </DialogContent>
    );
}

export default CustomerForm;