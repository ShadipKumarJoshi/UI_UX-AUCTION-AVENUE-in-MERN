import { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socket from "../socket";
import { logout, reset } from "../store/auth/authSlice";
import { getNotificationForUser } from "../store/notification/notificationSlice";
import favicon from "../assets/favicon.png";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [helpMenuOpen, setHelpMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notification);
  let navigate = useNavigate();
  let location = useLocation();
  const logInUser = JSON.parse(localStorage.getItem("user"));

  //console.log(notifications, "notifications............ header......");
  //i want a length of isRead ===false
  const unReadNotifications = notifications.filter(
    (notification) => notification.isRead === false
  );
  //console.log(unReadNotifications.length, "unreadnotificatons........ length");

  useEffect(() => { }, [user]);
  useEffect(() => {
    if (logInUser) {
      dispatch(getNotificationForUser());
    }
    socket.on("newBidNotification", (data) => {

      socket.emit("joinAuction", logInUser?._id);

      dispatch(getNotificationForUser());
    });

    //console.log(notifications, "notification dispatch............");
  }, [location]);

  const logoutHandle = () => {
    dispatch(logout());
    toast.success("Logout Successfully!");
    setSidebarOpen(false);
    dispatch(reset());
    navigate("/login");
  };

  const toggleHelpMenu = () => {
    setHelpMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center px-2  sm:px-14 bg-body-bg py-4 border-b border-border-info-color">
      <div className="flex items-center px-1 z-[1]">
        <Link to="/" className=" no-underline flex items-center ">
        <img src={favicon} alt="favicon" className="w-24 h-24 mr-2" />
          <h1 className="text-2xl font-bold text-white font-Roboto hover:text-color-primary">
            <span className="uppercase text-theme-color">A</span>uction
            <span className="uppercase text-theme-color"> A</span>venue
          </h1>
        </Link>
        <Link to="/dashboard" className="ml-6">
           <h1 className="text-2xl font-bold text-white font-Roboto hover:text-color-primary transition-all">Products</h1>
          
        </Link>
        {/* Help Menu */}
        <div className="relative ml-6">
          <button
            onClick={toggleHelpMenu}
            className="text-2xl font-bold text-white font-Roboto hover:text-color-primary transition-all"
          >
            Help
          </button>
          {helpMenuOpen && (
            <div className="absolute top-full mt-2 bg-body-bg rounded-lg shadow-lg z-50">
              <Link
                to="/about-us"
                className="block px-4 py-2 text-white font-Roboto hover:bg-theme-bg-light no-underline whitespace-nowrap hover:text-color-primary"
                onClick={() => setHelpMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/faq"
                className="block px-4 py-2 text-white font-Roboto hover:bg-theme-bg-light no-underline whitespace-nowrap hover:text-color-primary"
                onClick={() => setHelpMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                to="/privacy-policy"
                className="block px-4 py-2 text-white font-Roboto hover:bg-theme-bg-light no-underline whitespace-nowrap hover:text-color-primary"
                onClick={() => setHelpMenuOpen(false)}
              >
                Privacy Policy
              </Link>
              <Link
                to="/contact-us"
                className="block px-4 py-2 text-white font-Roboto hover:bg-theme-bg-light no-underline whitespace-nowrap hover:text-color-primary"
                onClick={() => setHelpMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          )}
        </div>
      </div>
     
      
      {/* <div className="hidden sm:block">
        <Link
          to="/"
          className="text-white font-Roboto text-lg mx-3 hover:text-color-primary transition-all "
        >
          Home
        </Link>

        <Link
          to="/contact-us"
          className="text-white font-Roboto text-lg mx-3 hover:text-color-primary transition-all"
        >
          Contact
        </Link>
        <Link
          to="/about-us"
          className="text-white font-Roboto text-lg mx-3 hover:text-color-primary transition-all"
        >
          About
        </Link>
      </div> */}
      <div className="flex items-center cursor-pointer z-[1]">
        {user ? (
          <div className="flex justify-center items-center">
            <Link
              to="/user-profile/cart"
              className="text-white font-Roboto text-lg mx-3"
            >
              <BsCart3 className="text-white  hover:text-theme-color  transition-all " />
            </Link>
            <img
              src={user?.profilePicture}
              key={user.profilePicture}
              alt="user image"
              className="w-10 h-10 rounded-full order-2 cursor-pointer active:scale-[0.95] transition-all"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
            <Link to="/user-profile/notifications" className="mr-2 relative">
              {unReadNotifications.length > 0 ? (
                <span className="absolute right-0 top-0 w-[18px] h-[18px] flex items-center justify-center bg-theme-color rounded-full  text-white text-xs font-bold ">
                  {unReadNotifications.length}
                </span>
              ) : null}

              <IoIosNotificationsOutline
                size={37}
                className="text-white text-xl cursor-pointer bg-theme-bg hover:text-theme-color rounded-full p-2 transition-all "
              />
            </Link>
            <Link
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="text-white font-Roboto sm:hidden text-lg mx-3 order-3"
            >
              {navbarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </Link>
          </div>
        ) : (
          <>
          <div className="flex gap-2">
  <Link
    to="/register"
    className="bg-green-500 hover:bg-green-600 text-white font-Roboto text-sm sm:text-base py-1 sm:py-2 px-3 rounded-md transition duration-150 font-semibold no-underline"
  >
    Sign Up
  </Link>
  <Link
    to="/login"
    className="bg-blue-500 hover:bg-blue-600 text-white font-Roboto text-sm sm:text-base py-1 sm:py-2 px-3 rounded-md transition duration-150 font-semibold no-underline"
  >
    Sign In
  </Link>
</div>

            <Link
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="text-white font-Roboto sm:hidden text-lg mx-3 order-3 z-50"
            >
              {navbarOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
            </Link>
          </>
        )}
      </div>

      {user && sidebarOpen ? (
        <div
          className={`${sidebarOpen ? "animate-fadein" : "hidden"
            } rounded-xl origin-top-right overflow-hidden absolute right-12 top-16 mt-[4px] bg-body-bg z-50   w-[250px]`}
        >
          <nav className="pt-2 [&_a]:transition-all [&_a]:duration-100">
            <Link
              to="/user-profile/profile"
              className="block no-underline text-white font-Roboto text-lg py-2 px-7 hover:bg-theme-bg-light hover:text-color-primary"
              onClick={() => setSidebarOpen(false)}
            >
              Profile
            </Link>
            <Link
              to={
                user.userType === "seller"
                  ? "/user-profile/manage-items"
                  : "/user-profile/bids-items"
              }
              className="block no-underline text-white font-Roboto text-lg py-2 px-7 hover:bg-theme-bg-light hover:text-color-primary"
              onClick={() => setSidebarOpen(false)}
            >
              {user.userType === "seller" ? "Manage Items" : "Bids Items"}
            </Link>

            <Link
              to="/user-profile/account-settings"
              className="block no-underline text-white font-Roboto text-lg py-2 px-7 hover:bg-theme-bg-light hover:text-color-primary"
              onClick={() => setSidebarOpen(false)}
            >
              Account Setting
            </Link>
            <Link
              onClick={() => {
                logoutHandle();
                setSidebarOpen(false);
              }}
              className="block no-underline text-white font-Roboto text-lg py-2 px-7 hover:bg-theme-bg-light hover:text-color-primary"
            >
              Logout
            </Link>
          </nav>
        </div>
      ) : null}
      {navbarOpen && (
        <ul className=" flex sm:hidden flex-col justify-center items-center absolute top-16 left-0 w-full h-screen bg-gradient-to-b from-theme-bg2 to-theme-bg text-body-text-color z-10 [&_li]:flex [&_li]:w-full link:w-full link:px-4 link:py-6 hover:link:bg-theme-bg2 text-center ">
          <li className="cursor-pointer capitalize text-4xl">
            <Link to="/" onClick={() => setNavbarOpen(!navbarOpen)}>
              Home
            </Link>
          </li>

          <li className="cursor-pointer capitalize text-4xl">
            <Link to="/contact-us" onClick={() => setNavbarOpen(!navbarOpen)}>
              Contact
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-4xl">
            <Link to="/about-us" onClick={() => setNavbarOpen(!navbarOpen)}>
              About
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-4xl">
            {user && <Link to="/user-profile/cart" onClick={() => setNavbarOpen(!navbarOpen)}
            >Cart</Link>}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
