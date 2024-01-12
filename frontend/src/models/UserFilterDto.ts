import { PaginationDto } from './PaginationDto';

export interface UserFilterDto extends PaginationDto {
    userName: string;
    userEmail: string;
}