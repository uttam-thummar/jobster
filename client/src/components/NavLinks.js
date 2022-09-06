import React from 'react'
import { NavLink } from 'react-router-dom';
import links from '../utils/links'

const NavLinks = ({ toggleSideabar }) => {
    return (
        <div className="nav-links">
            {links.map((link) => {
                const { id, text, path, icon } = link;

                return (
                    <NavLink
                        to={path}
                        key={id}
                        onClick={toggleSideabar}
                        className={({ isActive }) => {
                            return isActive ? 'nav-link active' : 'nav-link';
                        }}
                    >
                        <span className='icon'>{icon}</span>
                        {text}
                    </NavLink>
                );
            })}
        </div>
    );
}

export default NavLinks
