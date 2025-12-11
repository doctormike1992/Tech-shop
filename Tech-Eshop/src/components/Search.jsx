import { filterActions } from "../store/filterSlice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Search({onModal, searchBarModal, searchButtonModal}) {
  const dispatch = useDispatch();
  const input = useRef();

  function handleClrearInput(e) {
    if (e.target.value === "") {
      dispatch(filterActions.search(e.target.value));
    }
  }

 

  return (
    <div className={onModal ? onModal : "relative md:w-[90%] flex flex-row "}>
      <input
        className={
          searchBarModal
            ? searchBarModal
            : "bg-stone-50 text-stone-950 md:h-11 h-full  rounded-xl text-xl outline-0 p-1 text-nowrap md:pr-11 md:pl-2 md:w-full"
        }
        type="text"
        placeholder="Search products"
        ref={input}
        onChange={handleClrearInput}
      />
      <Link to="/">
        <button
          className={
            searchButtonModal
              ? searchButtonModal
              : "absolute right-0 top-0 bottom-0 text-[#863CF6] text-2xl bg-stone-300 md:px-2 rounded-br-xl rounded-tr-xl cursor-pointer hover:text-stone-700"
          }
          onClick={() => dispatch(filterActions.search(input.current.value))}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </Link>
    </div>
  );
}
