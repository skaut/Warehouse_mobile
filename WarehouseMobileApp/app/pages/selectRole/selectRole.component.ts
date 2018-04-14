import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";
import { logout } from "../../utils/functions";
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
import * as AppSettings from "application-settings"


@Component({
    providers: [],
    selector: "select-role",
    templateUrl: "./pages/selectRole/selectRole.html",
    styleUrls: ["pages/selectRole/selectRole.common.css"],
})

export class SelectRoleComponent implements OnInit {
    noRolesLabelVisibility: string;
    unitPickerVisibility: string;
    selectedRoleIndex: number;
    selectedRole: UserRole;
    isLoading: boolean = false;

    constructor(
        private page: Page,
        private routerExtensions: RouterExtensions,
        private userRoleAllResult: UserRoleAllResult,
        private userService: UserService,
        private warehouseService: WarehouseService,
        private database: Database) {}

    /**
     * Event handler that is called on component initialization. Sets correct component visible according to data.
     * Sorts roles alphabetically and sets focus to current user role (roles are represented by units in picker).
     */
    ngOnInit(): void {
        this.page.actionBarHidden = true;
        if (this.userRoleAllResult.UserRoles.length === 0) {
            this.noRolesLabelVisibility = "visible";
            this.unitPickerVisibility = "hidden";
        }
        else {
            this.noRolesLabelVisibility = "hidden";
            this.unitPickerVisibility = "visible";
        }
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

    selectedIndexChanged(args): void {
        const picker = <ListPicker>args.object;
        this.selectedRole = this.userRoleAllResult.UserRoles[picker.selectedIndex];
    }

    /**
     * Event handler for select role button tap. Calls LoginUpdate request for selected role.
     * After receiving response calls getWarehouses() with its button as argument (to enable it later).
     *
     * @param args - event arguments for button tap
     */
    roleSelected(args): void {
        if (this.selectedRole) {
            let button = <Button>args.object;
            disableButton(button);
            this.isLoading = true;
            this.userService.updateUserRole(new LoginUpdate(this.selectedRole.ID))
                .subscribe(resp => {
                        const loginUpdateResult = parseSoapResponse(resp, new LoginUpdateResult());
                        loginUpdateResult.saveData();
                        this.getWarehouses(button);
                    },
                    () => {
                        this.enableButton(button);
                        // todo - handle errors (red bar with message?)
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
     * If all was successful navigates to warehouseList page
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
                        this.database.insertWarehouse(warehouse, this.selectedRole.ID_Unit)
                    });
                    this.getWarehouseItems(this.selectedRole.ID_Unit);
                    warehouses.map(warehouse => {
                        if (warehouse.ID_Unit != this.selectedRole.ID_Unit) {
                            this.getWarehouseItems(warehouse.ID_Unit)
                        }
                    });
                    this.enableButton(button);
                    this.routerExtensions.navigate(["/warehouseList"])
                },
                () => {
                    this.enableButton(button);
                    // todo - handle errors (maybe red bar with error message?)
                }
            );
    }

    /**
     * Method performs warehouseItemAll request and if successful saves data to db.
     *
     * @param {string} unitId - id of unit to request data from.
     */
    private getWarehouseItems(unitId: string): void {
        this.warehouseService.getWarehouseItemAll(new WarehouseItemAll(unitId))
            .subscribe(
                resp => {
                    const items = parseSoapResponse(resp, new WarehouseItemAllResult(),
                        () => new WarehouseItem())["WarehouseItems"];
                    items.map(item => {
                        this.database.insertItem(item);
                    });
                },
                () => {
                    this.isLoading = false;
                    // todo - handle errors, should provide offline functionality
                }
            )
    }

    logout(): void {
        logout(this.routerExtensions)
    }

    private enableButton(button) {
        enableButton(button);
        this.isLoading = false;
    }
}
