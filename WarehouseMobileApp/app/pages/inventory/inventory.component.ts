import { Component, OnInit } from "@angular/core";
import { logout } from "../../utils/functions"
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular";
import { ActivatedRoute } from "@angular/router";
import { Database } from "../../utils/database";
import { WarehouseItem } from "../../entities/warehouseItem/warehouseItem";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import {RadListView} from "nativescript-ui-listview";


@Component({
    selector: "inventory-component",
    moduleId: module.id,
    templateUrl: "./inventory.html",
    styleUrls: ["./inventory.common.css"],
    providers: [],
})

export class InventoryComponent implements OnInit {
    items: ObservableArray<WarehouseItem>;
    warehouseId: string;
    listLoaded: boolean;
    icons: {};

    constructor(
        private page: Page,
        private routerExtensions: RouterExtensions,
        private route: ActivatedRoute,
        private database: Database)
    {
        this.listLoaded = false;
        this.route.queryParams.subscribe(params => {
            this.warehouseId = params["warehouseId"];
        });
        this.items = new ObservableArray<WarehouseItem>();
        this.icons = {
            caretLeft: String.fromCharCode(0xea44),
            caretDown: String.fromCharCode(0xea43),
            info: String.fromCharCode(0xea0c),
            photo: String.fromCharCode(0xe90f),
        }
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.listLoaded = false;
        this.database.selectAvailableItems(this.warehouseId)
            .then((items) => {
                setTimeout(() => {
                    console.log("loading items from db");
                    this.items = new ObservableArray<WarehouseItem>(items);
                    this.listLoaded = true;
                }, 900);
            });
    }

    onUninventorizedItemTap(eventData) {
        const dataItem = eventData.view.bindingContext;
        dataItem.synced = false;
    }

    onInventorizedItemTap(eventData) {
        const dataItem = eventData.view.bindingContext;
        dataItem.synced = true;
    }

    logout(): void {
        logout(this.routerExtensions)
    }

    onSubmitInventory() {

    }

    back(): void {
        this.routerExtensions.backToPreviousPage()
    }
}