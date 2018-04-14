import { Component, OnInit } from "@angular/core";
import { logout } from "../../utils/functions"
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular";
import { ActivatedRoute } from "@angular/router";
import { Database } from "../../utils/database";
import { WarehouseItem } from "../../entities/warehouseItem/warehouseItem";

@Component({
    selector: "warehouseDetail-component",
    moduleId: module.id,
    templateUrl: "./warehouseDetail.html",
    styleUrls: ["./warehouseDetail.common.css"],
    providers: []
})

export class WarehouseDetailComponent implements OnInit {
    items: Array<WarehouseItem> = [];
    warehouseId: string;
    noItemsLabelVisibility: string;
    itemsVisibility: string;
    isLoading = true;

    constructor(
        private page: Page,
        private routerExtensions: RouterExtensions,
        private route: ActivatedRoute,
        private database: Database)
    {
        this.route.queryParams.subscribe(params => {
            this.warehouseId = params["warehouseId"]
        });
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.noItemsLabelVisibility = "hidden";
        this.itemsVisibility = "hidden";
    }

    onLoaded(): void {
        this.getItems()
    }

    private getItems() {
        this.isLoading = true;
        this.items = this.database.selectAvailableItems(this.warehouseId);
        if (this.items.length === 0) {
            this.noItemsLabelVisibility = "visible";
            this.itemsVisibility = "hidden";
        }
        else {
            this.noItemsLabelVisibility = "hidden";
            this.itemsVisibility = "visible";
        }
        this.isLoading = false;
    }

    logout(): void {
        logout(this.routerExtensions)
    }

    back(): void {
        this.routerExtensions.backToPreviousPage()
    }
}