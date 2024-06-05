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
  constructor() {
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
    const currentCart = this.cart.value.filter(item => item.product.id !== product.id);
    this.cart.next(currentCart);
    this.saveCart(currentCart);
  }
  incrementQuantity(cartItem: CartItem): void {
    cartItem.quantity += 1;
    this.updateCart(this.cart.value);
  }

  decrementQuantity(cartItem: CartItem): void {
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      this.removeFromCart(cartItem.product);
    }
    this.updateCart(this.cart.value);
  }

  getTotalItems() {
    return this.cart.value.length;
  }

  updateCart(cart: CartItem[]) {
    this.cart.next(cart);
    this.saveCart(cart);
  }
  getTotalPrice(): number {
    return this.cart.value.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  private saveCart(cart: CartItem[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  private loadCart(): CartItem[] {
    try {
      const savedCart = localStorage.getItem(this.cartKey);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart', error);
      return [];
    }
  }
}
