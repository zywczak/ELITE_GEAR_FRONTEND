import { OrderItem } from "./OrderItem";

export interface Order{
    orderId: number;
    orderDate: string;
    amount: number;
    paid: boolean;
    products: OrderItem[];
}