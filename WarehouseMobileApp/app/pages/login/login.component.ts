import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Page } from "ui/page";
import { User } from "../../entities/user/user"
import { Router } from "@angular/router";
import { UserService } from "../../entities/user/user.service";
import { LoginResponse } from "../../soap/responseParsers";
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
            message: "Přihlášení se nezdařilo. Zkontrolujte připojení k internetu.",
            visibility: "hidden"
        }
    }

    constructor( private page: Page, private router: Router, private userService: UserService ) {
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

    login() {
        this.userService.login(this.user)
            .subscribe(
                resp => {
                    const response = new LoginResponse();
                    response.parseLoginResponse(resp);
                    if (!response.error) {
                        appSettings.setString("token", response.getToken());
                        appSettings.setString("idRole", response.idRole);
                        appSettings.setString("idUnit", response.idUnit);
                        this.router.navigate(["/warehouseList"]);
                    }
                    else {
                        this.showErrorBar("Špatné uživatelské jméno nebo heslo.")
                    }
                },
                () => {
                    this.showErrorBar("Nastala chyba při komunikaci se službou SkautIS.")
                }
            );
    }
}
