import { Product } from "./Product";

export interface User{
    UserId : number,
    UserName: string,
    UserEmail: string | null,
    UserPassword: string,
    UserProductList: Product[],
    // UserGroups: GroupAttributes[]
}