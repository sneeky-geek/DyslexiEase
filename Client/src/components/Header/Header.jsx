import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import logo from "../../logo/logo.png";
import "@fontsource/noto-sans-thai";

const Header = () => {
    const [icon, setIcon] = useState(faBars);
    const [navOpen, setNavOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("🟢 Header Component Mounted");

        const checkAuth = () => {
            const token = localStorage.getItem("token");
            console.log("🔍 Checking Auth - Token:", token);
            setIsAuthenticated(!!token);
        };

        checkAuth();

        window.addEventListener("authChange", checkAuth);

        return () => {
            window.removeEventListener("authChange", checkAuth);
        };
    }, []);

    const toggleNav = () => {
        setIcon((prevIcon) => (prevIcon === faBars ? faX : faBars));
        setNavOpen((prevNavOpen) => !prevNavOpen);
    };

    const handleLogout = () => {
        console.log("🔴 Logging out...");
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        
        // Notify other components that authentication state changed
        window.dispatchEvent(new Event("authChange"));

        navigate("/");
    };

    return (
        <header className="bg-[#DDD0C8ff]">
            <nav className="flex justify-between items-center w-[92%] mx-auto py-2">
                <div>
                    <Link to="/">
                        <img src={logo} alt="logo" className="w-[20vh]" />
                    </Link>
                </div>

                <div>
                    <div
                        className={`lg:static absolute lg:w-auto w-full lg:min-h-fit min-h-[60vh] left-0 ${
                            navOpen ? "top-[10%]" : "top-[-100%]"
                        } `}
                    >
                        <ul className="flex lg:flex-row flex-col items-center lg:gap-[4.5vw] gap-10 text-[1.3rem] font-[Noto Sans Thai]">
                            <li>
                                <NavLink to="/">HOME</NavLink>
                            </li>

                            {!isAuthenticated ? (
                                <>
                                    <li>
                                        <NavLink to="/Signup">SIGN UP</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/Login">LOGIN</NavLink>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <button onClick={handleLogout} className="text-[cream] hover:text-[#ffffff] font-bold py-2 px-4">
                                        LOGOUT
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div onClick={toggleNav}>
                        <FontAwesomeIcon icon={icon} className="lg:hidden h-6 flex items-center justify-center pt-1" />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
