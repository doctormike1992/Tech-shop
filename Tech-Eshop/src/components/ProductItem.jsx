import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function ProductItem({
  item,
  handleFavorites,
  inFavorites,
  userLoggedIn,
  handleAddToCart,
}) {
  const uid = useSelector((state) => state.user.userUID);

  let heart =
    "absolute top-2 right-2 py-1 z-1 px-2 bg-stone-300/60  cursor-pointer rounded-lg ";

  if (inFavorites) {
    heart += "text-red-600";
  } else {
    heart += "text-stone-50";
  }

  return (
    <>
      {item.sale && (
        <div className="z-1  bg-red-600 text-stone-50 px-2 text-[12px] font-medium top-2 left-2 absolute rounded-md">
          -{item.percentage}% OFF
        </div>
      )}
      {uid && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleFavorites();
          }}
          className={heart}
        >
          <FontAwesomeIcon icon={faHeart} className="active:scale-70 -z-10" />
        </button>
      )}

      <div className="rounded-xl overflow-hidden border-stone-300 border group md:w-88 lg:w-90 w-65 ">
        <div className="w-full -z-10 overflow-hidden">
          <img
            src={item.image}
            alt="image"
            className="w-full transition-all group-hover:scale-105 aspect-4/3 object-cover z-0"
          />
        </div>
        <div className="px-4  py-1.5 min-w-0">
          <div className="flex flex-col justify-start w-full gap-1.5 items-start  md:h-31 min-w-0">
            <p className="w-full tracking-wide pt-3 font-medium">{item.name}</p>

            <div className="flex flex-row gap-2">
              <p className="text-[0.8rem] tracking-wider font-medium  bg-(--secondary) shadow/20 rounded-md py-1 px-1.5 ">
                {item.category}
              </p>

              <p className="text-[0.8rem] tracking-wider font-medium  shadow/20 rounded-md py-1 px-1.5 ">
                {item.brand}
              </p>
            </div>

            <p className="w-full font-normal wrap-break-word text-sm text-(--secondText) md:line-clamp-2 line-clamp-1">
              {item.summary}
            </p>
          </div>

          <div className="flex pt-6 flex-row pb-3 items-center justify-between">
            <div className="flex gap-2 items-center">
              <p
                className={`text-center  font-semibold ${
                  item.sale && "text-red-600"
                }`}
              >
                {item.finalPrice.toFixed(2)}<sup>€</sup>
              </p>
              {item.sale && (
                <p className="bg-stone-200 rounded-sm font-semibold px-1 line-through">
                  $ {item.price.toFixed(2)}
                </p>
              )}
            </div>

            <button
              hidden={!userLoggedIn}
              className="bg-stone-900 text-stone-50 text-sm font-medium px-3 py-2  cursor-pointer hover:bg-stone-700 rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart(item);
              }}
            >
              <FontAwesomeIcon className="pr-2" icon={faCartShopping} />
              Add
            </button>
          </div>
          <p className="text-xs  pb-2 text-(--secondText)">
            days to deliver: {item.deliveryTime}
          </p>
        </div>
      </div>
    </>
  );
}
