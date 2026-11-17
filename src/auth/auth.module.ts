import { Module, OnModuleInit } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UserRole } from './roles/roles.js';
import * as bcrypt from 'bcrypt'
import {JwtModule} from '@nestjs/jwt'

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: 'secret',
            signOptions: {expiresIn: '1d'}
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule implements OnModuleInit {

    constructor(private prismaService: PrismaService) { }

    async onModuleInit() {

        const customer = await this.prismaService.user.findFirst({
            where: {
                email: 'customer@user.com'
            }
        })

        if (!customer) {
            await this.prismaService.user.create({
                data: {
                    email: 'customer@user.com',
                    name: "Customer User",
                    password: bcrypt.hashSync('password', 10),
                    role: UserRole.Customer
                }
            })
        }

        const admin = await this.prismaService.user.findFirst({
            where: {
                email: 'admin@user.com'
            }
        })

        if (!admin) {
            await this.prismaService.user.create({
                data: {
                    email: 'admin@user.com',
                    name: "admin User",
                    password: bcrypt.hashSync('password', 10),
                    role: UserRole.Admin
                }
            })
        }


    }
}
