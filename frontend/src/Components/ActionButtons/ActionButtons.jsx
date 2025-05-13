import React from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaLocationArrow,
} from "react-icons/fa";

const ActionButtons = ({ type, onClick }) => {
  const baseStyle =
    "flex items-center justify-center gap-2 text-white font-semibold py-2 px-5 rounded-2xl shadow transition duration-200 text-center";

  const buttons = {
    back: {
      label: "Back",
      icon: <FaArrowLeft size={18} />,
      style: "bg-secondary hover:bg-hoverSecondary",
    },
    submit: {
      label: "Submit",
      icon: <FaCheckCircle size={18} />,
      style: "bg-primary hover:bg-hoverPrimary w-full text-center",
    },
    next: {
      label: "Next",
      icon: <FaArrowRight size={18} />,
      style: "bg-info hover:bg-blue-700",
    },
    navigate: {
      label: "Navigate",
      icon: <FaLocationArrow size={18} />,
      style: "bg-darkBg hover:bg-gray-800",
    },
  };

  const btn = buttons[type];

  if (!btn) return null;

  return (
    <button onClick={onClick} className={`${baseStyle} ${btn.style}`}>
      {type === "next" ? (
        <>
          {btn.label}
          {btn.icon}
        </>
      ) : (
        <>
          {btn.icon}
          {btn.label}
        </>
      )}
    </button>
  );
};

export default ActionButtons;
