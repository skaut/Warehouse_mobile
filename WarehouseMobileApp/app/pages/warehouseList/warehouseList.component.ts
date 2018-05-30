import { Component, OnInit } from "@angular/core";
import {logout, refreshLogin} from "../../utils/functions"
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular";
import { Warehouse } from "../../entities/warehouse/warehouse";
import { WarehouseService } from "../../entities/warehouse/warehouse.service";
import { Database } from "../../utils/database";
import { USER_UNIT_ID } from "../../constants";
import { UserService } from "../../entities/user/user.service";
import * as AppSettings from "application-settings";
import * as Connectivity from "tns-core-modules/connectivity";
import * as Dialogs from "ui/dialogs";


@Component({
    selector: "warehouseList-component",
    templateUrl: "./pages/warehouseList/warehouseList.html",
    styleUrls: ["./pages/warehouseList/warehouseList.common.css", "./pages/warehouseList/warehouseList.css"],
    providers: [WarehouseService]
})

export class WarehouseListComponent implements OnInit {
    warehouses: Array<Warehouse> = [];

    constructor(
        private page: Page,
        private routerExtensions: RouterExtensions,
        private warehouseService: WarehouseService,
        private userService: UserService,
        private database: Database) {}

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.warehouses = this.database.selectAvailableWarehouses(AppSettings.getString(USER_UNIT_ID))
            .then((warehouses) => {
                this.warehouses = warehouses;
            })
    }


    back(): void {
        const connectionType = Connectivity.getConnectionType();
        if (connectionType === Connectivity.connectionType.none) {
            Dialogs.confirm({
                title: "Opustit stránku",
                message: "Bez připojení k internetu se nebudete moct vrátit zpět na seznam skladů, chcete pokračovat?",
                okButtonText: "OK",
                cancelButtonText: "Zrušit",
            }).then(result => {
                if (result) {
                    this.routerExtensions.backToPreviousPage();
                }
            })
        }
        else {
            refreshLogin(this.userService);
            this.routerExtensions.backToPreviousPage()
        }
    }

    logout(): void {
        logout(this.routerExtensions)
    }

    warehouseSelected(args): void {
        this.routerExtensions.navigate(["/inventory"],
            {queryParams: {"warehouseId": args.object.id}})
    }
}
