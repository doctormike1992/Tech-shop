import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProductDetail() {
  const { productId } = useParams();
  const products = useSelector((state) => state.products.products);



  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <div
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent
     rounded-full animate-spin"
      ></div>
    );
  }

  const {
    name,
    image,
    price,
    sale,
    percentage,
    category,
    subCategory,
    description,
    summary,
    brand,
    specifications

  } = product;
  const discountedPrice = sale ? price - price * (percentage / 100) : price;

  return (
    <div>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>
        {sale
          ? `Discounted Price: €${discountedPrice.toFixed(
              2
            )} (${percentage}% OFF) (From €${price.toFixed(2)})`
          : `Price: €${price.toFixed(2)}`}
      </p>
      <p>
        <strong>Category:</strong> {category}
      </p>
      <p>
        <strong>Sub-Category:</strong> {subCategory}
      </p>
      <p>{summary}</p>
      <p>{brand}</p>
      <p>{description}</p>
      {specifications?.map((item) => (
        <div key={item.id}> 
          <p>{item.name}</p>
        <p>{item.value}</p>
        </div>
        
      )) }
    </div>
  );
}
