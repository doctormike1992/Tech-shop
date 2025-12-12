import dayjs from "dayjs";

export function isOrderExpired(orderDate, deliveryDate) {
  return dayjs().diff(dayjs(orderDate, "YYYY-MM-DD"), "day") >= deliveryDate;
}
