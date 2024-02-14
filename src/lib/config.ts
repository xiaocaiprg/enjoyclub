export const OrderStatusEnum = {
  ORDERED: 1, // 已下单，去确认
  CONFIRM: 2, // 已确认,去付款
  HASPAYED: 3, // 已付款
  RECEIVED: 4, // 已确认收款
  DONE: 5, // 已完成
  CANCEL: 6, // 已取消
};
export const OrderStatus = [
  {
    label: "已下单",
    value: OrderStatusEnum.ORDERED,
    type: "danger",
  },
  {
    label: "商家已确认",
    value: OrderStatusEnum.CONFIRM,
    type: "primary",
  },
  {
    label: "商家已付款",
    value: OrderStatusEnum.HASPAYED,
    type: "warning",
  },
  { label: "已确认收款", value: OrderStatusEnum.RECEIVED, type: "warning" },
  {
    label: "已完成",
    value: OrderStatusEnum.DONE,
    type: "success",
  },
  {
    label: "取消订单",
    value: OrderStatusEnum.CANCEL,
    type: "info",
  },
];
