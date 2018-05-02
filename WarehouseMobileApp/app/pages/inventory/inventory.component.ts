import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { logout } from "../../utils/functions"
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular";
import { ActivatedRoute } from "@angular/router";
import { Database } from "../../utils/database";
import { WarehouseItem } from "../../entities/warehouseItem/warehouseItem";
import { BarcodeScanner } from "nativescript-barcodescanner";
import * as Dialogs from "ui/dialogs"


@Component({
    selector: "inventory-component",
    moduleId: module.id,
    templateUrl: "./inventory.html",
    styleUrls: ["./inventory.common.css"],
    providers: [],
})

export class InventoryComponent implements OnInit {
    items: Array<WarehouseItem>;
    warehouseId: string;
    listLoaded: boolean;
    activityIndicatorBusy: boolean;
    icons: {};
    @ViewChild('listNotInventory') listNotInventory: ElementRef;
    @ViewChild('listInventory') listInventory: ElementRef;

    constructor(
        private page: Page,
        private routerExtensions: RouterExtensions,
        private route: ActivatedRoute,
        private database: Database,
        private barcodeScanner: BarcodeScanner)
    {
        this.listLoaded = false;
        this.activityIndicatorBusy = true;
        this.route.queryParams.subscribe(params => {
            this.warehouseId = params["warehouseId"];
        });
        this.items = [];
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
        this.activityIndicatorBusy = true;
        this.database.selectAvailableItems(this.warehouseId)
            .then((items) => {
                setTimeout(() => {
                    console.log("loading items from db - inventory page");
                    this.items = items;
                    this.listLoaded = true;
                    this.activityIndicatorBusy = false;
                }, 1300);
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

    onScanCodesTap() {
        this.barcodeScanner.requestCameraPermission()
            .then(() => {
                this.barcodeScanner.scan({
                    message: "Naskenujte barcode nebo QR kód, každý kód lze naskenovat jen jednou.",
                    continuousScanCallback: (result) => {
                        let partToSliceOut = "MA00000000";
                        while (result.text.indexOf(partToSliceOut) === -1) {
                            partToSliceOut = partToSliceOut.slice(0, partToSliceOut.length - 1 )
                        }
                        const itemId = result.text.slice(partToSliceOut.length, result.text.length);
                        const warehouseItem = this.items.find((item) => {
                            return item.ID === itemId;
                        });
                        warehouseItem.synced = false;
                        Dialogs.confirm({
                            title: "Výsledek skenu",
                            message: "Název: " + warehouseItem.DisplayName,
                            okButtonText: "Skenovat další",
                            cancelButtonText: "Konec",
                        }).then(result => {
                            if (!result) {
                                this.barcodeScanner.stop()
                            }
                        })
                    },
                    closeCallback: () => {
                        // freeze in UI was better before
                        this.activityIndicatorBusy = true;
                        setTimeout(() => {
                            this.listNotInventory.nativeElement.refresh();
                            this.listInventory.nativeElement.refresh();
                            this.activityIndicatorBusy = false;
                        }, 1200)
                    },
                    showTorchButton: true,
                    beepOnScan: false,
                }).then(() => {})
            })
    }

    onSubmitInventory() {
        // todo - submit inventory
    }

    back(): void {
        this.routerExtensions.backToPreviousPage()
    }
}