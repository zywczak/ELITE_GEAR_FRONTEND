import { OrderItem } from "./OrderItem";

export interface Order{
    id: number;
    orderDate: string;
    amount: number;
    isPaid: boolean;
    products: OrderItem[];
}