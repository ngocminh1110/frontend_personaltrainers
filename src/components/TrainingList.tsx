import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import dayjs from 'dayjs';
import type { TrainingWithCustomer } from '../types';
import { getTrainings, deleteTraining } from '../personaltrainerapi';
import ConfirmDialog from './ConfirmDialog';

function TrainingList() {
    const [trainings, setTrainings] = useState<TrainingWithCustomer[]>([]);
    const [trainingToDelete, setTrainingToDelete] = useState<TrainingWithCustomer | null>(null);
    const [message, setMessage] = useState('');

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
        {
            field: 'delete',
            headerName: '',
            width: 60,
            sortable: false,
            filterable: false,
            hideable: false,
            disableColumnMenu: true,
            disableExport: true,
            renderCell: (params: GridRenderCellParams<TrainingWithCustomer>) =>
                <IconButton onClick={() => setTrainingToDelete(params.row)}>
                    <DeleteIcon color="error" />
                </IconButton>
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

    const handleDelete = () => {
        if (!trainingToDelete) return;

        deleteTraining(trainingToDelete.id)
            .then(() => {
                fetchTrainings();
                setMessage('Training deleted');
            })
            .catch(err => console.error(err))
            .finally(() => setTrainingToDelete(null));
    }

    return (
        <>
            <div style={{ width: '100%', height: 600, marginTop: 10 }}>
                <DataGrid
                    rows={trainings}
                    columns={columns}
                    autoPageSize
                    disableRowSelectionOnClick
                    showToolbar
                    slotProps={{
                        columnsManagement: {
                            getTogglableColumns: (allColumns) =>
                                allColumns.filter(column => column.hideable !== false).map(column => column.field),
                        },
                    }}
                />
            </div>
            <ConfirmDialog
                open={trainingToDelete !== null}
                title="Delete training"
                message={`Are you sure you want to delete this training (${trainingToDelete?.activity})?`}
                onConfirm={handleDelete}
                onCancel={() => setTrainingToDelete(null)}
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

export default TrainingList;