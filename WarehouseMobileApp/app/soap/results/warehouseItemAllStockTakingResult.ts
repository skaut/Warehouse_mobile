import { WarehouseItem } from "../../entities/warehouseItem/warehouseItem";


export class WarehouseItemAllStockTakingResult {
    WarehouseItems = Array<WarehouseItem>();

    constructor() {
        this.WarehouseItems = [];
    }
}
