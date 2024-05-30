import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem, Product } from 'src/app/Interfaces/product.interface';
import { CartService } from 'src/app/Services/cart/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  @Input() isVisible: boolean = false;
  cart: CartItem[] = [];
  total: number = 0;
  constructor(private cartService: CartService) { 
    
    
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.calculateTotal()
    });
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
    console.log('Product removed from cart:', product);
  }
  private calculateTotal(): void {
    this.total = this.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }
}
