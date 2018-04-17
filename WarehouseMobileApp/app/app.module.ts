import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from "./app.routing";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { HttpClientModule } from "@angular/common/http";
import { NativeScriptFormsModule, NativeScriptHttpModule } from "nativescript-angular";
import { UserRoleAllResult } from "./soap/results/userRoleAllResult";
import { UserService } from "./entities/user/user.service";
import { WarehouseService } from "./entities/warehouse/warehouse.service";
import { Database } from "./utils/database";


@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(routes),
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        HttpClientModule,
    ],
    declarations: [
        AppComponent,
        ...navigatableComponents
    ],
    bootstrap: [AppComponent],
    providers: [
        UserService,
        WarehouseService,
        UserRoleAllResult,
        Database,
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
