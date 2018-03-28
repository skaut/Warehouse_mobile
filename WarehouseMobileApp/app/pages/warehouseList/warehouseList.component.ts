import { Component, OnInit } from "@angular/core";
import { logout } from "../../utils/functions"
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular";
import { Warehouse } from "../../entities/warehouse/warehouse";
import { WarehouseService } from "../../entities/warehouse/warehouse.service";
import { WarehouseAll } from "../../soap/requests/warehouseAll";
import { parseSoapResponse } from "../../soap/responseParsers/responseParsers";
import { WarehouseAllResult } from "../../soap/results/warehouseAllResult";

@Component({
    selector: "warehouseList-component",
    templateUrl: "./warehouseList.html",
    styleUrls: ["./warehouseList.common.css"],
    providers: [WarehouseService]
})

export class WarehouseListComponent implements OnInit {
    warehouses: Array<Warehouse> = [];
    warehousesVisibility: string;
    noWarehousesLabelVisibility: string;

    constructor
    (
        private page: Page,
        private routerExtensions: RouterExtensions,
        private warehouseService: WarehouseService
    ) {}

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.warehouseService.getWarehouseAll(new WarehouseAll())
            .subscribe(
                resp => {
                    this.warehouses = parseSoapResponse(resp, new WarehouseAllResult(),
                        () => new Warehouse())["Warehouses"];
                    // this.warehouses.map(wh => {
                    //     console.log(wh.toFullString());
                    // })
                    if (this.warehouses.length === 0) {
                        this.noWarehousesLabelVisibility = "visible";
                        this.warehousesVisibility = "hidden"
                    }
                    else {
                        this.noWarehousesLabelVisibility = "hidden";
                        this.warehousesVisibility = "visible"
                    }
                },
                () => {
                    this.noWarehousesLabelVisibility = "visible";
                    this.warehousesVisibility = "hidden"
                    // todo - handle errors (maybe red bar with error message?)
                }
            )
    }

    back() {
        this.routerExtensions.backToPreviousPage();
    }

    logout() {
        logout(this.routerExtensions)
    }

    warehouseSelected() {
        this.routerExtensions.navigate(["/warehouseDetail"])
    }
}