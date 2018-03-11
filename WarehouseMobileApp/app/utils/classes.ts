import * as dialogs from "tns-core-modules/ui/dialogs";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class Helper {
    constructor( private router: Router ) {}

    logout() {
        dialogs.confirm({
            title: "Odhlášení",
            message: "Opravdu se chcete odhlásit?",
            okButtonText: "ANO",
            cancelButtonText: "NE",
        })
            .then(result => {
                if (result) {
                    this.router.navigate([""]);
                }
            })
    }

    navigate(page) {
        this.router.navigate([page]);
    }
}