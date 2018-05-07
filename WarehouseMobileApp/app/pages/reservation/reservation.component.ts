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
    items: Array<Item>;
    isLoading: boolean;
    listLoaded: boolean;
    icons: {};

    constructor(
        private page: Page,
        private routerExtensions: RouterExtensions,
        private itemService: ItemService)
    {
        this.listLoaded = false;
        this.items = [];
        this.icons = {
            caretLeft: String.fromCharCode(0xea44),
            caretDown: String.fromCharCode(0xea43),
            check: String.fromCharCode(0xea10),
            cross: String.fromCharCode(0xea0f),
            photo: String.fromCharCode(0xe90f),
        }
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.items = [];
        this.isLoading = true;
        this.listLoaded = false;
        setTimeout(() => {
            this.itemService.getBorrowableItems(new WarehouseItemAllBorrowable())
                .subscribe(
                    resp => {
                        // console.log(resp);
                        this.items = parseSoapResponse(resp, new WarehouseItemAllBorrowableResult(),
                            () => new Item())["Items"];
                        this.items.map(item => {
                            console.log(item.toFullString())
                        });
                        this.items.sort((item1, item2) => {
                            return item1.DisplayName.toLowerCase()
                                .localeCompare(item2.DisplayName.toLowerCase(), undefined, {
                                numeric: true,
                                sensitivity: 'base'
                            });
                        });
                        this.listLoaded = true;
                        this.isLoading = false;
                    },
                    err => {
                        this.listLoaded = true;
                        this.isLoading = false;
                        console.log(err.message);
                    }
                )
        }, 800);
    }

    onLoaded(): void {
        const searchBar = <SearchBar>this.page.getViewById("searchBar");
        if (isAndroid) {
            searchBar.android.clearFocus();
        }
    }

    back(): void {
        this.routerExtensions.backToPreviousPage();
    }

    logout(): void {
        logout(this.routerExtensions)
    }
}
