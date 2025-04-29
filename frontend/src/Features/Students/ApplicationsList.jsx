import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingApplications } from "../../redux/slices/studentSlice";
// import { fetchPendingApplications } from "../../redux/student/studentSlice";  // import the new fetchPendingApplications thunk

const PendingApplicationsList = () => {
  const dispatch = useDispatch();
  const { pendingStudents, loading, error, message } = useSelector(state => state.student);  // get state

  useEffect(() => {
    dispatch(fetchPendingApplications());  // Dispatch to fetch pending applications
  }, [dispatch]);

  const handleApprove = (id) => {
    // Dispatch the approve action here
    console.log("Approve ID:", id);
  };

  const handleReject = (id) => {
    // Dispatch the reject action here
    console.log("Reject ID:", id);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {message}</div>;
  }

  return (
    <div>
      <h1>Pending Applications</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingStudents && pendingStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.date_of_birth}</td>
              <td>{student.email}</td>
              <td>{student.status}</td>
              <td>
                <button onClick={() => handleApprove(student.id)}>Approve</button>
                <button onClick={() => handleReject(student.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingApplicationsList;
