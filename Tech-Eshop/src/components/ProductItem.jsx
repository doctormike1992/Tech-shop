import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

export default function ProductItem({ item, quantity, handleFavorites, inFavorites }) {
    const uid = useSelector((state) => state.user.userUID);

  let heart = "absolute top-2 right-2 py-1 z-50 px-2 bg-[#80808042] rounded-2xl ";

  if (inFavorites) {
    heart += 'text-fuchsia-600'
  } else {
    heart += 'text-stone-50'
  }

  return (
    <>
      {item.sale && (
        <div className="z-[-1]  bg-[hsla(0,89%,70%,1)] text-stone-50 px-2 py-1 text-sm top-2 left-2 absolute ">
          SALE
        </div>
      )}
      {uid &&  <button
        onClick={(e) => {
          e.preventDefault(); 
          e.stopPropagation(); 
          handleFavorites(); 
        }}
        className={heart}
      >
        <FontAwesomeIcon icon={faHeart} className="active:scale-70" />
      </button>}
     
      <div className="md:w-80 w-60 z-[-10]">
        <img
          src={item.image}
          alt="image"
          className="w-full aspect-square object-center z-0"
        />
      </div>
      <div className="flex flex-row w-full items-center h-16">
        <p className="w-full text-center">{item.name}</p>
        {item.sale ? (
          <div className="flex md:flex-row flex-col justify-around w-full ">
            <p>{"$ " + item.finalPrice.toFixed(2)}</p>
            <p className="line-through text-stone-500">
              {"$ " + item.price.toFixed(2)}
            </p>
          </div>
        ) : (
          <p className="w-full text-center">{"$ " + item.price.toFixed(2)}</p>
        )}
      </div>
      {quantity && <p>{quantity}</p>}
    </>
  );
}
