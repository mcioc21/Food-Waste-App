export default class PaginationDto {
    take!: number | null;
    skip!: number | null;

    setTakeandSkip(take: number | null, skip: number | null) {
        this.take = take != null ? Number(take) : null;
        this.skip = skip != null ? Number(skip) : null;
    }
}