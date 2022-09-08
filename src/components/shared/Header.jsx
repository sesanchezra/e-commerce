import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
import Logo from '../../assets/Logo.svg'
import { HiOutlineShoppingBag } from "react-icons/hi"
import { IconContext } from "react-icons";
import { AiOutlineUser } from "react-icons/ai";
import { BiHistory } from "react-icons/bi";

const Header = () => {
    return (
        <header className='Header'>
            <NavLink to='/'>
                <img src={Logo} alt={Logo} className='header__logo' />
            </NavLink>
            <nav className="header__nav">
                <ul className="header__list">
                    <li className="header__item">
                        <NavLink
                            to='/login'
                            className={({ isActive }) => isActive ? 'active-link' : undefined}
                        >
                            <IconContext.Provider value={{ className: "header__shopbag__icon", size: '1.8em' }}>
                                <button className='header__button'>
                                    <AiOutlineUser />
                                </button>
                            </IconContext.Provider>

                        </NavLink>
                    </li>
                    <li className="header__item">
                        <NavLink
                            to='/purchases'
                            className={({ isActive }) => isActive ? 'active-link' : undefined}
                        >
                            <IconContext.Provider value={{ className: "header__shopbag__icon", size: '2em' }}>
                                <button className='header__button'>
                                    <BiHistory />
                                </button>
                            </IconContext.Provider>

                        </NavLink>
                    </li>
                    <li className="header__item">
                        <NavLink
                            to='/cart'
                            className={({ isActive }) => isActive ? 'active-link' : undefined}
                        >
                            <IconContext.Provider value={{ className: "header__shopbag__icon", size: '2em' }}>
                                <button className='header__button'>
                                    <HiOutlineShoppingBag />
                                </button>
                            </IconContext.Provider>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
