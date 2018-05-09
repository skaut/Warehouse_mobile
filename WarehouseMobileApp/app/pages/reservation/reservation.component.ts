import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { logout } from "../../utils/functions"
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular";
import { DatePicker } from "tns-core-modules/ui/date-picker";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { isAndroid } from "tns-core-modules/platform";
import { Item } from "../../entities/item/item";
import { ItemService } from "../../entities/item/item.service";
import { WarehouseItemAllBorrowable } from "../../soap/requests/warehouseItemAllBorrowable";
import { parseSoapResponse } from "../../soap/responseParsers/responseParsers";
import { WarehouseItemAllBorrowableResult } from "../../soap/results/warehouseItemAllBorrowableResult";
import { WarehouseService } from "../../entities/warehouse/warehouse.service";
import { WarehouseItemDetailPhoto } from "../../soap/requests/warehouseItemDetailPhoto";
import { WarehouseItemDetailPhotoResult } from "../../soap/results/warehouseItemDetailPhotoResult";
import { WarehouseItemDetail } from "../../soap/requests/warehouseItemDetail";
import { WarehouseItemDetailResult } from "../../soap/results/warehouseItemDetailResult";
import { WarehouseItemReservationInsert } from "../../soap/requests/warehouseItemReservationInsert";
import * as ImageSource from "tns-core-modules/image-source";


@Component({
    selector: "warehouseList-component",
    templateUrl: "./pages/reservation/reservation.html",
    styleUrls: ["./pages/reservation/reservation.common.css"],
    providers: [ItemService]
})

export class ReservationComponent implements OnInit {
    items: Array<Item>;
    itemsHolder: Array<Item>;
    isLoading: boolean;
    listLoaded: boolean;
    pageMessage: string;
    errorOccurred: boolean;
    popover: {
        visibility: string,
        photo: ImageSource.ImageSource,
        calendarMode: boolean;
        item: Item,
    };
    statusBar: {
        message: string;
        visibility: string;
    };
    icons: {
        caretLeft: string;
        caretDown: string;
        check: string;
        cross: string;
        photo: string;
    };
    @ViewChild('list') list: ElementRef;

    constructor(
        private page: Page,
        private routerExtensions: RouterExtensions,
        private itemService: ItemService,
        private warehouseService: WarehouseService)
    {
        this.listLoaded = false;
        this.errorOccurred = false;
        this.statusBar = {
            message: "Nastala chyba při komunikaci se službou SkautIS.",
            visibility: "collapse",
        };
        this.items = [];
        this.itemsHolder = [];
        this.icons = {
            caretLeft: String.fromCharCode(0xea44),
            caretDown: String.fromCharCode(0xea43),
            check: String.fromCharCode(0xea10),
            cross: String.fromCharCode(0xea0f),
            photo: String.fromCharCode(0xe90f),
        }
    }

    /**
     * Method sets fields to default values and performs call to get borrowable items
     * After successful call items are sorted and for each item it's photo is requested
     */
    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.items = [];
        this.itemsHolder = [];
        this.popover = {
            visibility: 'hidden',
            photo: null,
            calendarMode: null,
            item: null,
        };
        this.errorOccurred = false;
        this.pageMessage = "K zapůjčení nejsou dostupné žádné položky.";
        this.isLoading = true;
        this.listLoaded = false;
        setTimeout(() => {
            this.itemService.getBorrowableItems(new WarehouseItemAllBorrowable())
                .subscribe(
                    resp => {
                        const warehouseItemAllBorrowableResult = parseSoapResponse(resp,
                            new WarehouseItemAllBorrowableResult(), () => new Item());
                        this.items = warehouseItemAllBorrowableResult["Items"];
                        this.itemsHolder = warehouseItemAllBorrowableResult["Items"];
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
                    }
                )
        }, 800);
    }

    private showResponseStatusBar(message?: string): void {
        if (message) {
            this.statusBar.message = message;
        }
        this.statusBar.visibility = "visible";
        setTimeout(() => {
            this.statusBar.visibility = "collapse";
            this.errorOccurred = false;
            this.statusBar.message = "Nastala chyba při komunikaci se službou SkautIS.";
        }, 2500)
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
        this.popover.photo = dataItem.photo;
        this.popover.calendarMode = false;
        if  (this.popover.photo) {
            this.popover.visibility = 'visible'
        }
    }

    onReserveTap(eventData): void {
        this.popover.item = <Item>eventData.view.bindingContext;
        this.popover.calendarMode = true;
        this.popover.visibility = 'visible';
        this.itemService.getBorrowableItemDetail(new WarehouseItemDetail(this.popover.item.ID))
            .subscribe(
                resp => {
                    this.popover.item.ID_Warehouse = parseSoapResponse(resp, new WarehouseItemDetailResult())
                        ["ID_Warehouse"];
                },
                () => {
                    this.errorOccurred = true;
                }
            )
    }

    onDismissPopover(): void {
        this.popover.visibility = 'hidden';
        this.errorOccurred = false;
    }

    onPickerLoaded(eventData): void {
        let picker = <DatePicker>eventData.object;
        picker.minDate = new Date()
    }

    onReserveConfirmTap(): void {
        if (this.errorOccurred) {
            return
        }
        const fromPicker = <DatePicker>this.page.getViewById("fromPicker");
        const toPicker = <DatePicker>this.page.getViewById("toPicker");
        this.itemService.insertItemReservation(new WarehouseItemReservationInsert(
            this.popover.item, fromPicker.date.toISOString(), toPicker.date.toISOString()))
            .subscribe(
                resp => {
                    this.popover.visibility = 'hidden';
                    this.showResponseStatusBar("Předmět " + this.popover.item.DisplayName + " úspěšně zarezervován.");
                },
                () => {
                    this.errorOccurred = true;
                    this.popover.visibility = 'hidden';
                    this.showResponseStatusBar();
                }
            )
    }

    onDateChanged(): void {
        const fromPicker = <DatePicker>this.page.getViewById("fromPicker");
        const toPicker = <DatePicker>this.page.getViewById("toPicker");
        if (fromPicker.date > toPicker.date) {
            toPicker.date = fromPicker.date;
        }
    }

    onSearchClear(): void {
        this.items = this.itemsHolder;
        this.list.nativeElement.refresh();
    }

    onSearchSubmit(eventData): void {
        const searchBar = eventData.object;
        const searchTerm = searchBar.text.toLowerCase();
        this.items = this.itemsHolder;
        if (searchTerm !== "") {
            this.items = this.items.filter(item => {
                return item.DisplayName.toLowerCase().indexOf(searchTerm) !== -1;
            });
            this.list.nativeElement.refresh();
        }
    }

    back(): void {
        this.routerExtensions.backToPreviousPage();
    }

    ignore(): void {}

    logout(): void {
        logout(this.routerExtensions)
    }

    private getItemPhoto(item: Item): void {
        this.warehouseService.getWarehouseItemPhoto(new WarehouseItemDetailPhoto(item.ID))
            .subscribe(
                resp => {
                    item.PhotoContent = parseSoapResponse(resp, new WarehouseItemDetailPhotoResult())["PhotoContent"];
                    item.setImageSource();
                },
                () => {
                    this.pageMessage = "Nastala chyba při komunikaci se službou SkautIS, zkontrolujte připojení k internetu.";
                }
            )
    }
}
