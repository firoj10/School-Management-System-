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
  Typography 
} from "@mui/material";
import { approveApplication, fetchPendingApplications, rejectApplication } from "../redux/slices/studentSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { pendingStudents, loading, error, message } = useSelector(state => state.student);

  useEffect(() => {
    dispatch(fetchPendingApplications());
  }, [dispatch]);

  const handleApprove = (id) => {
    dispatch(approveApplication(id))
      .unwrap()
      .then(() => {
        dispatch(fetchPendingApplications()); // Refresh the list
      });
  };

  // Reject Application Handler
  const handleReject = (id) => {
    dispatch(rejectApplication(id))
      .unwrap()
      .then(() => {
        dispatch(fetchPendingApplications()); // Refresh the list
      });
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
      minWidth: 150 
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
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            color: params.value === 'approved' ? 'success.main' : 'error.main',
            fontWeight: 500
          }}
        >
          {params.value}
        </Typography>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      flex: 1,
      minWidth: 200,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Button variant="contained" color="success">Approve</Button>}
          onClick={() => handleApprove(params.id)}
          label="Approve"
          disabled={loading} // Disable during API call
        />,
        <GridActionsCellItem
          icon={<Button variant="outlined" color="error">Reject</Button>}
          onClick={() => handleReject(params.id)}
          label="Reject"
          disabled={loading} // Disable during API call
        />,
      ],
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Pending Applications
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <DataGrid
        rows={pendingStudents || []}
        columns={columns}
        loading={loading}
        autoPageSize
        disableSelectionOnClick
        components={{
          LoadingOverlay: LinearProgress,
        }}
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      />
    </Box>
  );
};

export default AdminDashboard;