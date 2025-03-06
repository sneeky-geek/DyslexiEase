import React, { useState } from 'react';
import logo from '../../logo/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faX } from '@fortawesome/free-solid-svg-icons/faX';
import { Link, NavLink } from 'react-router-dom';
import "@fontsource/noto-sans-thai"; 

const Header = () => {
    const [icon, setIcon] = useState(faBars);
    const [navOpen, setNavOpen] = useState(false);

    const toggleNav = () => {
        setIcon((prevIcon) => (prevIcon === faBars ? faX : faBars));
        setNavOpen((prevNavOpen) => !prevNavOpen);
    };

    return (
        <>
            <header className="bg-[#DDD0C8ff]">
                <nav className='flex justify-between items-center w-[92%] mx-auto py-2'>
                    <div>
                        <Link to='/'>
                            <img src={logo} alt="logo" className='w-[20vh]' />
                        </Link>
                    </div>

                    <div>
                        <div className={`lg:static absolute lg:w-auto w-full lg:min-h-fit min-h-[60vh] left-0 ${navOpen ? 'top-[10%]' : 'top-[-100%]'} `}>
                            <ul className='flex lg:flex-row flex-col items-center lg:gap-[4.5vw] gap-10 text-[1.3rem] font-[Noto Sans Thai]'>
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            `block py-1 pr-4 pl-3 duration-200 font-noto-sans-thai ${
                                                isActive ? 'text-[grey]' : 'text-[#323232ff]'
                                            } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-[#007ea7] lg:p-0`
                                        }>
                                        HOME
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="Signup"
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 duration-200 font-noto-sans-thai ${
                                                isActive ? 'text-[grey]' : 'text-[#323232ff]'
                                            } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-[#007ea7] lg:p-0`
                                        }>
                                        SIGN UP
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="Login"
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 duration-200 font-noto-sans-thai ${
                                                isActive ? 'text-[grey]' : 'text-[#323232ff]'
                                            } border-b border-black hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-[#007ea7] lg:p-0`
                                        }>
                                        LOGIN
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        <div onClick={toggleNav}>
                            <FontAwesomeIcon
                                icon={icon}
                                style={{ cursor: 'pointer', color: '#ffffff' }}
                                className="lg:hidden h-6 flex items-center justify-center pt-1"
                            />
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;
