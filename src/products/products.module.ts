import { Module, OnModuleInit } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { ProductsController } from './products.controller.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Module({
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule implements OnModuleInit {

    constructor(private prismaService: PrismaService) {}

    async onModuleInit() {
        const products = new Array(10).fill(0).map((_, index) => ({
            name: `Product ${index + 1}`,
            slug: `product-${index + 1}`,
            description: `Description for product ${index + 1}`,
            price: (index + 1) * 10,
        }));

        await this.prismaService.product.deleteMany(); // Clear existing products

        for (const product of products) {
            await this.prismaService.product.create({ data: product });
        }
        
    }
}
