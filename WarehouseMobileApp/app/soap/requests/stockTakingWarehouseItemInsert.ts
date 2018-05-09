import { BaseRequest } from "./baseRequest";


export class StockTakingWarehouseItemInsert extends BaseRequest {
    ID_StockTaking: string;
    ID_WarehouseItem: string;

    constructor(inventoryId: string, itemId: string) {
        super()
        this.ID_StockTaking = inventoryId;
        this.ID_WarehouseItem = itemId;
    }
}
