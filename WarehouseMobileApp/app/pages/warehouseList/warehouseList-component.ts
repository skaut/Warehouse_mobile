import { Component, OnInit } from "@angular/core";
import { Helper } from "../../utils/classes"
import { Page } from "ui/page";

@Component({
    selector: "warehouseList-component",
    moduleId: module.id,
    templateUrl: "./warehouseList.html",
    styleUrls: ["./warehouseList-common.css"],
    providers: [Helper]
})

export class WarehouseListComponent implements OnInit {
    warehouses: Array<Object> = [];
    isLoading = true;
    listLoaded = false;

    constructor( private page: Page, private helper: Helper ) {}

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.warehouses.push({ name: "Warehouse 1" });
        this.warehouses.push({ name: "Warehouse 2" });
        this.warehouses.push({ name: "Warehouse 3" });
    }

    logout() {
        this.helper.logout()
    }

    warehouseSelected() {
        this.helper.navigate("/warehouseDetail")
    }
}