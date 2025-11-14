import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Product, ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [ CommonModule,NzTableModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

    products: Product[] = [];
  loading = true;

  constructor(private productService: ProductService) {}

  async ngOnInit() {
    await this.loadProducts();
  }

  async loadProducts() {
    this.loading = true;
    this.products = await this.productService.getProducts();
    this.loading = false;
  }

  async delete(id: number) {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
      await this.productService.deleteProduct(id);
      await this.loadProducts();
    }
  }

}
