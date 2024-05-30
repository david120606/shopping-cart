import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Product } from 'src/app/Interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'shoppingCart';
  private cart = new BehaviorSubject<CartItem[]>(this.loadCart());
  
  cart$ = this.cart.asObservable();
  constructor(){
    localStorage.clear();
  }

  addToCart(product: Product) {
    const currentCart = this.cart.value;
    const existingItem = currentCart.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.push({ product, quantity: 1 });
    }

    this.cart.next(currentCart);
    this.saveCart(currentCart);
  }

  removeFromCart(product: Product) {
    const currentCart = this.cart.value.map(item => {
      if (item.product.id === product.id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter(item => item.quantity > 0);

    this.cart.next(currentCart);
    this.saveCart(currentCart);
  }

  private saveCart(cart: CartItem[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  private loadCart(): CartItem[] {
    const savedCart = localStorage.getItem(this.cartKey);
    return savedCart ? JSON.parse(savedCart) : [];
  }
  getTotalItems() {
    return this.cart.value.length;
  }
}
