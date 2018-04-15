import { BaseRequest } from "./baseRequest";


export class WarehouseItemDetailPhoto extends BaseRequest {
    ID: string;
    Size: string;

    constructor(id: string) {
        super();
        this.ID = id;
        this.Size = "big";
    }
}