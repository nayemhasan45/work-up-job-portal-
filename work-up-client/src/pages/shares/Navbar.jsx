import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { FirebaseAuthContext } from "../../contexts/firebaseAuthContext/AuthContext";

const Navbar = () => {
  const { initialUser, signOutUser } = useContext(FirebaseAuthContext);
  const links = (
    <>
      <NavLink className={"pr-5"} to={"/"}>
        <p>Home</p>
      </NavLink>
      <NavLink className={"pr-5"} to={"/job-category"}>
        <p>Job Category</p>
      </NavLink>
      <NavLink className={"pr-5"} to={"/blog"}>
        <p>Blog</p>
      </NavLink>
      <NavLink className={""} to={"/contact"}>
        <p>Contact</p>
      </NavLink>
    </>
  );
  const handleSignOut = () => {
    signOutUser()
      .then((res) => console.log("signed out user ", res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="navbar bg-base-100 shadow-sm max-w-11/12 mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="text-xl ">WORkUP</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {initialUser ? (
          <button onClick={handleSignOut} className="btn">
            Sign Out
          </button>
        ) : (
          <>
            <Link className="btn" to={"/signin"}>
              Sign in
            </Link>
            <Link className="btn" to={"/signup"}>Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
