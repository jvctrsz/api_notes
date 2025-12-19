import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryService } from './services/create-category/create-category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryService } from './services/update-category/update-category.service';
import { FindOneCategoryService } from './services/find-one-category/find-one-category.service';
import { FindAllCategoryService } from './services/find-all-category/find-all-category.service';
import { DeleteCategoryService } from './services/delete-category/delete-category.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private createCategoryService: CreateCategoryService,
    private updateCategoryService: UpdateCategoryService,
    private findOneCategoryService: FindOneCategoryService,
    private findAllCategoryService: FindAllCategoryService,
    private deleteCategoryService: DeleteCategoryService,
  ) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.createCategoryService.create(createCategoryDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateCategoryDto: UpdateCategoryDto,
  ) {
    return this.updateCategoryService.update(id, UpdateCategoryDto);
  }

  @Get()
  findAll() {
    return this.findAllCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.findOneCategoryService.findOne({ id });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.deleteCategoryService.delete(id);
  }
}
