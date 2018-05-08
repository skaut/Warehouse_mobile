import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StockTakingAll } from "../../soap/requests/stockTakingAll";


@Injectable()
export class InventoryService {
    serviceName: string = "Material";

    constructor( private httpClient: HttpClient ) {}

    getStockTakingAll(stockTakingAll: StockTakingAll) {
        return stockTakingAll.call(stockTakingAll, this.serviceName, this.httpClient);
    }
}
