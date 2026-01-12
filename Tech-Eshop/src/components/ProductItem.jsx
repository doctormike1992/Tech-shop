import { useSelector } from "react-redux";
import CartIcon from "../icons/cart.svg?react";
import HeartIcon from "../icons/heart.svg?react";


export default function ProductItem({
  item,
  handleFavorites,
  inFavorites,
  userLoggedIn,
  handleAddToCart,
  hideHeart
}) {
  const uid = useSelector((state) => state.user.userUID);

  return (
    <>
      {item.sale && (
        <div className="z-10  bg-red-600 text-stone-50 px-2 text-[12px] font-medium top-2 left-2 absolute rounded-md ">
          -{item.percentage}% OFF
        </div>
      )}
      {uid && !hideHeart && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleFavorites();
          }}
          className="absolute top-2 right-2 py-1.5 px-2 bg-(--purple)/50 rounded-full cursor-pointer z-10"
        >
          <HeartIcon
            className={` ${
              inFavorites ? "text-white fill-current" : "text-white  "
            }
            transition-all
            w-5 h-5.5
            active:scale-75
            z-50`}
          />
        </button>
      )}

      <div className="rounded-xl bg-(--white) overflow-hidden border-(--secondary) dark:border-(--ordersBorder)  border group md:w-88 lg:w-90 w-full ">
        <div className="w-full -z-10 overflow-hidden">
          <img
            src={item.image}
            alt="image"
            className="w-full transition-all group-hover:scale-105 aspect-4/3 object-cover z-0"
          />
        </div>
        <div className="px-4  py-1.5 min-w-0">
          <div className="flex flex-col justify-start w-full gap-1.5 items-start  md:h-31 min-w-0">
            <p className="w-full tracking-wide text-(--primary) pt-3 font-medium">
              {item.name}
            </p>

            <div className="flex  flex-row gap-2">
              <p className="text-[0.7rem]  text-center tracking-wide text-white font-medium  bg-(--purple) shadow/20  rounded-lg px-1.5 py-0.5">
                {item.category}
              </p>

              <p className="text-[0.7rem] tracking-wide font-medium text-(--primary) border border-(--ordersBorder) rounded-lg py-0.5 px-1.5 ">
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
                  item.sale ? "text-red-600" : "text-(--primary)"
                }`}
              >
                {item.finalPrice.toFixed(2)}
                <sup>€</sup>
              </p>
              {item.sale && (
                <p className=" text-(--secondText) text-sm font-semibold px-1">
                  <span className="line-through">{item.price.toFixed(2)}</span>

                  <sup>€</sup>
                </p>
              )}
            </div>

            <button
              hidden={!userLoggedIn}
              className="bg-(--deepBlue) flex flex-row gap-0.5 text-stone-50 text-sm font-medium px-3 py-2  cursor-pointer hover:bg-(--deepBlue)/90 rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart(item);
              }}
            >
              <CartIcon className='w-4 h-4' />
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
