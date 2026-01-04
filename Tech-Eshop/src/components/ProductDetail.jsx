import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function ProductDetail() {
  const { productId } = useParams();
  const products = useSelector((state) => state.products.products);



  const product = products.length !== 0 && products.find((item) => item.id === productId);
  
  const {
    name,
    image,
    finalPrice,
    price,
    sale,
    percentage,
    category,
    subCategory,
    // description,
    summary,
    brand,
    // specifications,
    deliveryTime,

  } = product;
  

  return (
    <section className="flex flex-col w-full max-w-3/5 items-start justify-start px-3 py-5">
      <Link className="pb-10" to={"/"}>
        <button className="flex flex-row items-center gap-2 hover:bg-(--secondary) pr-4 pl-1 py-2 rounded-md transition-all font-medium text-sm">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
      </Link>

      <main className="w-full flex flex-col lg:flex-row gap-5">
        <div className="min-w-100 min-h-100 w-188 h-188  rounded-lg aspect-square overflow-hidden">
          <img src={image} className="rounded-lg object-cover h-full w-full" />
        </div>

        <div className="flex flex-col  gap-5 items-start">
          <div className="flex flex-row gap-3 justify-start">
            <p className="text-(--white) bg-(--primary) px-2 py-1 text-xs font-medium rounded-lg">
              {category}
            </p>
            <p className="text-(--primary) bg-(--secondary) px-2 py-1 text-xs font-medium rounded-lg">
              {subCategory}
            </p>
            <p className="text-(--primary) bg-(--white) px-2 py-1 text-xs border border-(--secondary) font-medium rounded-lg">
              {brand}
            </p>
            {sale && (
              <p className="text-(--white) bg-red-600 px-2 py-1 text-xs font-medium rounded-lg">
                -{percentage}%
              </p>
            )}
          </div>

          <div className="text-start">
            <h1 className="font-semibold text-xl">{name}</h1>
          </div>

          <div className="text-start">
            <h3 className="text-lg text-(--secondText) font-medium">
              {summary}
            </h3>
          </div>

          <div className="flex flex-row items-end justify-center gap-3">
            <p className={`text-4xl ${sale && "text-red-600"}`}>
              {finalPrice.toFixed(2)}
              <sup>€</sup>
            </p>
            {sale && (
              <p className="text-3xl text-(--secondText) line-through">
                {price.toFixed(2)}
                <sup>€</sup>
              </p>
            )}
          </div>

          <hr className="w-full text-(--secondary)" />

          <div className="w-full flex flex-col">
            <button>Add to Cart</button>
            <button>Add to Favorites</button>
          </div>

          <hr className="w-full text-(--secondary)" />

          <div className="flex flex-col justify-start">
            <div className="flex flex-row items-center justify-start">
              <FontAwesomeIcon icon={faArrowLeft} />
              <div className="flex flex-col text-start">
                <p>Delivery in {deliveryTime} Days</p>
                <p>Fast and reliable shipping</p>
              </div>
            </div>

            <div className="flex flex-row items-center justify-start">
              <FontAwesomeIcon icon={faArrowLeft} />
              <div className="flex flex-col text-start">
                <p>Delivery in {deliveryTime} Days</p>
                <p>Fast and reliable shipping</p>
              </div>
            </div>

            <div className="flex flex-row items-center justify-start">
              <FontAwesomeIcon icon={faArrowLeft} />
              <div className="flex flex-col text-start">
                <p>Delivery in {deliveryTime} Days</p>
                <p>Fast and reliable shipping</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
