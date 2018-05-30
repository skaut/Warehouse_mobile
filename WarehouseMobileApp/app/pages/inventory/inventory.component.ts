import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {logout, refreshLogin} from "../../utils/functions"
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular";
import { ActivatedRoute } from "@angular/router";
import { Database } from "../../utils/database";
import { WarehouseItem } from "../../entities/warehouseItem/warehouseItem";
import { BarcodeScanner } from "nativescript-barcodescanner";
import { InventoryService } from "../../entities/inventory/inventory.service";
import { Inventory } from "../../entities/inventory/inventory";
import { Warehouse } from "../../entities/warehouse/warehouse";
import { trimArrayElements } from "../../utils/functions";
import { StockTakingWarehouseItemInsert } from "../../soap/requests/stockTakingWarehouseItemInsert";
import { isIOS } from "tns-core-modules/platform";
import { UserService } from "../../entities/user/user.service";
import * as Connectivity  from "tns-core-modules/connectivity";
import * as Dialogs from "ui/dialogs"
import * as ImageSource from "tns-core-modules/image-source";
import * as Camera from "nativescript-camera";


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
    errorOccurred: boolean;
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
        private inventoryService: InventoryService,
        private userService: UserService)
    {
        this.listLoaded = false;
        this.errorOccurred = false;
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
        this.errorOccurred = false;
        this.activityIndicatorBusy = true;
        this.popover = {
            visibility: 'hidden',
            photo: null,
        };
        this.database.selectAvailableItems(this.warehouseId)
            .then((items) => {
                setTimeout(() => {
                    console.log("loading items from db - inventory page");
                    this.items = items;
                    this.currentInventory = this.database.selectAvailableInventories()
                        .then(inventories => {
                            this.currentInventory = inventories[0];
                        });
                    this.database.selectSingleWarehouse(this.warehouseId)
                        .then(warehouse => {
                            this.currentWarehouse = warehouse;
                        });
                    this.listLoaded = true;
                    this.activityIndicatorBusy = false;
                }, 1300);
            });
        console.log("warehouse ID: " + this.warehouseId);
    }

    templateSelector(item: any, index: number, items: any): string {
        return item.expanded ? "expanded" : "default";
    }

    private showStatusBar(message?: string): void {
        if (message) {
            this.statusBar.message = message;
        }
        this.statusBar.visibility = "visible";
        setTimeout(() => {
            this.statusBar.visibility = "collapse";
            this.errorOccurred = false;
            this.statusBar.message = "Nastala chyba při komunikaci se službou SkautIS.";
        }, 1750)
    }

    onItemTap(eventData): void {
        const dataItem = eventData.view.bindingContext;
        dataItem.expanded = !dataItem.expanded;
        // slice is required to make lists update properly on iOS
        if (isIOS) {
            this.items = this.items.slice()
        }
    }

    onUninventorizedItemTap(eventData): void {
        if (this.currentInventory) {
            const dataItem: WarehouseItem = eventData.view.bindingContext;
            if (dataItem.lastInventoryId === this.currentInventory.ID) {
                this.errorOccurred = true;
                this.showStatusBar("Předmět už byl inventarizován.");
                return
            }
            const warehouses = trimArrayElements(this.currentInventory.Warehouses.split(","));
            if (warehouses.indexOf(this.currentWarehouse.DisplayName.trim()) !== -1) {
                dataItem.synced = false;
                dataItem.lastInventoryId = this.currentInventory.ID;
                this.database.updateItemLastInventoryId(dataItem);
                this.database.updateItemSynced(dataItem);
                dataItem.expanded = false;
                if (isIOS) {
                    this.items = this.items.slice();
                }
            }
            else {
                this.errorOccurred = true;
                this.showStatusBar("Pro tento sklad není založena žádná inventura.");
            }
        }
        else {
            this.errorOccurred = true;
            this.showStatusBar("Tato jednotka nemá založenou žádnou inventuru.");
        }
    }

    onInventorizedItemTap(eventData): void {
        const dataItem: WarehouseItem = eventData.view.bindingContext;
        if (!dataItem.synced) {
            dataItem.synced = true;
            dataItem.lastInventoryId = null;
            this.database.updateItemLastInventoryId(dataItem);
            this.database.updateItemSynced(dataItem);
            dataItem.expanded = false;
            if (isIOS) {
                this.items = this.items.slice();
            }
        }
        else {
            this.errorOccurred = true;
            this.showStatusBar("Předmět už byl inventarizován, operaci nelze zrušit.");
        }
    }

    logout(): void {
        logout(this.routerExtensions)
    }

    /**
     * Method to continuously scan barcodes. In the continueScanCallback function we try to map the scanned code to a item.
     * If successful we mark it for inventarization.
     * Method only proceeds to scanning if there is a available inventory for this warehouse/unit.
     */
    onScanCodesTap(): void {
        if (this.currentInventory) {
            const warehouses = trimArrayElements(this.currentInventory.Warehouses.split(","));
            if (warehouses.indexOf(this.currentWarehouse.DisplayName.trim()) !== -1) {
                this.barcodeScanner.requestCameraPermission()
                    .then(() => {
                        this.barcodeScanner.scan({
                            message: "Naskenujte barcode nebo QR kód, každý kód lze naskenovat jen jednou.",
                            continuousScanCallback: (result) => {
                                this.handleOneItemScanned(result);
                            },
                            closeCallback: () => {
                                this.listNotInventory.nativeElement.refresh();
                            },
                            showTorchButton: true,
                            beepOnScan: false,
                        }).then(() => {})
                    })
            }
            else {
                this.errorOccurred = true;
                this.showStatusBar("Pro tento sklad není založena žádná inventura.");
            }
        }
        else {
            this.errorOccurred = true;
            this.showStatusBar("Tato jednotka nemá založenou žádnou inventuru.");
        }
    }

    private handleOneItemScanned(result) {
        let partToSliceOut = "MA00000000";
        while (result.text.indexOf(partToSliceOut) === -1) {
            partToSliceOut = partToSliceOut.slice(0, partToSliceOut.length - 1 )
        }
        const itemId = result.text.slice(partToSliceOut.length, result.text.length);
        const warehouseItem = this.items.find((item) => {
            return item.ID === itemId;
        });
        let alertShown = false;
        if (warehouseItem) {
            if (warehouseItem.lastInventoryId === this.currentInventory.ID) {
                alertShown = true;
                Dialogs.alert({
                    title: "Výsledek skenu",
                    message: "Předmět: " + warehouseItem.DisplayName + " už byl inventarizován.",
                    okButtonText: "Pokračovat",
                })
            }
            else {
                warehouseItem.synced = false;
                warehouseItem.lastInventoryId = this.currentInventory.ID;
            }
        }
        if (!alertShown) {
            Dialogs.confirm({
                title: "Výsledek skenu",
                message: warehouseItem ? "Název: " + warehouseItem.DisplayName : "Kódu neodpovídá žádný předmět.",
                okButtonText: "Skenovat další",
                cancelButtonText: "Konec",
            }).then(result => {
                if (!result) {
                    this.barcodeScanner.stop();
                }
            })
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
        }
    }

    onTakeImageTap(eventData): void {
        const dataItem = eventData.view.bindingContext;
        if (Camera.isAvailable()) {
            Camera.requestPermissions();
            Camera.takePicture({width: 300, height: 300, keepAspectRatio: true, saveToGallery: false})
                .then(imageAsset => {
                    ImageSource.fromAsset(imageAsset).then(imageSource => {
                        dataItem.photo = imageSource;
                        dataItem.PhotoContent = imageSource.toBase64String("jpeg", 90);
                        this.database.updateItemPhoto(dataItem);
                        // this.userService.insertPhotoTempFile(new TempFileInsert("jpeg",
                        //     new Uint8Array(10)))
                        //     .subscribe((resp) => {
                        //             console.log("winwin");
                        //             console.log(resp);
                        //         },
                        //         err => {
                        //             console.log(err.error);
                        //             console.log(err.message)
                        //         })
                    })
                })
        }
    }

    /**
     * Method to submit inventory if there is internet connection and existing inventory.
     * Displays various error messages for different situations.
     */
    onSubmitInventory(): void {
        const connectionType = Connectivity.getConnectionType();
        if (connectionType !== Connectivity.connectionType.none) {
            if (this.currentInventory) {
                const warehouses = trimArrayElements(this.currentInventory.Warehouses.split(","));
                if (warehouses.indexOf(this.currentWarehouse.DisplayName.trim()) !== -1) {
                    const toInventorize: Array<WarehouseItem> = this.items.filter((item) => {
                        return item.synced === false;
                    });
                    if (toInventorize.length > 0) {
                        this.submitInventorizedItems(toInventorize);
                        this.showStatusBar("Předměty úspěšně zainventarizovány.");
                    }
                    else {
                        this.errorOccurred = true;
                        this.showStatusBar("K inventarizaci nebyly vybrány žádné nové předměty.")
                    }
                }
                else {
                    this.errorOccurred = true;
                    this.showStatusBar("Pro tento sklad není založena žádná inventura.");
                }
            }
            else {
                this.errorOccurred = true;
                this.showStatusBar("Tato jednotka nemá založenou žádnou inventuru.");
            }
        }
        else {
            this.errorOccurred = true;
            this.showStatusBar("Zkontrolujte připojení k internetu.");
        }
    }

    /**
     * Method performs soap call to inventorize items.
     *
     * @param {Array<WarehouseItem>} toInventorize - array of items to inventorize
     */
    private submitInventorizedItems(toInventorize: Array<WarehouseItem>): void {
        refreshLogin(this.userService);
        toInventorize.map(item => {
            this.inventoryService.inventorizeItem(new StockTakingWarehouseItemInsert(
                this.currentInventory.ID, item.ID))
                .subscribe(
                    resp => {
                        item.synced = true;
                        this.database.updateItemLastInventoryId(item);
                    },
                    () => {
                        console.log("ERROR INSERTING INVENTORIZED ITEM", item.toString());
                    }
                )
        })
    }

    back(): void {
        this.routerExtensions.backToPreviousPage()
    }
}
