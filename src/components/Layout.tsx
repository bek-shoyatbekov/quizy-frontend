/** @format */

import { Outlet } from "react-router-dom";
import "./Layout.css"; // Import the CSS file

const Layout = () => {
  return (
    <div className="layout">
      <div className="layout__header">
        <p className="layout__header__title">
          React With Firebase Authentication
        </p>
      </div>
      <div className="layout__content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
