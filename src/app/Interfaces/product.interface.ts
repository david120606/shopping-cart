export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating
}
interface Rating {
    count: number,
    rate: number
}


export interface CartItem {
    product: Product;
    quantity: number;
  }