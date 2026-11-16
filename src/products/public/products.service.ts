import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { NotFoundError } from '../../common/errors.js';

@Injectable()
export class ProductsService {

    constructor(private prismaService: PrismaService) { }


    findAll(dto: { name?: string; page?: number; limit?: number }) { // não precisa de async e await pois eu nao preciso esperar o resultado da requisição para manipular dentro do metodo
        const { name, page = 1, limit = 15 } = dto;
        return this.prismaService.product.findMany({
            ...(name && { // so adiciona esse trecho no objeto se o name existir (muito util na criação de objetos e json sem a necessidade de if e codigos repetidos)
                where: {
                    name: {
                        contains: name
                    }
                }
            }),
            skip: (page - 1) * limit,
            take: limit
        });
    }

    async findOne(slug: string) {
        const product = await this.prismaService.product.findFirst({
            where: {
                slug: slug
            }
        });

        if (!product) {
            throw new NotFoundError('Product', slug, 'slug')
        }

        return product
    }
}
