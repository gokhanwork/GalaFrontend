import { CategoryModel } from './../../category/models/categoryModel';
import { Category } from './../../../models/category';
export interface ProductModel {
  id:string
  name:string
  description:string
  rate:number
  imagePath:string
  categoryId:number
  subCategoryId:number
  category:CategoryModel
  subCategory:CategoryModel
}
