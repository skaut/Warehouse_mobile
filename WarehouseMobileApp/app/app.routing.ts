import { LoginComponent } from "./pages/login/login.component";
import { WarehouseListComponent } from "./pages/warehouseList/warehouseList-component";
import { WarehouseDetailComponent } from "./pages/warehouseDetail/warehouseDetail-component";

export const routes = [
    { path: "", component: LoginComponent },
    { path: "warehouseList", component: WarehouseListComponent },
    { path: "warehouseDetail", component: WarehouseDetailComponent }
];

export const navigatableComponents = [
    LoginComponent,
    WarehouseListComponent,
    WarehouseDetailComponent
];