import { Component, OnInit } from "@angular/core";
import { logout } from "../../utils/functions"
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { isAndroid } from "tns-core-modules/platform";
import { Item } from "../../entities/item/item";
import { ItemService } from "../../entities/item/item.service";
import { WarehouseItemAllBorrowable } from "../../soap/requests/warehouseItemAllBorrowable";
import { parseSoapResponse } from "../../soap/responseParsers/responseParsers";
import { WarehouseItemAllBorrowableResult } from "../../soap/results/warehouseItemAllBorrowableResult";


@Component({
    selector: "warehouseList-component",
    templateUrl: "./pages/reservation/reservation.html",
    styleUrls: ["./pages/reservation/reservation.common.css"],
    providers: [ItemService]
})

export class ReservationComponent implements OnInit {
    items: Array<Item> = [];
    isLoading: boolean;

    constructor(
        private page: Page,
        private routerExtensions: RouterExtensions,
        private itemService: ItemService
    ) {}

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.getBorrowableItems();
    }

    onLoaded(): void {
        const searchBar = <SearchBar>this.page.getViewById("searchBar");
        if (isAndroid) {
            searchBar.android.clearFocus();
        }
    }

    private getBorrowableItems(): void {
        this.isLoading = true;
        this.itemService.getBorrowableItems(new WarehouseItemAllBorrowable())
            .subscribe(
                resp => {
                    console.log(resp);
                    this.items = parseSoapResponse(resp, new WarehouseItemAllBorrowableResult(),
                        () => new Item())["Items"];
                    console.log(this.items);
                    this.isLoading = false;
                },
                err => {
                    console.log(err.message);
                    this.isLoading = false;
                }
            )
    }

    back(): void {
        this.routerExtensions.backToPreviousPage();
    }

    logout(): void {
        logout(this.routerExtensions)
    }
}
