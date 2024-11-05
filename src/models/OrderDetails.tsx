import { OrderItem } from "./OrderItem";

export interface OrderDetails {
    orderId: number;
    orderDate: string;
    amount: number;
    items: OrderItem[];
}