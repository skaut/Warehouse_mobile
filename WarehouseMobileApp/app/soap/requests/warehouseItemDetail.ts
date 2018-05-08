import { BaseRequest } from "./baseRequest";


export class WarehouseItemDetail extends BaseRequest {
    ID: string;

    constructor(itemId: string) {
        super();
        this.ID = itemId;
    }
}
