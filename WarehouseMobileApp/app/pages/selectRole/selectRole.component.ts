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

    constructor(
        private page: Page,
        private routerExtensions: RouterExtensions,
        private userRoleAllResult: UserRoleAllResult,
        private userService: UserService
        ) {}

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

    roleSelected() {
        if (this.selectedRole) {
            this.userService.updateUserRole(new LoginUpdate(this.selectedRole.ID))
                .subscribe(resp => {
                        const loginUpdateResult = parseSoapResponse(resp, new LoginUpdateResult());
                        loginUpdateResult.saveData();
                        this.routerExtensions.navigate(["/warehouseList"]);
                    },
                    () => {
                        // todo - handle errors (red bar with message?)
                    }
                )
        }
        else {
            return
        }
    }

    logout(): void {
        logout(this.routerExtensions)
    }
}
