import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../../services/product.service';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    ReactiveFormsModule,
    NzInputModule,   // 👈 NECESARIO
    NzFormModule,
    NzIconModule  
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  loading = true;

  isEditVisible = false;
  editForm!: FormGroup;
  currentId!: number;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.loadProducts();

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      price: [1, [Validators.required, Validators.min(1)]],
      stock: [1, [Validators.required, Validators.min(1)]]
    });
  }

  async loadProducts() {
    this.loading = true;
    this.products = await this.productService.getProducts();
    this.loading = false;
  }

  /** 🔵 ABRIR MODAL Y CARGAR DATOS */
openEdit(product: Product) {
  this.currentId = product.id!;

  this.editForm.patchValue({
    name: product.name,
    price: product.price,
    stock: product.stock
  });

  this.isEditVisible = true;
}


  /** 🟢 GUARDAR CAMBIOS */
  async updateProduct() {
  if (this.editForm.invalid) return;

  await this.productService.updateProduct(this.currentId, this.editForm.value);
  this.isEditVisible = false;
  this.loadProducts();
}

  handleCancel() {
    this.isEditVisible = false;
  }

  /** 🔴 ELIMINAR PRODUCTO CON MODAL */
  delete(id: number) {
    this.modal.confirm({
      nzTitle: '¿Eliminar este producto?',
      nzOkText: 'Eliminar',
      nzOkDanger: true,
      nzCancelText: 'Cancelar',
      nzOnOk: async () => {
        await this.productService.deleteProduct(id);
        this.message.success('Producto eliminado');
        this.loadProducts();
      }
    });
  }
}
