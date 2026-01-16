import { NavLink, Link, useNavigate } from "react-router-dom";
import CartIcon from "../icons/cart.svg?react";
import AdminIcon from "../icons/admin.svg?react";
import HeartIcon from "../icons/heart.svg?react";
import UserIcon from "../icons/users.svg?react";
import LogoutIcon from "../icons/logouts.svg?react";
import LoginIcon from "../icons/logins.svg?react";
import Search from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import Singin from "./Singin";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSclice";
import { saveDarkModeInStorage, getDarkModeInStorage } from "../utils/localeStorage";

export default function Header() {
  const authModal = useRef();
  const searchModal = useRef();
  const [darkIcon, setDarkIcon] = useState('/moon.svg');
  const modalContainerRef = useRef(null);
  const searchContainerRef = useRef();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [isVisible, setIsVisible] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const userLogState = useSelector((state) => state.user.isLoggedIn);
  const adminLogged = useSelector((state) => state.user.userUID);
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.guest.favorites);
  const cart = useSelector((state) => state.guest.cart);

  //UPDATE THE CART QUANTITY POP UP
  useEffect(() => {
    const cartTotalQuantity = cart.reduce(
      (sum, item) => (sum += item.quantity),
      0
    );
    setCartQuantity(cartTotalQuantity);
  }, [cart]);

  //GETS THE DARK MODE THEME FROM LOCALE STORAGE
  useEffect(() => {
  const theme = getDarkModeInStorage();

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    setDarkIcon("/sun.svg");
  }
  }, []);

  //TOGGLE THE DARK MODE IN THE SITE AND THE ICONS FOR IT 
  // AND ADDS IT TO THE LOCALE STORAGE
  function toggleDark() {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");

    setDarkIcon(isDark ? "/sun.svg" : "/moon.svg");
    saveDarkModeInStorage(isDark);
  }

  //LOGOUT
  const handleLogout = async () => {
    navigate("/");

    try {
      await signOut(auth);
      dispatch(userActions.userLoggedIn(false));
      dispatch(userActions.userId(null));
      dispatch(userActions.getUserInfo(null));
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  //CLOSSING THE MODAL ON LOGGIN IN
  useEffect(() => {
    if (userLogState) {
      authModal.current.close();
    }
  }, [userLogState]);

  //CLOSING THE SEARCH MODAL WHEN PRESSING OUTSIDE
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    const handleClickOutside = (e) => {
      if (
        isMobile &&
        modalContainerRef.current &&
        !modalContainerRef.current.contains(e.target) &&
        !searchContainerRef.current.contains(e.target)
      ) {
        searchModal.current.close();
        setIsVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobile]);

  //OPENING THE SEARCH MODAL
  function openModal() {
    searchModal.current.open();
    setIsVisible(true);
  }

  return (
    <header
      className={`flex sticky top-0 z-99 backdrop-blur-md  bg-(--background)/50 ${!userLogState ? 'flex-row' : 'flex-col'} md:flex-row w-full items-center justify-start  lg:py-4
    py-3 md:px-3 px-1 text-stone-50 active:text-stone-200  md:gap-6  border-b border-b-(--primary)/10 gap-2  `}
    >
      <div className="flex flex-row gap-6 text-nowrap items-center">
        <h2 className=" text-(--primary) text-xl">
          <Link to="/">Tech-Eshop</Link>
        </h2>
        {isMobile ? (
            <div ref={searchContainerRef}>
              <button onClick={openModal}>
                <FontAwesomeIcon
                  className="text-(--secondText)"
                  icon={faSearch}
                />
              </button>

            <Modal ref={searchModal} modalClass="w-full">
              <div ref={modalContainerRef}>
                <Search
                  onModal={`w-full flex flex-row transition-transform transition-all duration-300 ease-in-out ${
                    isVisible ? "translate-y-0.5" : "translate-y-10"
                  } `}
                  searchBarModal="bg-stone-50   h-full w-full text-2xl outline-0 py-1 px-5 text-nowrap pr-9  md:w-full relative rounded-lg border-2 border-stone-600"
                  searchButtonModal=" hidden"
                />
              </div>
            </Modal>
          </div>
        ) : (
          <Search />
        )}
      </div>

      <nav className="flex justify-start text-md font-medium  items-center  w-full">
        <div
          className={`w-full gap-5 md:gap-6 lg:gap-8 xl:gap-10 flex text-stone-900 items-center justify-start ${
            !userLogState && "pl-2"
          }`}
        >
          {adminLogged === "WsPXtBodtbhmqPI8DLTvvufq46B2" && (
            <NavLink to="/admin">
              {({ isActive }) => (
                <li
                  title="Administrator"
                  className={`transition-all cursor-pointer dark:hover:text-white hover:bg-(--blue) text-(--primary) hover:text-(--white) py-1 px-2 rounded-md  ${
                    isActive ? "text-white" : "text-(--primary)"
                  } `}
                >
                  <AdminIcon className="w-5 h-5" />
                </li>
              )}
            </NavLink>
          )}

          {userLogState ? (
            <>
              <NavLink to="/favorites">
                {({ isActive }) => (
                  <li
                    className={`transition-all cursor-pointer dark:hover:text-white relative hover:bg-(--blue) text-(--primary) hover:text-(--white)  py-1 px-2 rounded-md ${
                      isActive ? "text-white" : "text-(--primary)"
                    } `}
                    title="Favorites"
                  >
                    <HeartIcon className="w-5 h-5 " />
                    {favorites.length !== 0 && (
                      <span className="py-0.5 px-1 min-w-6 text-center border-2 border-stone-50  rounded-lg bg-red-600 text-white  font-semibold text-[12px] absolute top-[-25%] right-[-27%]">
                        {favorites.length}
                      </span>
                    )}
                  </li>
                )}
              </NavLink>

              <NavLink to="/cart">
                {({ isActive }) => (
                  <li
                    className={`
                  transition-all cursor-pointer
                  py-1 px-2 rounded-md relative text-(--primary)
                  hover:bg-(--blue) hover:text-(--white) dark:hover:text-white
                  ${isActive ? "text-white" : "text-(--primary)"}
                `}
                    title="Cart"
                  >
                    <CartIcon className="w-5 h-5 " />

                    {cart.length !== 0 && (
                      <span className="py-0.5 px-1 min-w-6 text-center border-2 border-stone-50 rounded-lg bg-red-600 text-white font-semibold text-[12px] absolute top-[-25%] right-[-27%]">
                        {cartQuantity}
                      </span>
                    )}
                  </li>
                )}
              </NavLink>

              <NavLink to="/My-Account">
                {({ isActive }) => (
                  <li
                    className={`transition-all cursor-pointer  hover:bg-(--blue) hover:text-(--white) dark:hover:text-white py-1 px-2 rounded-md  text-white"
                    ${isActive ? "text-white" : "text-(--primary)"}`}
                    title="My account"
                  >
                    <UserIcon className="w-5 h-5 " />
                  </li>
                )}
              </NavLink>

              <button
                className="transition-all cursor-pointer dark:hover:text-white text-(--primary) hover:bg-(--blue) hover:text-(--white) py-1 px-2 rounded-md "
                title="log out"
                onClick={handleLogout}
              >
                <LogoutIcon className="w-5 h-5  " />
              </button>
            </>
          ) : (
            <button
              className="transition-all dark:hover:text-white cursor-pointer text-(--primary) hover:bg-(--blue) hover:text-(--white) py-1 px-2  rounded-md "
              onClick={() => authModal.current.open()}
            >
              <LoginIcon className="w-5 h-5 " />
            </button>
          )}
        </div>
        <button
          className={
            " border border-(--ordersBorder) cursor-pointer w-fit bg-white px-1 py-1 rounded-full"
          }
          onClick={toggleDark}
          title="Dark mode"
        >
          <img src={darkIcon} className="w-6 " />
        </button>
      </nav>
      <Modal
        ref={authModal}
        modalClass="flex flex-col w-full justify-center items-center"
        closeButton
      >
        <Singin />
      </Modal>
    </header>
  );
}
