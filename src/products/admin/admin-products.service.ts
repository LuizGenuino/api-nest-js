import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { ProductSlugAlreadyExistsError } from '../error.js';
import { NotFoundError } from '../../common/errors.js';

@Injectable()
export class AdminProductsService {

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
        console.log(id)
        console.log(updateProductDto)

        let product = await this.prismaService.product.findFirst({
            where: {
                slug: updateProductDto.slug
            }
        });

        console.log(product)

        if (product && product.id !== id) {
            throw new ProductSlugAlreadyExistsError(updateProductDto.slug || '')
        }

        product = product && product.id === id ? product : await this.findOne(id) // se o produto nao existir ou o id for diferente do passado faço a verificação se ele existe

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
