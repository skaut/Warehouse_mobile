import { LoginComponent } from "./pages/login/login.component";
import { WarehouseListComponent } from "./pages/warehouseList/warehouseList.component";
import { WarehouseDetailComponent } from "./pages/warehouseDetail/warehouseDetail.component";
import {SelectRoleComponent} from "./pages/selectRole/selectRole.component";

export const routes = [
    { path: "", component: LoginComponent },
    { path: "selectRole", component: SelectRoleComponent },
    { path: "warehouseList", component: WarehouseListComponent },
    { path: "warehouseDetail", component: WarehouseDetailComponent },
];

export const navigatableComponents = [
    LoginComponent,
    SelectRoleComponent,
    WarehouseListComponent,
    WarehouseDetailComponent,
];