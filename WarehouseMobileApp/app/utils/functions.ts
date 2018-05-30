import { RouterExtensions } from "nativescript-angular";
import { Button } from "tns-core-modules/ui/button";
import { Color } from "tns-core-modules/color";
import { UserService } from "../entities/user/user.service";
import { User } from "../entities/user/user";
import { USER_NAME, USER_PASS } from "../constants";
import * as Dialogs from "tns-core-modules/ui/dialogs";
import * as AppSettings from "application-settings";


export const lowerCaseFirstLetter = (string) => {
    return string.charAt(0).toLowerCase() + string.slice(1);
};

export const logout = (routerExtensions: RouterExtensions) => {
    Dialogs.confirm({
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

export const refreshLogin = (userService: UserService) => {
    let user = new User();
    user.name = AppSettings.getString(USER_NAME);
    user.password = AppSettings.getString(USER_PASS);
    userService.login(user)
        .subscribe(
            () => {
                console.log("refreshed login");
            },
            error => {
                console.log("error refreshing login", error);
            }
        )
};
