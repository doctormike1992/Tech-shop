export default function ProductItem({ item, discountedPrice }) {
  return <>
    {item.sale && (
      <div className="bg-[hsla(0,89%,70%,1)] text-stone-50 px-2 py-1 text-sm top-2 left-2 absolute ">
        SALE
      </div>
    )}

    <div className="md:w-80 w-60">
      <img
        src={item.image}
        alt="image"
        className="w-full aspect-square object-center"
      />
    </div>
    <div className="flex flex-row w-full items-center h-16">
      <p className="w-full text-center">{item.name}</p>
      {item.sale ? (
        <div className="flex flex-row justify-around w-full ">
          <p>{"$ " + discountedPrice.toFixed(2)}</p>
          <p className="line-through text-stone-500">
            {"$ " + item.price.toFixed(2)}
          </p>
        </div>
      ) : (
        <p className="w-full text-center">{"$ " + item.price.toFixed(2)}</p>
      )}
    </div>
  </>;
}
