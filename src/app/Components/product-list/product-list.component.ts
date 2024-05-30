import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Interfaces/product.interface';
import { CartService } from 'src/app/Services/cart/cart.service';
import { ProductService } from 'src/app/Services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(readonly productService: ProductService, readonly cartService: CartService) { }

  async ngOnInit() {
    this.products = await this.productService.getProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
  getTruncatedDescription(description: string): string {
    if (description.length > 100) {
        return description.substring(0, 100) + '...';
    }
    return description;
}
}
