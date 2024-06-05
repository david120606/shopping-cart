import { Injectable } from '@angular/core';
import axios from 'axios';
import { Product } from 'src/app/Interfaces/product.interface';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiProductsUrl = 'https://fakestoreapi.com/products';
  private apiCategoriesUrl = 'https://fakestoreapi.com/products/categories';

  constructor() { }

  async getProducts(): Promise<Product[]> {
    try {
      const response = await axios.get(this.apiProductsUrl);
      return response.data
    } catch {
      return [];
    }
  }
  async getCategories(): Promise<string[]> {
    try {
      const response = await axios.get(this.apiCategoriesUrl);
      return response.data
    } catch {
      return [];
    }
  }
}
