import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const order = this.orderRepository.create({
        customerName: createOrderDto.customerName,
        customerEmail: createOrderDto.customerEmail,
        customerPhone: createOrderDto.customerPhone,
        customerAddress: createOrderDto.customerAddress,
        items: JSON.stringify(createOrderDto.items),
        total: createOrderDto.total,
      });

      return await this.orderRepository.save(order);
    } catch (error) {
      throw new HttpException('Error creating order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    
    return order;
  }
}

