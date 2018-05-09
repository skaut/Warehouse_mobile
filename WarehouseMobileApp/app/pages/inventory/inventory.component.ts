import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { logout } from "../../utils/functions"
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular";
import { ActivatedRoute } from "@angular/router";
import { Database } from "../../utils/database";
import { WarehouseItem } from "../../entities/warehouseItem/warehouseItem";
import { BarcodeScanner } from "nativescript-barcodescanner";
import { InventoryService } from "../../entities/inventory/inventory.service";
import { StockTakingAll } from "../../soap/requests/stockTakingAll";
import { parseSoapResponse } from "../../soap/responseParsers/responseParsers";
import { StockTakingAllResult } from "../../soap/results/stockTakingAllResult";
import { Inventory } from "../../entities/inventory/inventory";
import { Warehouse } from "../../entities/warehouse/warehouse";
import * as Dialogs from "ui/dialogs"
import * as ImageSource from "tns-core-modules/image-source";


@Component({
    selector: "inventory-component",
    moduleId: module.id,
    templateUrl: "./inventory.html",
    styleUrls: ["./inventory.common.css"],
    providers: [InventoryService],
})

export class InventoryComponent implements OnInit {
    items: Array<WarehouseItem>;
    currentInventory: Inventory;
    currentWarehouse: Warehouse;
    warehouseId: string;
    listLoaded: boolean;
    activityIndicatorBusy: boolean;
    statusBar: {
        visibility: string;
        message: string;
    };
    popover: {
        visibility: string,
        photo: ImageSource.ImageSource,
    };
    icons: {};
    @ViewChild('listNotInventory') listNotInventory: ElementRef;
    @ViewChild('listInventory') listInventory: ElementRef;

    constructor(
        private page: Page,
        private routerExtensions: RouterExtensions,
        private route: ActivatedRoute,
        private database: Database,
        private barcodeScanner: BarcodeScanner,
        private inventoryService: InventoryService)
    {
        this.listLoaded = false;
        this.activityIndicatorBusy = true;
        this.currentInventory = null;
        this.currentWarehouse = new Warehouse();
        this.route.queryParams.subscribe(params => {
            this.warehouseId = params["warehouseId"];
        });
        this.items = [];
        this.statusBar = {
            visibility: 'collapse',
            message: 'Nastala chyba při komunikaci se službou SkautIS',
        };
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
        this.listLoaded = false;
        this.activityIndicatorBusy = true;
        this.popover = {
            visibility: 'hidden',
            photo: null,
        };
        this.getInventories();
        this.database.selectSingleWarehouse(this.warehouseId)
            .then(warehouse => {
                this.currentWarehouse = warehouse;
                if (this.currentWarehouse) {
                    console.log(this.currentWarehouse.toFullString());
                }
            });
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

    private showStatusBar(message?: string): void {
        if (message) {
            this.statusBar.message = message;
        }
        this.statusBar.visibility = "visible";
        setTimeout(() => {
            this.statusBar.visibility = "collapse";
            this.statusBar.message = "Nastala chyba při komunikaci se službou SkautIS.";
        }, 2500)
    }

    onItemTap(eventData): void {
        const dataItem = eventData.view.bindingContext;
        dataItem.expanded = !dataItem.expanded;
    }

    onUninventorizedItemTap(eventData): void {
        if (this.currentInventory.Warehouses.split(",").indexOf(this.currentWarehouse.DisplayName) !== -1) {
            const dataItem = eventData.view.bindingContext;
            dataItem.synced = false;
            dataItem.expanded = false;
        }
        else {
            this.showStatusBar("Pro tento sklad není založena žádná inventura.");
        }
    }

    onInventorizedItemTap(eventData): void {
        const dataItem = eventData.view.bindingContext;
        dataItem.synced = true;
        dataItem.expanded = false;
    }

    logout(): void {
        logout(this.routerExtensions)
    }

    onScanCodesTap(): void {
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
                        this.listNotInventory.nativeElement.refresh();
                    },
                    showTorchButton: true,
                    beepOnScan: false,
                }).then(() => {})
            })
    }

    onSubmitInventory(): void {
        if (this.currentInventory.Warehouses.split(",").indexOf(this.currentWarehouse.DisplayName) !== -1) {
            // todo
        }
        else {
            this.showStatusBar("Pro tento sklad není založena žádná inventura.");
        }
    }

    onDismissPopover(): void {
        this.popover.visibility = 'hidden';
    }

    onImageTap(eventData): void {
        const dataItem = eventData.view.bindingContext;
        this.popover.photo = dataItem.photo;
        if (this.popover.photo) {
            this.popover.visibility = 'visible';
        };
    }

    /**
     * Method performs soap call to get list of all inventories. From these it filters only active ones.
     * Newest active inventory is then assigned as the current inventory to which items will be inventorized.
     */
    private getInventories(): void {
        this.inventoryService.getStockTakingAll(new StockTakingAll())
            .subscribe(
                resp => {
                    const inventories = parseSoapResponse(resp, new StockTakingAllResult(),
                        () => new Inventory())["Inventorys"]
                        .filter(inventory => {
                            return inventory.ID_StockTakingState === "new";
                        });
                    this.currentInventory = inventories[inventories.length - 1];
                    console.log(this.currentInventory.Warehouses)

                },
                () => {
                    console.log("ERROR LOADING INVENTORIES");
                    this.showStatusBar();
                }
            )
    }

    back(): void {
        this.routerExtensions.backToPreviousPage()
    }
}