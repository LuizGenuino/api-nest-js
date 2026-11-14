import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaLibSql } from '@prisma/adapter-libsql';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

    constructor() {
        const adapter = new PrismaLibSql({
            url: process.env.DATABASE_URL ?? "file:./database.sqlite"
        })

        super({ adapter })
    }

    async onModuleInit() {
        await this.$connect()
    }
}
