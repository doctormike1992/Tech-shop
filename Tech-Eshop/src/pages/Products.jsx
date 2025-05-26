import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Products() {
  const products = useSelector((state) => state.products.products);


  return (
    <>
      <section>
        <div>
          <ul>
            {products.map((item) => {
              const discountAmount = item.price / item.percentage;
              const discountedPrice = item.price - discountAmount;
              const percentageLabel = `${(item.percentage * 1).toFixed(0)}%`;
              return (
                <li key={item.id}>
                  {!item ? (
                    <div
                      className="w-12 h-12 border-4 border-blue-500 border-t-transparent
                            rounded-full animate-spin"
                    ></div>
                  ) : (
                    <Link to={`/${item.id}`}>
                      <div>
                        <img
                          src={item.image}
                          alt="image"
                          className="w-sm h-md  aspect-square object-center"
                        />
                      </div>
                      <div>
                        <p>{item.name}</p>

                        {item.sale ? (
                          <div>
                            <p>
                              Discounted Price: €{discountedPrice.toFixed(0)} (
                              {percentageLabel} OFF)
                            </p>
                            <p className="line-through">{item.price}</p>
                          </div>
                        ) : (
                          <p>{item.price}</p>
                        )}
                      </div>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
