import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ProductSlugAlreadyExistsError } from './error.js';
import { NotFoundError } from '../common/errors.js';

@Injectable()
export class ProductsService {

    constructor(private prismaService: PrismaService) { }

    async create(createProductDto: CreateProductDto) { // quano eu preciso manipular o resultado da requisição dentro do proprio metodo eu preciso do async e await
        const product = await this.prismaService.product.findFirst({
            where: {
                slug: createProductDto.slug
            }
        })
        if (product) {
            throw new ProductSlugAlreadyExistsError(createProductDto.slug);
        }
        return this.prismaService.product.create({
            data: createProductDto
        });
    }

    findAll() { // não precisa de async e await pois eu nao preciso esperar o resultado da requisição para manipular dentro do metodo
        return this.prismaService.product.findMany();
    }

    async findOne(id: string) {
        const product = await this.prismaService.product.findFirst({
            where: {
                id: id
            }
        });

        if (!product) {
            throw new NotFoundError('Product', id)
        }

        return product
    }

    async update(id: string, updateProductDto: UpdateProductDto) {

        this.findOne(id)

        return this.prismaService.product.update({
            where: {
                id: id
            },
            data: updateProductDto
        });
    }

    async remove(id: string) {
        await this.findOne(id)

        return this.prismaService.product.delete({
            where: {
                id: id
            }
        });
    }
}
