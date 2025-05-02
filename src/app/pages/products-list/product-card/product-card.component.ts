import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/products.model';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { CartService } from '../../../services/cart.service';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent, NgClass],
  template: `<div
    class="bg-white shadow-md border rounded-xl p-6 flex flex-col gap-6 relative "
  >
    <div class="mx-auto mt-10">
      <img
        [src]="product().image"
        class=" mx-auto w-[200px] h-[100px] object-contain"
      />
      <div class="flex flex-col  w-[300px] h-[200px] ">
        <span
          class="text-md font-bold mx-auto w-40"
          [ngClass]="{ truncate: !showFull }"
        >
          {{ product().title }}
        </span>

        <button
          class="text-blue-500 text-sm ml-2 underline"
          (click)="toggleShow()"
        >
          {{ showFull ? 'Show Less' : 'Read More' }}
        </button>
        <span class="text-sm mx-auto">{{ '$' + product().price }} </span>
        <app-primary-button
          label="Add to cart"
          class=" mx-auto mt-10 "
          (btnClicked)="cartService.addToCart(product())"
        />
      </div>
      <span
        class="absolute top-2 right-3 text-sm font-bold"
        [class]="product().stock ? 'text-green-500' : 'text-red-500'"
      >
        @if(product().stock){
        {{ product().stock }}left }@else {Out Of Stock}
      </span>
    </div>
  </div>`,
  styles: ``,
})
export class ProductCardComponent {
  cartService = inject(CartService);
  product = input.required<Product>();
  showFull = false;

  toggleShow() {
    this.showFull = !this.showFull;
  }
}
