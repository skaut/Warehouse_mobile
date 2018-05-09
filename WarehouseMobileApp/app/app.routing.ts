import { LoginComponent } from "./pages/login/login.component";
import { SelectRoleComponent } from "./pages/selectRole/selectRole.component";
import { WarehouseListComponent } from "./pages/warehouseList/warehouseList.component";
import { InventoryComponent } from "./pages/inventory/inventory.component";
import { ReservationComponent } from "./pages/reservation/reservation.component";


export const routes = [
    { path: "", component: LoginComponent },
    { path: "selectRole", component: SelectRoleComponent },
    { path: "warehouseList", component: WarehouseListComponent },
    { path: "inventory", component: InventoryComponent },
    { path: "reservation", component: ReservationComponent },
];

export const navigatableComponents = [
    LoginComponent,
    SelectRoleComponent,
    WarehouseListComponent,
    InventoryComponent,
    ReservationComponent,
];
