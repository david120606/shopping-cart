import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartItem, Product } from 'src/app/Interfaces/product.interface';
import { CartService } from 'src/app/Services/cart/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {

  cartItem!: CartItem;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    readonly cartService: CartService
  ) {
    this.cartItem = this.cartService.existInCart(this.data);
  }

  addToCart() {
    this.cartService.addToCart(this.data);
  }

  incrementQuantity() {
    this.cartService.incrementQuantity(this.cartItem);
  }

  decrementQuantity() {
    this.cartService.decrementQuantity(this.cartItem);
  }

  
}
