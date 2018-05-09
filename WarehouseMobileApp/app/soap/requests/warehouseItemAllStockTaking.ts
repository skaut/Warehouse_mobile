import { BaseRequest } from "./baseRequest";


export class WarehouseItemAllStockTaking extends BaseRequest {
    ID_StockTaking: string;
    ID_Warehouse: string;

    constructor(inventoryId: string, warehouseId: string) {
        super();
        this.ID_StockTaking = inventoryId;
        this.ID_Warehouse = warehouseId;
    }
}
