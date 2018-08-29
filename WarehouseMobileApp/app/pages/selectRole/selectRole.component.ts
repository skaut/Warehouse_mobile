import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";
import {logout, refreshLogin} from "../../utils/functions";
import { RouterExtensions } from "nativescript-angular";
import { UserRoleAllResult } from "../../soap/results/userRoleAllResult";
import { USER_ROLE_ID } from "../../constants";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { UserRole } from "../../entities/userRole/userRole";
import { UserService } from "../../entities/user/user.service";
import { LoginUpdate } from "../../soap/requests/loginUpdate";
import { parseSoapResponse } from "../../soap/responseParsers/responseParsers";
import { LoginUpdateResult } from "../../soap/results/loginUpdateResult";
import { WarehouseService } from "../../entities/warehouse/warehouse.service";
import { WarehouseAllResult } from "../../soap/results/warehouseAllResult";
import { WarehouseAll } from "../../soap/requests/warehouseAll";
import { Warehouse } from "../../entities/warehouse/warehouse";
import { WarehouseItemAll } from "../../soap/requests/warehouseItemAll";
import { WarehouseItem } from "../../entities/warehouseItem/warehouseItem";
import { WarehouseItemAllResult } from "../../soap/results/warehouseItemAllResult";
import { Database } from "../../utils/database";
import { Button } from "tns-core-modules/ui/button";
import { disableButton, enableButton } from "../../utils/functions";
import { WarehouseItemDetailPhoto } from "../../soap/requests/warehouseItemDetailPhoto";
import { WarehouseItemDetailPhotoResult } from "../../soap/results/warehouseItemDetailPhotoResult";
import { InventoryService } from "../../entities/inventory/inventory.service";
import { StockTakingAll } from "../../soap/requests/stockTakingAll";
import { Inventory } from "../../entities/inventory/inventory";
import { StockTakingAllResult } from "../../soap/results/stockTakingAllResult";
import { WarehouseItemAllStockTakingResult } from "../../soap/results/warehouseItemAllStockTakingResult";
import { WarehouseItemAllStockTaking } from "../../soap/requests/warehouseItemAllStockTaking";
import * as AppSettings from "application-settings"


@Component({
    providers: [InventoryService],
    selector: "select-role",
    templateUrl: "./pages/selectRole/selectRole.html",
    styleUrls: ["./pages/selectRole/selectRole.common.css"],
})

export class SelectRoleComponent implements OnInit {
    selectedRoleIndex: number;
    selectedRole: UserRole;
    isLoading: boolean = false;
    currentInventory: Inventory;
    failedActionPanel: {
        message: string;
        visibility: string;
    };

    constructor(
        private page: Page,
        private routerExtensions: RouterExtensions,
        private userRoleAllResult: UserRoleAllResult,
        private userService: UserService,
        private warehouseService: WarehouseService,
        private inventoryService: InventoryService,
        private database: Database)
    {
        this.currentInventory = null;
    }

