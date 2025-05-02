import { Injectable, signal } from '@angular/core';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Product[]>([]);
  // addToCart(product: Product) {
  //   this.cart.set([...this.cart(), product]);
  // }/

  addToCart(product: Product) {
    if ((product.stock ?? 0) > 0) {
      product.stock = (product.stock ?? 0) - 1;
      this.cart.set([...this.cart(), product]);
    } else {
      console.warn('Product is out of stock');
      // Optionally show a message to the user
    }
  }
  removeFromcart(id: number) {
    // Find the product to update its stock
    const productToRemove = this.cart().find((p) => p.id === id);

    if (productToRemove) {
      // Increment the stock by 1 for the removed product
      productToRemove.stock = (productToRemove.stock ?? 0) + 1;

      // Update the cart after modifying the stock
      this.cart.set(this.cart().filter((p) => p.id !== id));
    }
  }

  constructor() {}
}
