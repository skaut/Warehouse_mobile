import { WarehouseItem } from "../../entities/warehouseItem/warehouseItem";


export class WarehouseItemAllResult {
    WarehouseItems = Array<WarehouseItem>();

    constructor() {
        this.WarehouseItems = [];
    }
}
