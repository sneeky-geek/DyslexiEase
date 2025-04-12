import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../AuthContext";
import logo from "../../logo/logo.png";
import "@fontsource/opendyslexic";

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [icon, setIcon] = useState(faBars);
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setIcon((prevIcon) => (prevIcon === faBars ? faX : faBars));
    setNavOpen((prevNavOpen) => !prevNavOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-[#e9c7b2] font-[OpenDyslexic] shadow-lg">
      <nav className="flex justify-between items-center w-[92%] mx-auto py-3 flex-wrap">
        <div>
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="w-[20vh] transition-transform duration-300 hover:scale-105 max-w-full h-auto"
            />
          </Link>
        </div>

        <div>
          <div
            className={`lg:static absolute lg:w-auto w-full lg:min-h-fit min-h-[60vh] left-0 ${
              navOpen ? "top-[10%]" : "top-[-100%]"
            } bg-[#e9c7b2] lg:bg-transparent transition-all duration-500 ease-in-out z-10 shadow-lg lg:shadow-none flex flex-col lg:flex-row`}
          >
            <ul className="flex lg:flex-row flex-col items-center lg:gap-[4.5vw] gap-6 text-[1.3rem]">
              <li>
                <NavLink
                  to="/"
                  className="hover:text-[#323232] transition-colors duration-300 hover:underline hover:underline-offset-4"
                >
                  HOME
                </NavLink>
              </li>

              {!isAuthenticated ? (
                <>
                  <li>
                    <NavLink
                      to="/signup"
                      className="hover:text-[#323232] transition-colors duration-300 hover:underline hover:underline-offset-4"
                    >
                      SIGN UP
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      className="hover:text-[#323232] transition-colors duration-300 hover:underline hover:underline-offset-4"
                    >
                      LOGIN
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/dashboard"
                      className="hover:text-[#323232] transition-colors duration-300 hover:underline hover:underline-offset-4"
                    >
                      DASHBOARD
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-white bg-[#323232] hover:bg-gray-700 font-bold py-2 px-6 rounded-lg transition duration-300 shadow-md hover:scale-105"
                    >
                      LOGOUT
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div onClick={toggleNav} className="lg:hidden">
            <FontAwesomeIcon
              icon={icon}
              className="h-6 flex items-center justify-center pt-1 cursor-pointer text-[#323232] transition duration-300 hover:scale-110"
            />
          </div>
        </div>
      </nav>
      <div className="border-t-[2px] border-[#d1b5a7] shadow-[0_4px_12px_rgba(0,0,0,0.2)] w-full"></div>
    </header>
  );
};

export default Header;
