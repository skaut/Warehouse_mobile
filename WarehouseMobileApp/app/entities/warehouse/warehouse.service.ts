import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WarehouseAll } from "../../soap/requests/warehouseAll";
import { WarehouseItemAll } from "../../soap/requests/warehouseItemAll";


@Injectable()
export class WarehouseService {
    serviceName: string = "Material";

    constructor( private httpClient: HttpClient ) {}

    getWarehouseAll(warehouseAll: WarehouseAll) {
        return warehouseAll.call(warehouseAll, this.serviceName, this.httpClient);
    }

    getWarehouseItemAll(warehouseItemAll: WarehouseItemAll) {
        return warehouseItemAll.call(warehouseItemAll, this.serviceName, this.httpClient);
    }
}