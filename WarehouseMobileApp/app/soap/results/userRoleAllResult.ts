import { UserRole } from "../../entities/userRole/userRole";

export class UserRoleAllResult {
    UserRoles = Array<UserRole>();

    constructor() {
        this.UserRoles = [];
    }
}