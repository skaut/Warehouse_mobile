import {Component, OnInit} from "@angular/core";
import { Page } from "ui/page";

@Component({
    selector: "login-component",
    templateUrl: "./pages/login/login.html"
})

export class LoginComponent implements OnInit {
    ngOnInit(): void {
        this.page.actionBarHidden = true;
    }

    constructor( private page: Page ) {}
}