import { useState, useEffect } from 'react';
import { DataGrid, gridDataRowIdsSelector } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import type { CustomerData } from '../types';
import { getCustomers, deleteCustomer } from '../personaltrainerapi';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import ConfirmDialog from './ConfirmDialog';

function CustomerList() {
    const [customers, setCustomers] = useState<CustomerData[]>([]);
    const [customerToDelete, setCustomerToDelete] = useState<CustomerData | null>(null);
    const [message, setMessage] = useState('');

    const columns: GridColDef<CustomerData>[] = [
        { field: 'firstname', headerName: 'First name', flex: 1 },
        { field: 'lastname', headerName: 'Last name', flex: 1 },
        { field: 'streetaddress', headerName: 'Address', flex: 1 },
        { field: 'postcode', headerName: 'Postcode' },
        { field: 'city', headerName: 'City' },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'phone', headerName: 'Phone', flex: 1 },
        {
            field: 'addTraining',
            headerName: '',
            width: 130,
            sortable: false,
            filterable: false,
            hideable: false,
            disableColumnMenu: true,
            disableExport: true,
            renderCell: (params: GridRenderCellParams<CustomerData>) =>
                <AddTraining customerData={params.row} />
        },
        {
            field: 'edit',
            headerName: '',
            width: 60,
            sortable: false,
            filterable: false,
            hideable: false,
            disableColumnMenu: true,
            disableExport: true,
            renderCell: (params: GridRenderCellParams<CustomerData>) =>
                <EditCustomer customerData={params.row} fetchCustomers={fetchCustomers} />
        },
        {
            field: 'delete',
            headerName: '',
            width: 60,
            sortable: false,
            filterable: false,
            hideable: false,
            disableColumnMenu: true,
            disableExport: true,
            renderCell: (params: GridRenderCellParams<CustomerData>) =>
                <IconButton onClick={() => setCustomerToDelete(params.row)}>
                    <DeleteIcon color="error" />
                </IconButton>
        },
    ];

    const fetchCustomers = () => {
        getCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleDelete = () => {
        if (!customerToDelete) return;

        deleteCustomer(customerToDelete._links?.self.href || '')
            .then(() => {
                fetchCustomers();
                setMessage('Customer deleted');
            })
            .catch(err => console.error(err))
            .finally(() => setCustomerToDelete(null));
    }

    return (
        <>
            <AddCustomer fetchCustomers={fetchCustomers} />
            <div style={{ width: '100%', height: 600, marginTop: 10 }}>
                <DataGrid
                    rows={customers}
                    columns={columns}
                    getRowId={row => row._links?.self.href ?? ''}
                    autoPageSize
                    disableRowSelectionOnClick
                    showToolbar
                    slotProps={{
                        toolbar: {
                            csvOptions: {
                                fileName: 'customers',
                                utf8WithBom: true,
                                getRowsToExport: ({ apiRef }) => gridDataRowIdsSelector(apiRef),
                            },
                            printOptions: { disableToolbarButton: true },
                        },
                        columnsManagement: {
                            getTogglableColumns: (allColumns) =>
                                allColumns.filter(column => column.hideable !== false).map(column => column.field),
                        },
                    }}
                />
            </div>
            <ConfirmDialog
                open={customerToDelete !== null}
                title="Delete customer"
                message={`Are you sure you want to delete ${customerToDelete?.firstname} ${customerToDelete?.lastname}? All trainings of this customer will also be deleted.`}
                onConfirm={handleDelete}
                onCancel={() => setCustomerToDelete(null)}
            />
            <Snackbar
                open={message !== ''}
                message={message}
                autoHideDuration={3000}
                onClose={() => setMessage('')}
            />
        </>
    );
}

export default CustomerList;