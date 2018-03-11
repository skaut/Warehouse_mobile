import { Component, OnInit } from "@angular/core";
import { Helper } from "../../utils/classes"
import { Page } from "ui/page";

@Component({
    selector: "warehouseDetail-component",
    moduleId: module.id,
    templateUrl: "./warehouseDetail.html",
    styleUrls: ["./warehouseDetail-common.css"],
    providers: [Helper]
})

export class WarehouseDetailComponent implements OnInit {
    items: Array<Object> = [];
    isLoading = true;
    listLoaded = false;

    constructor( private page: Page, private helper: Helper) {}

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.items.push({ name: "Item 1", id: "MC12854132" });
        this.items.push({ name: "Item 2", id: "MC12854132" });
        this.items.push({ name: "Item 3", id: "MC12854132" });
        this.items.push({ name: "Item 4", id: "MC12854132" });
        this.items.push({ name: "Item 5", id: "MC12854132" });
        this.items.push({ name: "Item 6", id: "MC12854132" });
        this.items.push({ name: "Item 7", id: "MC12854132" });
        this.items.push({ name: "Item 8", id: "MC12854132" });
    }

    logout() {
        this.helper.logout()
    }

    back() {
        this.helper.navigate("/warehouseList")
    }
}