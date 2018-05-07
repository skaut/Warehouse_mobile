import { BaseRequest } from "./baseRequest";


export class WarehouseItemAllBorrowable extends BaseRequest {
    IsInStock: boolean;
    IsCommercial: boolean;

    constructor() {
        super();
        this.IsInStock = false;
        this.IsCommercial = false;
    }
}
