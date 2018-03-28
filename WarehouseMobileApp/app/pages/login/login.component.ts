import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Page } from "ui/page";
import { User } from "../../entities/user/user"
import { UserService } from "../../entities/user/user.service";
import { parseLoginResponse, parseSoapResponse } from "../../soap/responseParsers/responseParsers";
import { UserDetail } from "../../soap/requests/userDetail";
import { RouterExtensions } from "nativescript-angular";
import { UserDetailResult } from "../../soap/results/userDetailResult";
import { UserRoleAll } from "../../soap/requests/userRoleAll";
import { UserRoleAllResult } from "../../soap/results/userRoleAllResult";
import { UserRole } from "../../entities/userRole/userRole";
import { Status } from "../../utils/enums";
import { ALLOWED_ROLES, USER_NAME } from "../../constants";
import * as AppSettings from "application-settings";


@Component({
    providers: [],
    selector: "login-component",
    templateUrl: "./pages/login/login.html",
    styleUrls: ["pages/login/login.common.css"]
})

export class LoginComponent implements OnInit {
    user: User;
    failedLoginLabel: {
        message: string,
        visibility: string
    };
    @ViewChild("name") name: ElementRef;
    @ViewChild("password") password: ElementRef;

    constructor(
        private page: Page,
        private userService: UserService,
        private routerExtensions: RouterExtensions ,
        private userRoleAllResult: UserRoleAllResult,
    ) {
        this.user = new User();
        this.user.name = AppSettings.getString(USER_NAME, "");
        this.user.password = "koprivnice.Web5";
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.failedLoginLabel = {
            message: "Nastala chyba při komunikaci se službou SkautIS.",
            visibility: "hidden"
        }
    }

    private showErrorBar(message): void {
        this.failedLoginLabel.message = message;
        this.failedLoginLabel.visibility = "visible";
        setTimeout(() => {
            this.failedLoginLabel.visibility = "hidden";
            this.failedLoginLabel.message = "Nastala chyba při komunikaci se službou SkautIS.";
        }, 3000)
    }

    /**
     * Method attempts to log user in. When login request is successful calls UserDetail request.
     * App actually log user in only if all login, UserDetail and UserRoleAll request were successful.
     */
    login() {
        AppSettings.setString(USER_NAME, this.user.name);
        this.userService.login(this.user)
            .subscribe(
                resp => {
                    const result = parseLoginResponse(resp);
                    if (result === Status.success) {
                        this.getUserDetail()
                    }
                    else {
                        this.showErrorBar("Špatné uživatelské jméno nebo heslo.")
                    }
                },
                () => {
                    this.showErrorBar("Přihlášení se nezdařilo. Zkontrolujte připojení k internetu.")
                }
            );
    }

    /**
     * Method performs UserDetail request and saves parsed data to AppSettings.
     * If successful follows by calling getUserRoles().
     */
    private getUserDetail() {
        this.userService.getUserDetail(new UserDetail())
            .subscribe(
                resp => {
                    const userDetailResult = parseSoapResponse(resp, new UserDetailResult());
                    if (userDetailResult) {
                        userDetailResult.saveData();
                        this.getUserRoles();
                    }
                    else {
                        this.showErrorBar("Nepodařilo se načíst uživatelská data.")
                    }
                },
                () => {
                    this.showErrorBar("Nepodařilo se načíst uživatelská data.")
                }
            )
    }

    /**
     * Method performs UserRoleAll request. After parsing response list of roles is filtered to contain only roles
     * allowed to handle material agendas. This filtered list is assigned to the list of provider userRoleAllResult
     * which will be used as provider in next page (select role) as well and therefore role data will be accessible.
     * If no error appeared method navigates to the next page as last step.
     */
    private getUserRoles() {
        this.userService.getUserRoleAll(new UserRoleAll())
            .subscribe(
                resp => {
                    try {
                        this.userRoleAllResult.UserRoles = [];
                        this.userRoleAllResult.UserRoles = parseSoapResponse(resp, this.userRoleAllResult,
                            () => new UserRole())
                            ["UserRoles"].filter(role => {
                            return ALLOWED_ROLES.some(value => value === role["ID_Role"])
                        });
                        // this.userRoleAllResult.UserRoles.map(role => {
                        //     console.log(role.toFullString())
                        // });
                        if (this.userRoleAllResult.UserRoles.length === 1) {
                            this.routerExtensions.navigate(["/warehouseList"], {clearHistory: true})
                        }
                        else {
                            this.routerExtensions.navigate(["/selectRole"], {clearHistory: true});
                        }
                    }
                    catch {
                        this.showErrorBar("Nepodařilo se načíst uživatelské role.")
                    }
                },
                () => {
                    this.showErrorBar("Nepodařilo se načíst uživatelské role.")
                }
            )
    }
}
