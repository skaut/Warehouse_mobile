import { LoginComponent } from "./pages/login/login.component";
import { SelectRoleComponent } from "./pages/selectRole/selectRole.component";
import { WarehouseListComponent } from "./pages/warehouseList/warehouseList.component";
import { WarehouseDetailComponent } from "./pages/warehouseDetail/warehouseDetail.component";
import { InventoryComponent } from "./pages/inventory/inventory.component";


export const routes = [
    { path: "", component: LoginComponent },
    { path: "selectRole", component: SelectRoleComponent },
    { path: "warehouseList", component: WarehouseListComponent },
    { path: "warehouseDetail", component: WarehouseDetailComponent },
    { path: "inventory", component: InventoryComponent },
];

export const navigatableComponents = [
    LoginComponent,
    SelectRoleComponent,
    WarehouseListComponent,
    WarehouseDetailComponent,
    InventoryComponent,
];