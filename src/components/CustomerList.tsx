import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import type { CustomerData } from '../types';
import { getCustomers } from '../personaltrainerapi';

function CustomerList() {
    const [customers, setCustomers] = useState<CustomerData[]>([]);

    const columns: GridColDef[] = [
        { field: 'firstname', headerName: 'First name', flex: 1 },
        { field: 'lastname', headerName: 'Last name', flex: 1 },
        { field: 'streetaddress', headerName: 'Address', flex: 1 },
        { field: 'postcode', headerName: 'Postcode' },
        { field: 'city', headerName: 'City' },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'phone', headerName: 'Phone', flex: 1 },
    ];

    const fetchCustomers = () => {
        getCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div style={{ width: '100%', height: 600, marginTop: 10 }}>
            <DataGrid
                rows={customers}
                columns={columns}
                getRowId={row => row._links.self.href}
                autoPageSize
                disableRowSelectionOnClick
                showToolbar
            />
        </div>
    );
}

export default CustomerList;