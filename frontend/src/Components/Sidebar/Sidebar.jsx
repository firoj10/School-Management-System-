import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { FaUsers, FaChalkboardTeacher, FaUserGraduate, FaUserPlus } from 'react-icons/fa';

const Sidebar = ({ isSidebarOpen }) => {
  const activeClass = 'bg-primary text-white';
  const inactiveClass = 'text-primary hover:bg-primary hover:text-white';

  return (
    <aside className={`w-68 min-h-screen fixed transition-all duration-300 ${isSidebarOpen ? 'block' : 'hidden'}`}>
      <ul className="space-y-4 mt-6">
        {/* Admin Dashboard */}
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => `flex items-center gap-3 p-2 rounded transition-colors ${isActive ? activeClass : inactiveClass}`}
          >
            <MdDashboard className="w-5 h-5" />
            Admin Dashboard
          </NavLink>
        </li>

        {/* Pending Applications */}
        <li>
          <NavLink
            to="/PendingApplicationsList"
            className={({ isActive }) => `flex items-center gap-3 p-2 rounded transition-colors ${isActive ? activeClass : inactiveClass}`}
          >
            <FaUsers className="w-5 h-5" />
            Pending Applications
          </NavLink>
        </li>

        {/* Teacher Dashboard */}
        <li>
          <NavLink
            to="/teacher/dashboard"
            className={({ isActive }) => `flex items-center gap-3 p-2 rounded transition-colors ${isActive ? activeClass : inactiveClass}`}
          >
            <FaChalkboardTeacher className="w-5 h-5" />
            Teacher Dashboard
          </NavLink>
        </li>

        {/* Student Dashboard */}
        <li>
          <NavLink
            to="/student/dashboard"
            className={({ isActive }) => `flex items-center gap-3 p-2 rounded transition-colors ${isActive ? activeClass : inactiveClass}`}
          >
            <FaUserGraduate className="w-5 h-5" />
            Student Dashboard
          </NavLink>
        </li>

        {/* Create Student Form */}
        <li>
          <NavLink
            to="/createStudentForm"
            className={({ isActive }) => `flex items-center gap-3 p-2 rounded transition-colors ${isActive ? activeClass : inactiveClass}`}
          >
            <FaUserPlus className="w-5 h-5" />
            Create Student
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
