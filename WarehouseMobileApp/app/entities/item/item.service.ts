import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WarehouseItemAllBorrowable } from "../../soap/requests/warehouseItemAllBorrowable";


@Injectable()
export class ItemService {
    serviceName: string = "Material";

    constructor( private httpClient: HttpClient ) {}

    getBorrowableItems(warehouseItemAllBorrowable: WarehouseItemAllBorrowable) {
        return warehouseItemAllBorrowable.call(warehouseItemAllBorrowable,
            this.serviceName, this.httpClient);
    }
}
