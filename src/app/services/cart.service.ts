import { Injectable, signal } from '@angular/core';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Product[]>([]);
  qty: number = 0;

  addToCart(product: Product) {
    if ((product.stock ?? 0) > 0) {
      const currentCart = this.cart();
      const existingProduct = currentCart.find((p) => p.id === product.id);

      if (existingProduct) {
        // Increase quantity and reduce stock
        existingProduct.qty = (existingProduct.qty ?? 1) + 1;
      } else {
        // Add new product with qty = 1
        currentCart.push({ ...product, qty: 1 });
      }

      product.stock = (product.stock ?? 0) - 1;

      this.cart.set([...currentCart]);
    } else {
      console.warn('Product is out of stock');
    }
  }

  removeFromCart(id: number) {
    const currentCart = this.cart();
    const index = currentCart.findIndex((p) => p.id === id);

    if (index !== -1) {
      const product = currentCart[index];

      // Increase stock when removing from cart
      product.stock = (product.stock ?? 0) + 1;

      if ((product.qty ?? 1) > 1) {
        // Just reduce the quantity
        product.qty = (product.qty ?? 1) - 1;
      } else {
        // Remove item if qty becomes 0
        currentCart.splice(index, 1);
      }

      this.cart.set([...currentCart]);
    }
  }

  constructor() {}
}
