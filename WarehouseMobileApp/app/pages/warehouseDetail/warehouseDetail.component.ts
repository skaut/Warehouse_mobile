import { Component, OnInit } from "@angular/core";
import { logout } from "../../utils/functions"
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular";
import { ActivatedRoute } from "@angular/router";
import { Database } from "../../utils/database";
import { WarehouseItem } from "../../entities/warehouseItem/warehouseItem";
import { isAndroid, isIOS } from "tns-core-modules/platform";
declare var UIView, NSMutableArray, NSIndexPath;


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
    }

    onLoaded(): void {
        this.getItems()
    }

    private getItems() {
        this.items = this.database.selectAvailableItems(this.warehouseId);
    }

    templateSelector(item: WarehouseItem, index: number, items: any): string {
        return item.expanded ? "expanded" : "default";
    }

    onItemTap(eventData): void {
        const listView = eventData.object;
        const index = eventData.index;
        const dataItem = eventData.view.bindingContext;
        dataItem.expanded = !dataItem.expanded;
        if (isIOS) {
            // Uncomment the lines below to avoid default animation
            // UIView.animateWithDurationAnimations(0, () => {
            let indexPaths = NSMutableArray.new();
            indexPaths.addObject(NSIndexPath.indexPathForRowInSection(index, eventData.groupIndex));
            listView.ios.reloadItemsAtIndexPaths(indexPaths);
            // });
        }
        if (isAndroid) {
            listView.androidListView.getAdapter().notifyItemChanged(index);
        }
        console.log(index);
        console.log(dataItem.toFullString());
    }

    logout(): void {
        logout(this.routerExtensions)
    }

    back(): void {
        this.routerExtensions.backToPreviousPage()
    }
}