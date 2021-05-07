import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  private findProduct(id: string): [Product, number]{
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex]
    if (!product) {
    //   return { message: 'nu s-a gasit produs' };
      throw new NotFoundException('nu am gasit nimic')
    }
    return [product, productIndex];
  }

  insertProduct(title: string, description: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getProduct(id: string) {
    const product = this.findProduct(id)[0]
    return { ...product };
  }

  updateProduct(
    id: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.findProduct(id)
    const updateProduct = {...product}
    if(title){
        updateProduct.title = title;
    }
    if(description){
        updateProduct.description = description;
    }
    if(price){
        updateProduct.price = price;
    }
    this.products[index] = updateProduct;
  }


  deleteAProduct(id: string){
    const [product, index] = this.findProduct(id)
    this.products.splice(index, 1)
  }

}
