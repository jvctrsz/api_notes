import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CreateCategoryService } from './services/create-category/create-category.service';
import { UpdateCategoryService } from './services/update-category/update-category.service';
import { DeleteCategoryService } from './services/delete-category/delete-category.service';
import { FindOneCategoryService } from './services/find-one-category/find-one-category.service';
import { FindAllCategoryService } from './services/find-all-category/find-all-category.service';

@Module({
  controllers: [CategoriesController],
  providers: [
    CreateCategoryService,
    UpdateCategoryService,
    FindOneCategoryService,
    FindAllCategoryService,
    DeleteCategoryService,
  ],
})
export class CategoriesModule {}
