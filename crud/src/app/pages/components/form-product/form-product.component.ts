import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';

// Importaciones de NG-ZORRO (si las usas)
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-form-product',
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.css'
})
export class FormProductComponent {


  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
   
     private message: NzMessageService
  ) {

    //Form agrupado para que haga una validacion para que los productos no se guarden con valor en 0 ni cantidad en 0
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]], 
      stock: [null, [Validators.required, Validators.min(1)]]
    });
  }

async onSubmit() {
  if (this.form.invalid) {
    this.message.error('Todos los campos son obligatorios y deben ser mayores a 0');
    return;
  }

  try {
    // 🔥 Guardar producto
    await this.productService.addProduct(this.form.value);

    // 🔥 Secuencia de mensajes
    this.message
      .loading('Guardando producto...', { nzDuration: 2000 })
      .onClose!.pipe(
        concatMap(() =>
          this.message.success('Producto guardado correctamente', { nzDuration: 1000 }).onClose!
        )
      )
      .subscribe(() => {
        console.log('Mensajes completados');
        this.form.reset();
      });

  } catch (error) {
    console.error(error);
    this.message.error('Ocurrió un error al guardar');
  }
}


}
