import dayjs from "dayjs";

export function isOrderExpired(orderDate) {
  return dayjs().diff(dayjs(orderDate, "YYYY-MM-DD"), "day") >= 3;
}
