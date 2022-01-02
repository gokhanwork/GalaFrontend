import { PaginatedFilter } from "src/app/core/models/filters/PaginatedFilter";


export class CategoryParams implements PaginatedFilter {
  searchString: string;
  pageNumber: number;
  pageSize: number;
  orderBy: string;
}
