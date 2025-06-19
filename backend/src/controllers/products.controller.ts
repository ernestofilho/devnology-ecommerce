import { Controller, Get, Query, Post } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ProductResponse } from '../interfaces/product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(@Query('search') search?: string, @Query('provider') provider?: string): Promise<ProductResponse[]> {
    if (search) {
      return await this.productsService.searchProducts(search);
    }
    
    if (provider) {
      return await this.productsService.getProductsByProvider(provider);
    }
    
    return await this.productsService.getAllProducts();
  }

  @Post('refresh')
  async refreshProducts(): Promise<ProductResponse[]> {
    return await this.productsService.refreshProducts();
  }
}

