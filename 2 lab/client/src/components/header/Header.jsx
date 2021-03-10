import React from 'react';
import {NavLink} from "react-router-dom";
import "./header.css"

const Header = () => {
    return (
        <div className="header">
            <div className="container">
                <div className="header-title"><NavLink to="">SHMOT</NavLink></div>
                <div className="header-navbar">
                    <div>
                        <div className="navbar__add"><NavLink to="/add">Add</NavLink></div>
                        <div className="navbar__view"><NavLink to="/view">View</NavLink></div>
                    </div>
                    <div>
                        <div className="navbar__login"><NavLink to="/login">Sign In</NavLink></div>
                        <div className="navbar__registration"><NavLink to="/registration">Sign Up</NavLink></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Header;
