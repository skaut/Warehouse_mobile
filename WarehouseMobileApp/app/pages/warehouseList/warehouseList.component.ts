import { Component, OnInit } from "@angular/core";
import { logout } from "../../utils/functions"
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular";
import { Warehouse } from "../../entities/warehouse/warehouse";
import { WarehouseService } from "../../entities/warehouse/warehouse.service";
import { Database } from "../../utils/database";
import { USER_UNIT_ID } from "../../constants";
import * as AppSettings from "application-settings";


@Component({
    selector: "warehouseList-component",
    templateUrl: "./pages/warehouseList/warehouseList.html",
    styleUrls: ["./pages/warehouseList/warehouseList.common.css"],
    providers: [WarehouseService]
})

export class WarehouseListComponent implements OnInit {
    warehouses: Array<Warehouse> = [];

    constructor(
        private page: Page,
        private routerExtensions: RouterExtensions,
        private warehouseService: WarehouseService,
        private database: Database) {}

    ngOnInit(): void {
        this.page.actionBarHidden = true;
    }

    onLoaded() {
        this.warehouses = this.database.selectAvailableWarehouses(AppSettings.getString(USER_UNIT_ID))
            .then((warehouses) => {
                this.warehouses = warehouses;
            })
    }

    back(): void {
        this.routerExtensions.backToPreviousPage()
    }

    logout(): void {
        logout(this.routerExtensions)
    }

    warehouseSelected(args): void {
        this.routerExtensions.navigate(["/inventory"],
            {queryParams: {"warehouseId": args.object.id}})
    }
}