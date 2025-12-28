import dayjs from "dayjs";

export function isOrderExpired(orderDate, deliveryDate) {
  return dayjs().diff(dayjs(orderDate, "DD-MM-YYYY"), "day") >= deliveryDate;
}
