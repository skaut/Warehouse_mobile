import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Page } from "ui/page";
import { User } from "../../entities/user/user"
import { Router } from "@angular/router";
import { UserService } from "../../entities/user/user.service";
import { HttpHeaders } from "@angular/common/http";

@Component({
    providers: [UserService],
    selector: "login-component",
    templateUrl: "./pages/login/login.html",
    styleUrls: ["pages/login/login-common.css"]
})

export class LoginComponent implements OnInit {
    user: User;
    @ViewChild("name") name: ElementRef;
    @ViewChild("password") password: ElementRef;

    ngOnInit(): void {
        this.page.actionBarHidden = true;
    }

    constructor( private page: Page, private router: Router, private userService: UserService ) {
        this.user = new User()
        this.user.name = "stredisko.koprivnice"
        this.user.password = "koprivnice.Web5"
    }

    login() {
        this.userService.login(this.user)
            .subscribe(
                succ => console.log(succ),
                error => console.log("failed")
            );
        this.router.navigate(["/warehouseList"]);
    }
}