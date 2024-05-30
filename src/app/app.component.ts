import { Component } from '@angular/core';
import { CartService } from './Services/cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCartVisible = false;
  totalItems = () => this.cartService.getTotalItems();
  constructor(private cartService: CartService) {
    //this.totalItems = cartService.getTotalItems();
  }
  toggleCart() {
    this.isCartVisible = !this.isCartVisible;
  }
}
