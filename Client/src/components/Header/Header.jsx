
import React from "react";
import  { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import logo from "../../logo/logo.png";
import "@fontsource/opendyslexic";

const Header = () => {
  const [icon, setIcon] = useState(faBars);
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setIcon((prevIcon) => (prevIcon === faBars ? faX : faBars));
    setNavOpen((prevNavOpen) => !prevNavOpen);
  };

  return (
    <header className="bg-[#e9c7b2] font-[OpenDyslexic] shadow-lg">
      <nav className="flex justify-between items-center w-[92%] mx-auto py-3">
        <div>
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="w-[20vh] transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </div>

        <div>
          <div
            className={`lg:static absolute lg:w-auto w-full lg:min-h-fit min-h-[60vh] left-0 ${
              navOpen ? "top-[10%]" : "top-[-100%]"
            } bg-[#e9c7b2] lg:bg-transparent transition-all duration-500 ease-in-out z-10 shadow-lg lg:shadow-none`}
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
              <li>
                <NavLink
                  to="/dashboard"
                  className="hover:text-[#323232] transition-colors duration-300 hover:underline hover:underline-offset-4"
                >
                  DASHBOARD
                </NavLink>
              </li>
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