    /**
     * Event handler that is called on component initialization.
     * Sorts roles alphabetically and sets focus to current user role (roles are represented by units in picker).
     */
    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.failedActionPanel = {
            visibility: 'collapse',
            message: 'Nastala chyba při komunikaci se službou SkautIS.',
        };
        if (this.userRoleAllResult.UserRoles.length > 0) {
            this.userRoleAllResult.UserRoles = this.userRoleAllResult.UserRoles.sort((role1, role2) => {
                if (role1.Unit > role2.Unit) {
                    return 1
                }
                if (role1.Unit < role2.Unit) {
                    return -1
                }
                return 0
            });
            const currentUserRoleIndex = this.userRoleAllResult.UserRoles.indexOf(
                this.userRoleAllResult.UserRoles.find(role => {
                    return role.ID === AppSettings.getString(USER_ROLE_ID)
                }));
            this.selectedRoleIndex = currentUserRoleIndex != -1 ? currentUserRoleIndex : 0;
        }
    }

    private showErrorBar(message?: string): void {
        if (message) {
            this.failedActionPanel.message = message;
        }
        this.failedActionPanel.visibility = "visible";
        setTimeout(() => {
            this.failedActionPanel.visibility = "collapse";
            this.failedActionPanel.message = "Nastala chyba při komunikaci se službou SkautIS.";
        }, 3000)
    }

    selectedIndexChanged(args): void {
        const picker = <ListPicker>args.object;
        this.selectedRole = this.userRoleAllResult.UserRoles[picker.selectedIndex];
    }

    logout(): void {
        logout(this.routerExtensions)
    }

    reservationButtonTapped(): void {
        this.routerExtensions.navigate(["/reservation"])
    }

    /**
     * Event handler for select role button tap. Calls LoginUpdate request for selected role.
     * After receiving response calls getWarehouses() with its button as argument (to enable it later).
     *
     * @param args - event arguments for button tap
     */
    roleSelected(args): void {
        if (this.selectedRole) {
            refreshLogin(this.userService);
            let button = <Button>args.object;
            disableButton(button);
            this.isLoading = true;
            this.userService.updateUserRole(new LoginUpdate(this.selectedRole.ID))
                .subscribe(resp => {
                        const loginUpdateResult = parseSoapResponse(resp, new LoginUpdateResult());
                        loginUpdateResult.saveData();
                        this.getInventories(button);
                        setTimeout(() => {
                            this.getWarehouses(button);
                        }, 100)
                    },
                    () => {
                        this.showErrorBar();
                        this.enableButton(button);
                    }
                )
        }
        else {
            return
        }
    }

    /**
     * Method performs WarehouseAll request. If successful it saves data to db.
     * After that it calls getWarehouseItems for all relevant units (warehouseItemAll request is unit based).
     * If all was successful navigates to warehouseList page (with delay to ensure data was loaded
     *
     * @param {Button} button - select role button to enable after requests or in case of error.
     */
    private getWarehouses(button: Button): void {
        this.warehouseService.getWarehouseAll(new WarehouseAll())
            .subscribe(
                resp => {
                    const warehouses: Array<Warehouse> = parseSoapResponse(resp, new WarehouseAllResult(),
                        () => new Warehouse())["Warehouses"];
                    warehouses.map(warehouse => {
                        this.database.insertWarehouse(warehouse, this.selectedRole.ID_Unit);
                        this.getWarehouseItems(warehouse.ID_Unit, warehouse.ID, button);
                    });
                    if (warehouses.length > 0) {
                        setTimeout(() => {
                            this.enableButton(button);
                            this.routerExtensions.navigate(["/warehouseList"])
                        }, 1000);
                    }
                    else {
                        this.enableButton(button);
                        this.routerExtensions.navigate(["/warehouseList"])
                    }
                },
                () => {
                    this.showErrorBar();
                    this.enableButton(button);
                    // todo - handle errors (maybe red bar with error message?)
                }
            );
    }

    /**
     * Method performs warehouseItemAll request and if successful saves data to db.
     * After the call it gets photo for each item and finally it calls soap service to receive data about
     * already inventorized items in current warehouse.
     *
     * @param {string} unitId - current unit id
     * @param {string} warehouseId - warehouse id to get inventorized items
     * @param {Button} button - select role button to enable after requests or in case of error.
     */
    private getWarehouseItems(unitId: string, warehouseId: string, button: Button): void {
        this.warehouseService.getWarehouseItemAll(new WarehouseItemAll(unitId))
            .subscribe(
                resp => {
                    const items: Array<WarehouseItem> = parseSoapResponse(resp, new WarehouseItemAllResult(),
                        () => new WarehouseItem())["WarehouseItems"];
                    items.map(item => {
                        this.warehouseService.getWarehouseItemPhoto(new WarehouseItemDetailPhoto(item.ID))
                            .subscribe(
                                resp => {
                                    const photoResult = parseSoapResponse(resp, new WarehouseItemDetailPhotoResult());
                                    item.PhotoContent = photoResult["PhotoContent"];
                                    this.database.insertItem(item);
                                },
                                () => {
                                    this.showErrorBar();
                                    this.enableButton(button);
                                }
                            );
                    });
                    this.getAlreadyInventorizedItems(warehouseId, items, button);
                },
                () => {
                    this.showErrorBar();
                    this.enableButton(button);
                }
            )
    }

    /**
     * Method performs soap call to get list of all inventories. From these it filters only active ones.
     * Newest active inventory is then assigned as the current inventory to which items will be inventorized.
     *
     * @param {Button} button - select role button to enable after requests or in case of error.
     */
    private getInventories(button: Button): void {
        this.inventoryService.getStockTakingAll(new StockTakingAll())
            .subscribe(
                resp => {
                    const inventories = parseSoapResponse(resp, new StockTakingAllResult(),
                        () => new Inventory())["Inventorys"]
                        .filter(inventory => {
                            return inventory.ID_StockTakingState === "new";
                        });
                    this.currentInventory = inventories[inventories.length - 1];
                    this.database.insertInventory(this.currentInventory);
                },
                () => {
                    console.log("ERROR LOADING INVENTORIES");
                    this.showErrorBar();
                    this.enableButton(button)
                }
            )
    }

    /**
     * Method to get already inventorized items. It updates information in db.
     *
     * @param {string} warehouseId - warehouse id to get info about
     * @param {Array<WarehouseItem>} items - array of warehouse items to update
     * @param {Button} button - select role button to enable after requests or in case of error.
     */
    private getAlreadyInventorizedItems(warehouseId: string, items: Array<WarehouseItem>, button: Button): void {
        if (this.currentInventory.ID) {
            this.inventoryService.getInventorizedItems(new WarehouseItemAllStockTaking(this.currentInventory.ID,
                warehouseId))
                .subscribe(
                    resp => {
                        const inventorizedItems = parseSoapResponse(resp, new WarehouseItemAllStockTakingResult(),
                            () => new WarehouseItem())["WarehouseItems"];
                        inventorizedItems.map(inventorizedItem => {
                            const matchingItem = items.find(item => {
                                return item.ID === inventorizedItem.ID;
                            });
                            if (matchingItem) {
                                matchingItem.lastInventoryId = this.currentInventory.ID;
                                this.database.updateItemLastInventoryId(matchingItem);
                            }
                        })
                    },
                    error => {
                        console.log("ERROR LOADING ALREADY INVENTORIZED ITEMS");
                        this.showErrorBar();
                        this.enableButton(button)
                    }
                )
        }
    }

    private enableButton(button) {
        enableButton(button);
        this.isLoading = false;
    }
}
