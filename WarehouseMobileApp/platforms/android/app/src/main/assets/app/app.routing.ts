import { LoginComponent } from "./pages/login/login.component";
import { WarehouseListComponent } from "./pages/warehouseList/warehouseList-component";

export const routes = [
    { path: "", component: LoginComponent },
    { path: "warehouseList", component: WarehouseListComponent }
];

export const navigatableComponents = [
    LoginComponent,
    WarehouseListComponent
];