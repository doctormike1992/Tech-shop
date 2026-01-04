import dayjs from "dayjs";



export function orderStatus(orderDate, deliveryTime) {
  const daysPassed = dayjs().diff(dayjs(orderDate, "YYYY-MM-DD"), "day");
  const daysLeft = deliveryTime - daysPassed;
  if (daysLeft <= 0) {
    return 'delivered'
  }
  if (daysLeft === 2) {
    return "processing";
  }
  if (daysLeft === 1) {
    return 'shipped'
  }
  return 'pending';
};