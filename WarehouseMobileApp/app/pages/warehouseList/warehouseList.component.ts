import { Component, OnInit } from "@angular/core";
import { logout } from "../../utils/functions"
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular";

@Component({
    selector: "warehouseList-component",
    moduleId: module.id,
    templateUrl: "./warehouseList.html",
    styleUrls: ["./warehouseList.common.css"],
    providers: []
})

export class WarehouseListComponent implements OnInit {
    warehouses: Array<Object> = [];
    isLoading = true;
    listLoaded = false;

    constructor( private page: Page, private routerExtensions: RouterExtensions ) {}

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.warehouses.push({ name: "Warehouse 1" });
        this.warehouses.push({ name: "Warehouse 2" });
        this.warehouses.push({ name: "Warehouse 3" });
    }

    logout() {
        logout(this.routerExtensions)
    }

    warehouseSelected() {
        this.routerExtensions.navigate(["/warehouseDetail"])
    }
}