import { Injectable } from '@nestjs/common';
import { LoginDto } from './login.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AuthService {

    constructor(private prismaService: PrismaService) { }

    login(dto: LoginDto) {
        const user = this.prismaService.user.findFirst({
            where: {
                email: dto.email,
            }
        })
    }
}
