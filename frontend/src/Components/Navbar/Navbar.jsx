import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; // Redux dispatch 
import { logout } from '../../Features/auth/authSlice'; // logout 
import { FaBell, FaGlobe } from 'react-icons/fa'; // Notification এবং Globe icons
import { BsBuildingsFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'; 

const Navbar = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    
    navigate('/'); 
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              onClick={toggleSidebar}
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="logo-sidebar"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                />
              </svg>
            </button>
            <a href="" className="flex ms-2 md:me-24 items-center">
              <BsBuildingsFill className="h-10 w-10 text-primary me-1" />
              <span className="self-center text-primary font-extrabold sm:text-2xl whitespace-nowrap">
                P <span className='text-secondary'>L</span>
              </span>
            </a>
          </div>

          <div className="flex items-center">
            <div className="relative mr-6">
              <button
                type="button"
                className="flex text-sm text-gray-500 rounded-full focus:ring-4 focus:ring-gray-300"
              >
                <FaBell className="w-6 h-6 text-primary" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                  3
                </span>
              </button>
            </div>

            <div className="relative mr-6">
              <button
                type="button"
                className="flex text-sm text-gray-500 rounded-full focus:ring-4 focus:ring-gray-300"
              >
                <FaGlobe className="w-6 h-6 text-primary" />
              </button>
            </div>

            <div className="flex items-center ms-3 relative">
              <button
                onClick={toggleDropdown}
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                aria-expanded={isDropdownOpen}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={user?.profilePicture || "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
                  alt="user photo"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 top-1 w-48 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm">
                
                  <ul className="py-1" role="none">
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-primary" role="menuitem">
                      {user?.email}
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-primary" role="menuitem">
                        Settings
                      </a>
                    </li>
                    
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-primary"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                  <div className="px-4 py-2 text-right">
                    <button onClick={closeDropdown} className="text-sm text-primary">
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
