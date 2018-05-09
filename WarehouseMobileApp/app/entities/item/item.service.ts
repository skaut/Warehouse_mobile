import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WarehouseItemAllBorrowable } from "../../soap/requests/warehouseItemAllBorrowable";
import { WarehouseItemDetail } from "../../soap/requests/warehouseItemDetail";
import { WarehouseItemReservationInsert } from "../../soap/requests/warehouseItemReservationInsert";


@Injectable()
export class ItemService {
    serviceName: string = "Material";

    constructor( private httpClient: HttpClient ) {}

    getBorrowableItems(warehouseItemAllBorrowable: WarehouseItemAllBorrowable) {
        return warehouseItemAllBorrowable.call(warehouseItemAllBorrowable,
            this.serviceName, this.httpClient);
    }

    getBorrowableItemDetail(warehouseItemDetail: WarehouseItemDetail) {
        return warehouseItemDetail.call(warehouseItemDetail,
            this.serviceName, this.httpClient);
    }

    insertItemReservation(warehouseItemReservationInsert: WarehouseItemReservationInsert) {
        return warehouseItemReservationInsert.call(warehouseItemReservationInsert,
            this.serviceName, this.httpClient, true);
    }
}
