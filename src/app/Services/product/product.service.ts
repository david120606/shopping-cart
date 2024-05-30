import { Injectable } from '@angular/core';
import axios from 'axios';
import { Product } from 'src/app/Interfaces/product.interface';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://fakestoreapi.com/products';

  constructor() { }

  async getProducts(): Promise<Product[]> {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data
    } catch {
      return [];
    }
  }
}
