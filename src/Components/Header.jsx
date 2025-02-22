import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import logo from '../assets/initial-t-letter-logo-creative-modern-typography-vector-42367456-removebg-preview.png'

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
  <>
  <div className="bg-blue-600">
  <header className="w-11/12 mx-auto p-4  dark:bg-gray-800 text-white rounded-md shadow-lg">
      <div className="container flex justify-between h-10 mx-auto">
        <div className="flex">
          <a
            rel="noopener noreferrer"
            href="/"
            aria-label="Back to homepage"
            className="flex items-center p-2"
          >
           <img className="w-16 h-16" src={logo} alt="" />
          </a>
        </div>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          {user ? (
            <button
              className="ml-2 px-8 py-3 font-semibold rounded bg-violet-600 hover:bg-violet-700 text-gray-50 transition-all duration-300"
              onClick={logOut}
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login">
              <button className="px-8 py-3 font-semibold rounded bg-violet-600 hover:bg-violet-700 text-gray-50 transition-all duration-300">
                Log in
              </button>
            </NavLink>
          )}
        </div>

        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
</div>
  </>
    
    
  );
};

export default Header;
