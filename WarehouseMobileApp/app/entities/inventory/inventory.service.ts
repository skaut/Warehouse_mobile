import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StockTakingAll } from "../../soap/requests/stockTakingAll";
import { StockTakingWarehouseItemInsert } from "../../soap/requests/stockTakingWarehouseItemInsert";
import { WarehouseItemAllStockTaking } from "../../soap/requests/warehouseItemAllStockTaking";


@Injectable()
export class InventoryService {
    serviceName: string = "Material";

    constructor( private httpClient: HttpClient ) {}

    getStockTakingAll(stockTakingAll: StockTakingAll) {
        return stockTakingAll.call(stockTakingAll, this.serviceName, this.httpClient);
    }

    inventorizeItem(stockTakingWarehouseItemInsert: StockTakingWarehouseItemInsert) {
        return stockTakingWarehouseItemInsert.call(stockTakingWarehouseItemInsert,
            this.serviceName, this.httpClient);
    }

    getInventorizedItems(warehouseItemAllStockTaking: WarehouseItemAllStockTaking) {
        return warehouseItemAllStockTaking.call(warehouseItemAllStockTaking,
            this.serviceName, this.httpClient);
    }
}
