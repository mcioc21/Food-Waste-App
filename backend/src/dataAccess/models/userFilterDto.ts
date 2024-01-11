import PaginationDto from "./paginationDto";

export default class UserFilterDto extends PaginationDto{
    userId!: number | null;
    userName!: string | null;
    userEmail!: string | null;
    userPassword!: string | null;

    constructor(obj : Partial<UserFilterDto>) {
        super();
        Object.assign(this, obj);
        this.setTakeandSkip(this.take, this.skip);
    }
}