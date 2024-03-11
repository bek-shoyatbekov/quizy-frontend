/** @format */

import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { useState } from "react";
import useAuthStore from "../contexts/auth/AuthStore";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, removeUser } = useAuthStore.getState();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1150) {
      setShowMenu(false);
    }
  };
  return (
    <header className="header">
      <nav className="nav container">
        <NavLink to="/" className="nav__logo">
          Quizy
        </NavLink>

        <div
          className={`nav__menu ${showMenu ? "show-menu" : ""}`}
          id="nav-menu"
        >
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/" className="nav__link" onClick={closeMenuOnMobile}>
                Home
              </NavLink>
            </li>
            {!user ? (
              <li className="nav__item">
                <NavLink
                  to="/login"
                  className="nav__link"
                  onClick={closeMenuOnMobile}
                >
                  Login
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav__item">
                  <NavLink
                    to="/add-quiz"
                    className="nav__link"
                    onClick={() => {
                      closeMenuOnMobile();
                    }}
                  >
                    Add Quiz
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink
                    to="/"
                    className="nav__link"
                    onClick={() => {
                      removeUser();
                      closeMenuOnMobile();
                      window.location.reload();
                    }}
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="nav__close" id="nav-close" onClick={toggleMenu}>
            <IoClose />
          </div>
        </div>
        <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
          <IoMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
