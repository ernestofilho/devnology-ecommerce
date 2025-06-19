import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ProductResponse } from '../interfaces/product.interface';

@Injectable()
export class ProductsService {
  async getAllProducts(): Promise<ProductResponse[]> {
    try {
      console.log('Fetching products from external APIs...');
      
      const [brazilianResponse, europeanResponse] = await Promise.all([
        axios.get('http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider'),
        axios.get('http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider'),
      ]);

      console.log('Brazilian products count:', brazilianResponse.data.length);
      console.log('European products count:', europeanResponse.data.length);

      const products: ProductResponse[] = [];

      // Process Brazilian products
      brazilianResponse.data.forEach((item: any, index: number) => {
        const product: ProductResponse = {
          id: index + 1,
          name: item.nome || item.name || 'Produto sem nome',
          description: item.descricao || item.description || 'Sem descrição',
          price: parseFloat(item.preco || item.price || '0'),
          gallery: Array.isArray(item.gallery) 
          ? item.gallery.map(img => this.changeValidImage(img))
          : [this.changeValidImage(item.gallery || item.imagem || '')],
          provider: 'brazilian',
          originalId: item.id,
        };
        products.push(product);
      });

      // Process European products
      europeanResponse.data.forEach((item: any, index: number) => {
        const product: ProductResponse = {
          id: index + 1000, // Offset to avoid ID conflicts
          name: item.name || item.nome || 'Product without name',
          description: item.description || item.descricao || 'No description',
          price: parseFloat(item.price || item.preco || '0'),
          gallery: Array.isArray(item.gallery) 
          ? item.gallery.map(img => this.changeValidImage(img))
          : [this.changeValidImage(item.gallery || item.imagem || '')],
          provider: 'european',
          originalId: item.id,
        };
        products.push(product);
      });

      console.log('Total products processed:', products.length);
      
      return products;
    } catch (error) {
      console.error('Error fetching products from external APIs:', error);
      throw new HttpException('Error fetching products from external APIs', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchProducts(query: string): Promise<ProductResponse[]> {
    const allProducts = await this.getAllProducts();
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  async getProductsByProvider(provider: string): Promise<ProductResponse[]> {
    const allProducts = await this.getAllProducts();
    return allProducts.filter(product => product.provider === provider);
  }

  async refreshProducts(): Promise<ProductResponse[]> {
    return await this.getAllProducts();
  }

  changeValidImage(url: string): string {
  if (!url || url.includes('placeimg.com')) {
    return `https://picsum.photos/640/480?random=${Math.floor(Math.random() * 1000)}`;
  }
  return url;
}

}

