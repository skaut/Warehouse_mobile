import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from "./app.routing";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { HttpClientModule } from "@angular/common/http";
import { NativeScriptFormsModule } from "nativescript-angular";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(routes),
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        HttpClientModule,
    ],
    declarations: [
        AppComponent,
        ...navigatableComponents
    ],
    bootstrap: [AppComponent]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
