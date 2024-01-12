export interface Product{
    ProductId : number, //primary key
    ProductName: string,
    ProductExpiry: Date,
    ReservedBy: string,
    UserId: number //foreign key
}