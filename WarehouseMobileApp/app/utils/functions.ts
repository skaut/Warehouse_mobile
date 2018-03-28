import { RouterExtensions } from "nativescript-angular";
import * as dialogs from "tns-core-modules/ui/dialogs";


export const lowerCaseFirstLetter = (string) => {
    return string.charAt(0).toLowerCase() + string.slice(1);
};

export const logout = (routerExtensions: RouterExtensions) => {
    dialogs.confirm({
        title: "Odhlášení",
        message: "Opravdu se chcete odhlásit?",
        okButtonText: "ANO",
        cancelButtonText: "NE",
    })
        .then(result => {
            if (result) {
                routerExtensions.navigate([""], { clearHistory: true} );
            }
        })
};