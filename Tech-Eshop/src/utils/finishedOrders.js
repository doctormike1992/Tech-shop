import dayjs from "dayjs";

export function isOrderExpired(orderDate, deliveryDate) {
  return dayjs().diff(dayjs(orderDate, "DD-MM-YYYY"), "day") >= deliveryDate;
}

export function isOrderProcessing(orderDate, deliveryTime) {
  const daysPassed = dayjs().diff(dayjs(orderDate, "DD-MM-YYYY"), "day");
  const daysLeft = deliveryTime - daysPassed;
  return daysLeft === 1;
}