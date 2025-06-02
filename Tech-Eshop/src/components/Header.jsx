import { NavLink, Link } from "react-router-dom";
import Search from "./Search";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";

export default function Header() {
  const modal = useRef();
  const modalContainerRef = useRef(null);
  const searchContainerRef = useRef();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <header
      className="flex flex-col lg:flex-row w-full items-center justify-between bg-fuchsia-800 lg:py-5
    py-3 md:px-3 px-1 text-stone-50 active:text-stone-200  md:gap-6  gap-2"
    >
      <div className="flex flex-row w-full  items-center">
        <h2 className=" text-2xl w-full">
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
                  onModal={`w-full flex flex-row transition-transform transition-opacity duration-300 ease-in-out ${
                    isVisible
                      ? "translate-y-0 "
                      : "translate-y-10 "
                  } `}
                  searchBarModal="bg-stone-400  md:h-11 h-full w-full text-xl outline-0 p-1 text-nowrap md:pr-11 md:pl-2 md:w-full relative"
                  searchButtonModal="h-full text-stone-500 text-3xl bg-stone-300 md:px-3 px-4 cursor-pointer hover:text-stone-700"
                />
              </div>
            </Modal>
          </div>
        ) : (
          <Search />
        )}
      </div>

      <nav className="flex justify-end md:text-xl text-sm items-center w-full md:w-[90%]">
        <div className="xl:w-[70%] w-full flex xl:justify-between justify-around">
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? "active" : "underline")}
          >
            admin
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            favorites
            <FontAwesomeIcon icon={faStar} />
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            cart
            <FontAwesomeIcon icon={faCartShopping} />
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            orders
            <FontAwesomeIcon icon={faTruckFast} />
          </NavLink>
          <NavLink
            to="/account"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Account <FontAwesomeIcon icon={faRightToBracket} />
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
