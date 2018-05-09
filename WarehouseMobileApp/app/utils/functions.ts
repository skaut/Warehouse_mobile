import { RouterExtensions } from "nativescript-angular";
import { Button } from "tns-core-modules/ui/button";
import { Color } from "tns-core-modules/color";
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

export const disableButton = (button: Button) => {
    button.backgroundColor = new Color("#757575");
    button.isEnabled = false;
};

export const enableButton = (button: Button) => {
    button.isEnabled = true;
    button.backgroundColor = new Color("#255C9E");
};

export const trimArrayElements = (array: Array<string>): Array<string> => {
    array.forEach((str, index) => {
        array[index] = str.trim()
    });
    return array
};
