// TeacherCreateUpdatePage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import TeacherCreateUpdateForm from "../Components/TeacherCreateUpdateForm";
import { createTeacher } from "../../../redux/slices/Teacher/teacherService";

const TeacherCreateUpdatePage = () => {
  const dispatch = useDispatch();
  const handleCreate = (formData) => {
    dispatch(createTeacher(formData));
  };

  return (
    <div className=" flex ">
      <TeacherCreateUpdateForm
        initialData={{}}
        onSubmit={handleCreate}
        // loading={loading}
        buttonLabel="Create Teacher"
      />
    </div>
  );
};

export default TeacherCreateUpdatePage;