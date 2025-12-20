import { filterActions } from "../store/filterSlice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Search({onModal, searchBarModal, searchButtonModal}) {
  const dispatch = useDispatch();
  const input = useRef();

 

  return (
    <div
      className={
        onModal
          ? onModal
          : "relative md:min-w-[20rem]  md:w-[30rem] flex flex-row "
      }
    >
      <input
        className={
          searchBarModal
            ? searchBarModal
            : "bg-stone-100 text-stone-700 md:h-10 h-full  rounded-lg text-md font-medium outline-0 p-1 text-nowrap md:pr-11  md:pl-10 md:w-full"
        }
        type="text"
        placeholder="search products..."
        ref={input}
        onChange={() => dispatch(filterActions.search(input.current.value))}
      />
      <Link to="/">
        <button
          className={
            searchButtonModal
              ? searchButtonModal
              : "absolute left-0 top-0 bottom-0 text-stone-400 text-2xl bg-stone-100 md:px-2 rounded-lg "
          }
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </Link>
    </div>
  );
}
