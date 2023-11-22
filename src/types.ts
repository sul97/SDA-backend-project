import { Category } from './models/categorySchema';

export type Product = {
    id:string,
    name: string,
    price: number
    quantity: number,
    description: string
    category:string
}
export type Category = {
    id:string,
    name: string,
}
export type ProductInput = Omit<Product,'id'>;
export type CategoryInput = Omit<Category,'id'>;
