export interface CartItemProps {
    manufacturer: string;
    model: string;
    photos: string[];
    quantity: number;
    price: number;
    productId: number;
    onQuantityChange: (productId: number) => void;
}