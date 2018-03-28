import { Warehouse } from "../../entities/warehouse/warehouse";


export class WarehouseAllResult {
    Warehouses = Array<Warehouse>();

    constructor() {
        this.Warehouses = [];
    }
}
