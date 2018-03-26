import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";
import { logout } from "../../utils/functions";
import { RouterExtensions } from "nativescript-angular";
import { UserRoleAllResult } from "../../soap/results/userRoleAllResult";


@Component({
    providers: [],
    selector: "select-role",
    templateUrl: "./pages/selectRole/selectRole.html",
    styleUrls: ["pages/selectRole/selectRole.common.css"],
})

export class SelectRoleComponent implements OnInit {
    items: Array<string>;
    noRolesLabelVisible: string;
    unitPickerVisible: string;

    constructor(
        private page: Page,
        private routerExtensions: RouterExtensions,
        private userRoleAllResult: UserRoleAllResult,
        ) {
        this.items = [];
        this.items.push("Item 1");
        this.items.push("Item 2");
        this.items.push("Item 3");
        this.items.push("Item 4");
        this.items.push("Item 5");
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        if (this.items.length === 0) {
            this.noRolesLabelVisible = "visible";
            this.unitPickerVisible = "hidden";
        }
        else {
            this.noRolesLabelVisible = "hidden";
            this.unitPickerVisible = "visible";
        }
    }

    logout(): void {
        logout(this.routerExtensions)
    }
}
