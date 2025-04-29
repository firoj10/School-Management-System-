// src/hooks/useSwalRedirect.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function useSwalRedirect({
  success,
  error,
  resetRedux,
  resetForm,
  successRedirect,
  successTitle = "Success",
  successText = "Operation completed successfully.",
  errorTitle = "Error",
  errorText = null,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      Swal.fire({
        icon: "success",
        title: successTitle,
        text: successText,
        confirmButtonText: "OK",
      }).then(() => {
        resetForm();
        resetRedux();
        navigate(successRedirect);
      });
    } else if (error) {
      Swal.fire({
        icon: "error",
        title: errorTitle,
        text: errorText || error,
        confirmButtonText: "OK",
      });
    }
  }, [
    success,
    error,
    resetForm,
    resetRedux,
    navigate,
    successRedirect,
    successTitle,
    successText,
    errorTitle,
    errorText,
  ]);
}
