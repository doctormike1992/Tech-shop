import { NavLink, Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import Singin from "./Singin";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSclice";


export default function Header() {
  const modal = useRef();
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
    const cartTotalQuantity = cart.reduce((sum, item) => sum += item.quantity, 0);
    setCartQuantity(cartTotalQuantity);
  }, [cart])
  


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
      modal.current.close();
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
        modal.current.close();
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
    modal.current.open();
    setIsVisible(true);
  }

  //NAVIGATE TO ORDERS PAGE FUNCTION
  // function navigateToOrders() {
  //   navigate("/orders");
  // }

  return (
    <header
      className="flex sticky top-0 z-99 backdrop-blur-md  bg-white/60 flex-col md:flex-row w-full items-center justify-start  lg:py-4
    py-3 md:px-3 px-1 text-stone-50 active:text-stone-200  md:gap-8 shadow-sm shadow-stone-900/10 gap-2  "
    >
      <div className="flex flex-row gap-6 text-nowrap items-center">
        <h2 className=" text-stone-900 text-xl ">
          <Link to="/">Tech-Eshop</Link>
        </h2>
        {isMobile ? (
          <div>
            <div ref={searchContainerRef}>
              <FontAwesomeIcon icon={faSearch} onClick={openModal} />
            </div>

            <Modal ref={modal} modalClass="w-full">
              <div ref={modalContainerRef}>
                <Search
                  onModal={`w-full flex flex-row transition-transform transition-all duration-300 ease-in-out ${
                    isVisible ? "translate-y-0.5" : "translate-y-10"
                  } `}
                  searchBarModal="bg-stone-50   h-full w-full text-2xl outline-0 py-1 px-5 text-nowrap pr-2  md:w-full relative rounded-lg border-2 border-stone-600"
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
          className={`w-full md:gap-10 flex text-stone-900 justify-start ${
            userLogState ? "xl:justify-start " : "justify-start"
          }`}
        >
          {adminLogged === "WsPXtBodtbhmqPI8DLTvvufq46B2" && (
            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <li
                title="Administrator"
                className="transition-all cursor-pointer hover:bg-stone-200 py-1 px-2 rounded-lg "
              >
                admin
              </li>
            </NavLink>
          )}

          {userLogState ? (
            <>
              <NavLink
                to="/favorites"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                <li
                  className="transition-all cursor-pointer relative hover:bg-stone-200  py-1 px-2 rounded-lg "
                  title="Favorites"
                >
                  <FontAwesomeIcon icon={faHeart} />
                  {favorites.length !== 0 && (
                    <span className="py-0.5 px-1 w-6 text-center border-2 border-stone-50  rounded-lg bg-red-600 text-white font-semibold text-[12px] absolute top-[-25%] right-[-27%]">
                      {favorites.length}
                    </span>
                  )}
                </li>
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                <li
                  className="transition-all cursor-pointer hover:bg-stone-200 py-1 relative px-2 rounded-lg "
                  title="Cart"
                >
                  <FontAwesomeIcon icon={faBasketShopping} />
                  {cart.length !== 0 && (
                    <span className="py-0.5 px-1 w-6 text-center border-2 border-stone-50  rounded-lg bg-red-600 text-white font-semibold text-[12px] absolute top-[-25%] right-[-27%]">
                      {cartQuantity}
                    </span>
                  )}
                </li>
              </NavLink>
              <NavLink to="/My-Account">
                <li
                  className="transition-all cursor-pointer hover:bg-stone-200 py-1 px-2 rounded-lg"
                  title="My account"
                >
                  <FontAwesomeIcon icon={faUser} />
                </li>
              </NavLink>

              <button
                className="transition-all cursor-pointer hover:bg-stone-200 py-1 px-2 rounded-lg "
                title="log out"
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faRightToBracket} />
              </button>
            </>
          ) : (
            <button
              className="transition-all cursor-pointer hover:bg-stone-200 py-1 px-2  rounded-lg "
              onClick={() => modal.current.open()}
            >
              <FontAwesomeIcon title="Log In" icon={faRightToBracket} />
            </button>
          )}
        </div>
      </nav>
      <Modal
        ref={modal}
        modalClass="flex flex-col w-full justify-center items-center"
        closeButton
      >
        <Singin />
      </Modal>
    </header>
  );
}
