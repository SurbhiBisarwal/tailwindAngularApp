import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/products.model';
import { ButtonComponent } from '../../../components/button/button.component';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div
      class="bg-white shadow-md border rounded-xl p-6 flex gap-4 items-center"
    >
      <img [src]="item().image" class="w-[50px] h-[50px] object-contain" />
      <div class="flex flex-col">
        <span class="text-md font-bold">{{ item().title }}</span>
        <span class="text-sm">{{ '$' + item().price }}</span>
      </div>
      <div class="flex-1 flex justify-end items-center gap-4">
        <div class="flex items-center gap-2">
          <app-button
            class="max-w-[50px]"
            label="-"
            (btnClicked)="decreaseQty()"
          />
          <div class="min-w-[30px] text-center font-bold">
            {{ item().qty }}
          </div>
          <app-button
            class="max-w-[50px]"
            label="+"
            (btnClicked)="increaseQty()"
          />
        </div>
        <app-button
          class="max-w-[100px]"
          label="Remove"
          (btnClicked)="cartService.removeFromCart(item().id)"
        />
      </div>
    </div>
  `,
  styles: ``,
})
export class CartItemComponent {
  cartService = inject(CartService);
  item = input.required<Product>();

  increaseQty() {
    this.cartService.addToCart(this.item());
  }

  decreaseQty() {
    this.cartService.removeFromCart(this.item().id);
  }
}
