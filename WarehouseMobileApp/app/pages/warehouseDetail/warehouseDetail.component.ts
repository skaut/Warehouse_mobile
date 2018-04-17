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
        this.icons = {
            caretLeft: String.fromCharCode(0xea44),
            caretDown: String.fromCharCode(0xea43),
            info: String.fromCharCode(0xea0c),
            photo: String.fromCharCode(0xe90f),
        }
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
    }

    onLoaded(): void {
        this.items = this.database.selectAvailableItems(this.warehouseId)
            .then((items) => {
                setTimeout(() => {
                    this.items = items;
                    this.listLoaded = true;
                }, 400);
            });
    }

    onItemTap(eventData): void {
        const dataItem = eventData.view.bindingContext;
        dataItem.expanded = !dataItem.expanded;
    }

    logout(): void {
        logout(this.routerExtensions)
    }

    back(): void {
        this.routerExtensions.backToPreviousPage()
    }
}