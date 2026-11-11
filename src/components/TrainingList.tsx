import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import type { TrainingWithCustomer } from '../types';
import { getTrainings } from '../personaltrainerapi';

function TrainingList() {
    const [trainings, setTrainings] = useState<TrainingWithCustomer[]>([]);

    const columns: GridColDef<TrainingWithCustomer>[] = [
        {
            field: 'date',
            headerName: 'Date',
            type: 'dateTime',
            flex: 1,
            valueGetter: (value: string) => new Date(value),
            valueFormatter: (value: Date) => dayjs(value).format('DD.MM.YYYY HH:mm'),
        },
        { field: 'duration', headerName: 'Duration (min)', type: 'number', flex: 1 },
        { field: 'activity', headerName: 'Activity', flex: 1 },
        {
            field: 'customer',
            headerName: 'Customer',
            flex: 1,
            valueGetter: (_value, row) =>
                row.customer ? `${row.customer.firstname} ${row.customer.lastname}` : '',
        },
    ];

    const fetchTrainings = () => {
        getTrainings()
            .then(data => setTrainings(data))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchTrainings();
    }, []);

    return (
        <div style={{ width: '100%', height: 600, marginTop: 10 }}>
            <DataGrid
                rows={trainings}
                columns={columns}
                autoPageSize
                disableRowSelectionOnClick
                showToolbar
            />
        </div>
    );
}

export default TrainingList;