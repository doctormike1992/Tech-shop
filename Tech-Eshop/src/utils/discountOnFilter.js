//FILTERING WORKING WITH THE DISCOUNT NUMBER
export function discountOnFilter(item) {
  if (item.sale) {
    const discountedPrice = item.price * (1 - item.percentage); 
    return discountedPrice;
  } else {
    return item.price;
  }
}

  
