import paginationDto from "./paginationDto";

export default class ProductFilterDto extends paginationDto {
    productId!: number | null;
    productName!: string | null;
    productExpiry!: Date | null;
    reservedBy!: string | null;
    userId!: number | null;

    constructor(obj: Partial<ProductFilterDto>) {
        super();
        Object.assign(this, obj);
        this.setTakeandSkip(this.take, this.skip);
    }
}