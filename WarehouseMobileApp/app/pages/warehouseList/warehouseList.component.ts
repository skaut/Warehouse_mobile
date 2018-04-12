import { Component, OnInit } from "@angular/core";
import { logout } from "../../utils/functions"
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular";
import { Warehouse } from "../../entities/warehouse/warehouse";
import { WarehouseService } from "../../entities/warehouse/warehouse.service";
import { WarehouseAll } from "../../soap/requests/warehouseAll";
import { parseSoapResponse } from "../../soap/responseParsers/responseParsers";
import { WarehouseAllResult } from "../../soap/results/warehouseAllResult";
import {Database} from "../../utils/database";

@Component({
    selector: "warehouseList-component",
    templateUrl: "./pages/warehouseList/warehouseList.html",
    styleUrls: ["./pages/warehouseList/warehouseList.common.css"],
    providers: [WarehouseService]
})

export class WarehouseListComponent implements OnInit {
    warehouses: Array<Warehouse> = [];
    warehousesVisibility: string;
    noWarehousesLabelVisibility: string;
    isLoading: boolean = true;

    constructor
    (
        private page: Page,
        private routerExtensions: RouterExtensions,
        private warehouseService: WarehouseService,
        private database: Database,
    ) {}

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.noWarehousesLabelVisibility = "hidden";
        this.warehousesVisibility = "hidden";
        this.getWarehouses();
    }

    private getWarehouses() {
        this.isLoading = true;
        this.warehouseService.getWarehouseAll(new WarehouseAll())
            .subscribe(
                resp => {
                    this.warehouses = parseSoapResponse(resp, new WarehouseAllResult(),
                        () => new Warehouse())["Warehouses"];
                    if (this.warehouses.length === 0) {
                        this.noWarehousesLabelVisibility = "visible";
                        this.warehousesVisibility = "hidden";
                    }
                    else {
                        this.noWarehousesLabelVisibility = "hidden";
                        this.warehousesVisibility = "visible";
                    }
                    this.isLoading = false;
                },
                () => {
                    this.noWarehousesLabelVisibility = "visible";
                    this.warehousesVisibility = "hidden";
                    this.isLoading = false;
                    // todo - handle errors (maybe red bar with error message?)
                }
            );
    }

    back() {
        this.routerExtensions.backToPreviousPage();
    }

    logout() {
        logout(this.routerExtensions)
    }

    warehouseSelected() {
        this.database.selectAll("warehouse");
        this.database.selectAll("item");
        // this.routerExtensions.navigate(["/warehouseDetail"])
    }
}