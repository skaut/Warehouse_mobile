import { Injectable } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import * as dialogs from "tns-core-modules/ui/dialogs";


@Injectable()
export class Helper {
    constructor( private routerExtensions: RouterExtensions ) {}

    logout() {
        dialogs.confirm({
            title: "Odhlášení",
            message: "Opravdu se chcete odhlásit?",
            okButtonText: "ANO",
            cancelButtonText: "NE",
        })
            .then(result => {
                if (result) {
                    this.routerExtensions.navigate([""], { clearHistory: true });
                }
            })
    }

    navigate(page) {
        this.routerExtensions.navigate([page]);
    }
}