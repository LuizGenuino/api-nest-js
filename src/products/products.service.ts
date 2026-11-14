import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProductsService {

    constructor(private prismaService: PrismaService) { }

    create(createProductDto: CreateProductDto) {
        return this.prismaService.product.create({
            data: createProductDto
        });
    }

    findAll() {
        return this.prismaService.product.findMany();
    }

    findOne(id: string) {
        return this.prismaService.product.findFirst({
            where: {
                id: id
            }
        });
    }

    update(id: string, updateProductDto: UpdateProductDto) {
        return this.prismaService.product.update({
            where: {
                id: id
            },
            data: updateProductDto
        });
    }

    remove(id: string) {
        return this.prismaService.product.delete({
            where: {
                id: id
            }
        });
    }
}
