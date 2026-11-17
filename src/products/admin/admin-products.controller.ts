import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { AdminProductsService } from './admin-products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { AuthGuard } from '../../auth/auth.guard.js';
import { UserRole } from '../../auth/roles/roles.js';
import { Roles } from '../../auth/roles/roles.decorator.js';
import { RolesGuard } from '../../auth/roles/roles.guard.js';

@Roles([UserRole.Admin])
@UseGuards(AuthGuard, RolesGuard)
@Controller('admin/products')
export class AdminProductsController {
  constructor(private readonly productsService: AdminProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id') // PUT - Atualização Total (recebe todos os campos) || PATCH - atualização parcial (só os campos que sao mudados) 
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
