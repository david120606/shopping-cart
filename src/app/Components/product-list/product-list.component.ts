import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Product } from 'src/app/Interfaces/product.interface';
import { CartService } from 'src/app/Services/cart/cart.service';
import { ProductService } from 'src/app/Services/product/product.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  paginatedProducts: Product[] = [];
  filteredProducts: Product[] = [];
  pageSize = 6;
  pageIndex = 0;
  length = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchText: string = '';
  constructor(readonly productService: ProductService,
    readonly cartService: CartService,
    public dialog: MatDialog) { }

  async ngOnInit() {
    this.products = await this.productService.getProducts();
    this.filteredProducts = this.products;
    this.length = this.filteredProducts.length;
    this.paginateProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);

  }
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.paginateProducts();
  }

  paginateProducts(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.length = this.filteredProducts.length;
    this.pageIndex = 0;
    this.paginateProducts();
  }
  getTruncatedDescription(description: string): string {
    if (description.length > 100) {
      return description.substring(0, 100) + '...';
    }
    return description;
  }

  openProductDetail(product: Product) {
    this.dialog.open(ProductDetailComponent, {
      data: product
    });
  }
}
