import { UserRole } from "../../entities/userRole/userRole";
import { Injectable } from "@angular/core";


@Injectable()
export class UserRoleAllResult {
    UserRoles = Array<UserRole>();

    constructor() {
        this.UserRoles = [];
    }
}
