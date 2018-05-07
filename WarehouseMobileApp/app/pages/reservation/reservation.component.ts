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
import { WarehouseService } from "../../entities/warehouse/warehouse.service";
import {WarehouseItemDetailPhoto} from "../../soap/requests/warehouseItemDetailPhoto";
import {WarehouseItemDetailPhotoResult} from "../../soap/results/warehouseItemDetailPhotoResult";
import * as ImageSource from "tns-core-modules/image-source";


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
    pageMessage: string;
    photoInPopover: {
        visibility: string,
        photo: ImageSource.ImageSource,
    };
    icons: {};

    constructor(
        private page: Page,
        private routerExtensions: RouterExtensions,
        private itemService: ItemService,
        private warehouseService: WarehouseService)
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
        this.photoInPopover = {
            visibility: 'hidden',
            photo: null,
        };
        this.pageMessage = "K zapůjčení nejsou dostupné žádné položky.";
        this.isLoading = true;
        this.listLoaded = false;
        setTimeout(() => {
            this.itemService.getBorrowableItems(new WarehouseItemAllBorrowable())
                .subscribe(
                    resp => {
                        // console.log(resp);
                        this.items = parseSoapResponse(resp, new WarehouseItemAllBorrowableResult(),
                            () => new Item())["Items"];
                        this.items.sort((item1, item2) => {
                            return item1.DisplayName.toLowerCase()
                                .localeCompare(item2.DisplayName.toLowerCase(), undefined, {
                                numeric: true,
                                sensitivity: 'base'
                            });
                        });
                        this.items.map(item => {
                            this.getItemPhoto(item)
                        });
                        this.listLoaded = true;
                        this.isLoading = false;
                    },
                    err => {
                        this.listLoaded = true;
                        this.isLoading = false;
                        this.pageMessage = "Nastala chyba při komunikaci se službou SkautIS, zkontrolujte připojení k internetu.";
                        // console.log(err.message);
                        // console.log(err.error);
                        // console.log(err.status);
                        // console.log(err);
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

    onItemTap(eventData): void {
        const dataItem = eventData.view.bindingContext;
        dataItem.expanded = !dataItem.expanded;
    }

    onImageTap(eventData): void {
        const dataItem = eventData.view.bindingContext;
        this.photoInPopover.photo = dataItem.photo;
        if  (this.photoInPopover.photo) {
            this.photoInPopover.visibility = 'visible'
        }
    }

    onDismissPhotoTap(): void {
        this.photoInPopover.visibility = 'hidden';
    }

    back(): void {
        this.routerExtensions.backToPreviousPage();
    }

    logout(): void {
        logout(this.routerExtensions)
    }

    private getItemPhoto(item: Item): void {
        this.warehouseService.getWarehouseItemPhoto(new WarehouseItemDetailPhoto(item.ID))
            .subscribe(
                resp => {
                    const photoResult = parseSoapResponse(resp, new WarehouseItemDetailPhotoResult());
                    item.PhotoContent = photoResult["PhotoContent"];
                    item.setImageSource();
                },
                () => {
                    this.pageMessage = "Nastala chyba při komunikaci se službou SkautIS, zkontrolujte připojení k internetu.";
                }
            )
    }
}
