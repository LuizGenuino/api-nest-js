import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ProductSlugAlreadyExistsError } from "../error.js";
import { Response } from "express";

@Catch(ProductSlugAlreadyExistsError)
export class ProductSlugAlreadyExistsErrorFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>()

        return response.status(409).json({
            statusCode: 409,
            message: exception.message,
        })
    }
}