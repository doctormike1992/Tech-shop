import { filterActions } from "../store/filterSlice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { Link,  useNavigate } from "react-router-dom";

export default function Search({onModal, searchBarModal, searchButtonModal}) {
  const dispatch = useDispatch();
  const input = useRef();
  const [inputEmpty, setInputEmpty] = useState('');
  const navigate = useNavigate();

  //NAVIGATE TO THE MAIN PAGE IN ENTER IS PRESSED ON SEARCH BAR
  function handleEnterKey(e) {
    if (e.key === "Enter") {
      navigate("/");
    }
  }
 

  return (
    <div
      className={
        onModal ? onModal : "relative md:min-w-[20rem]  md:w-120 flex flex-row "
      }
    >
      <input
        className={
          searchBarModal
            ? searchBarModal
            : "bg-[#f0f1fa] text-(--secondText) dark:text-(--white) md:h-10 h-full  rounded-lg text-md font-medium outline-0 p-1 text-nowrap md:pr-11  md:pl-12 md:w-full"
        }
        type="text"
        placeholder="search products..."
        ref={input}
        value={inputEmpty}
        onKeyDown={handleEnterKey}
        onChange={() => { dispatch(filterActions.search(input.current.value)); setInputEmpty(input.current.value)}}
      />
      <Link to="/">
        <button
          className={
            searchButtonModal
              ? searchButtonModal
              : "absolute left-0 top-0 bottom-0 text-(--secondText)/30 text-2xl bg-[#f0f1fa] md:px-2 rounded-lg "
          }
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </Link>
      <button onClick={() => { setInputEmpty(''); dispatch(filterActions.search('')); input.current.focus(); }} className={`absolute right-0 top-0 bottom-0 text-black pr-3 text-xs cursor-pointer hidden md:block ${!inputEmpty ? 'md:hidden' : 'md:block'}`}>
        <FontAwesomeIcon className="text-(--deepBlue)" icon={faX}/>
      </button>
    </div>
  );
}
