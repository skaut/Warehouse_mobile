import { Component, OnInit } from "@angular/core";

@Component({
    selector: "warehouseList-component",
    moduleId: module.id,
    templateUrl: "./warehouseList.html",
    styleUrls: ["./warehouseList-common.css"],
})
export class WarehouseListComponent implements OnInit {
    warehouses: Array<Object> = [];
    isLoading = true;
    listLoaded = false;

    constructor() {}

    ngOnInit() {
        this.warehouses.push({ name: "Warehouse 1" });
        this.warehouses.push({ name: "Warehouse 2" });
        this.warehouses.push({ name: "Warehouse 3" });
    }
}