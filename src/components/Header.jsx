import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import "./Header.css";

const Header = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">
            BOOK
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {user ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `nav-link custom-link fw-bold ${isActive ? "active" : ""}`
                      }
                    >
                      Add Book
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/view-books"
                      className={({ isActive }) =>
                        `nav-link custom-link fw-bold ${isActive ? "active" : ""}`
                      }
                    >
                      View Books
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link fw-bold text-primary">
                      {user.email}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm fw-bold"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/view-books"
                      className={({ isActive }) =>
                        `nav-link custom-link fw-bold ${isActive ? "active" : ""}`
                      }
                    >
                      View Books
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `nav-link custom-link fw-bold ${isActive ? "active" : ""}`
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
