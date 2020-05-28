import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

export const Navbar = ({ icon, title }) => {
    
    return (
        <nav className="navbar bg-danger">
            <h1>
                <i className={icon} />
                &nbsp;
                {title}
            </h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    )
}

Navbar.defaultProps = {
    title: 'Github Finder',
    icon: 'fab fa-github'
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}