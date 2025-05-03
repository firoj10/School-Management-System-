import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DataGrid,
  GridActionsCellItem
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  LinearProgress,
  Alert,
  Typography,
  Chip
} from "@mui/material";
import { approveApplication, fetchPendingApplications, rejectApplication } from "../redux/slices/studentSlice";
import { format } from 'date-fns';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { pendingStudents, loading, error, message } = useSelector(state => state.student);

  useEffect(() => {
    dispatch(fetchPendingApplications());
  }, [dispatch]);

  const handleApprove = (id) => {
    dispatch(approveApplication(id))
      .unwrap()
      .then(() => dispatch(fetchPendingApplications()));
  };

  const handleReject = (id) => {
    dispatch(rejectApplication(id))
      .unwrap()
      .then(() => dispatch(fetchPendingApplications()));
  };

  const columns = [
    {
      field: 'first_name',
      headerName: 'First Name',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'last_name',
      headerName: 'Last Name',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'date_of_birth',
      headerName: 'Date of Birth',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Typography className="text-sm text-blue-gray-900">
          {format(new Date(params.value), 'dd/MM/yyyy')}
        </Typography>
      )
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 250
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        const label = params.value.charAt(0).toUpperCase() + params.value.slice(1);
        const color = params.value === 'approved' ? 'success' : params.value === 'pending' ? 'warning' : 'error';
        return (
          <Chip
            label={label}
            size="small"
            sx={{
              backgroundColor: (theme) => theme.palette[color].main + '20',
              color: (theme) => theme.palette[color].dark,
              fontWeight: 500,
              textTransform: 'uppercase',
              fontSize: '0.625rem'
            }}
          />
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      flex: 1,
      minWidth: 200,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Button variant="contained" size="small" className="bg-green-500 hover:bg-green-600">Approve</Button>}
          onClick={() => handleApprove(params.id)}
          label="Approve"
          disabled={loading}
        />,
        <GridActionsCellItem
          icon={<Button variant="outlined" size="small" className="text-red-600 border-red-600 hover:bg-red-50">Reject</Button>}
          onClick={() => handleReject(params.id)}
          label="Reject"
          disabled={loading}
        />
      ],
    }
  ];

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom className="font-sans text-blue-gray-900">
        Pending Applications
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <Box sx={{ height: 600, width: '100%' }} className="overflow-scroll">
        <DataGrid
          rows={pendingStudents || []}
          columns={columns}
          loading={loading}
          autoPageSize
          disableSelectionOnClick
          getRowId={(row) => row.id}
          components={{ LoadingOverlay: LinearProgress }}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'rgba(241,245,249,0.5)',
              borderBottom: '1px solid #E2E8F0'
            },
            '& .MuiDataGrid-columnHeader': {
              fontSize: '0.875rem',
              color: '#475569',
              py: 1,
              px: 2
            },
            '& .MuiDataGrid-cell': {
              py: 1,
              px: 2,
              borderBottom: '1px solid #E2E8F0'
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'rgba(226,232,240,0.3)'
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
