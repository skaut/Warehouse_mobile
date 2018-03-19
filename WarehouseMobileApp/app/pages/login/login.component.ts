import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Page } from "ui/page";
import { User } from "../../entities/user/user"
import { UserService } from "../../entities/user/user.service";
import { LoginResponse, SoapResponse } from "../../soap/responseParsers/responseParsers";
import { UserDetail } from "../../soap/requests/userDetail";
import { RouterExtensions } from "nativescript-angular";
import { UserDetailResult } from "../../soap/results/userDetailResult";
import * as appSettings from "application-settings";


@Component({
    providers: [UserService],
    selector: "login-component",
    templateUrl: "./pages/login/login.html",
    styleUrls: ["pages/login/login-common.css"]
})

export class LoginComponent implements OnInit {
    user: User;
    failedLoginLabel: {
        message: string,
        visibility: string
    };
    @ViewChild("name") name: ElementRef;
    @ViewChild("password") password: ElementRef;

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.failedLoginLabel = {
            message: "Nastala chyba při komunikaci se službou SkautIS.",
            visibility: "hidden"
        }
    }

    constructor( private page: Page, private userService: UserService, private routerExtensions: RouterExtensions ) {
        this.user = new User();
        this.user.name = "stredisko.koprivnice";
        this.user.password = "koprivnice.Web5";
    }

    private showErrorBar(message) {
        this.failedLoginLabel.message = message;
        this.failedLoginLabel.visibility = "visible";
        setTimeout(() => {
            this.failedLoginLabel.visibility = "hidden";
        }, 3000)
    }

    /*
        Performs login request followed by userDetail request using data from response to login
        Params from response which will be used later by app are saved to appSettings.
     */
    login() {
        this.userService.login(this.user)
            .subscribe(
                resp => {
                    const response = new LoginResponse();
                    response.parseLoginResponse(resp);
                    if (!response.error) {
                        appSettings.setString("userName", this.user.name);
                        appSettings.setString("token", response.getToken());
                        appSettings.setString("roleId", response.roleId);
                        appSettings.setString("unitId", response.unitId);
                        this.userService.getUserDetail(new UserDetail())
                            .subscribe(
                                resp => {
                                    // console.log(resp);
                                    const response = new SoapResponse();
                                    const userDetailResult: UserDetailResult = response
                                        .parseResponse(resp, new UserDetailResult());
                                    // response.parseResponse(test, new UserDetailResult());
                                    this.routerExtensions.navigate(["/warehouseList"], { clearHistory: true });
                                    },
                                () => {
                                    this.showErrorBar("Nepovedlo se načíst uživatelská data.");
                                }
                            );
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
}
