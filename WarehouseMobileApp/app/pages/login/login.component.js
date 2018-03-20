"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var user_1 = require("../../entities/user/user");
var user_service_1 = require("../../entities/user/user.service");
var responseParsers_1 = require("../../soap/responseParsers/responseParsers");
var userDetail_1 = require("../../soap/requests/userDetail");
var nativescript_angular_1 = require("nativescript-angular");
var userDetailResult_1 = require("../../soap/results/userDetailResult");
var AppSettings = require("application-settings");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(page, userService, routerExtensions) {
        this.page = page;
        this.userService = userService;
        this.routerExtensions = routerExtensions;
        this.user = new user_1.User();
        this.user.name = AppSettings.getString("userName", "");
        this.user.password = "koprivnice.Web5";
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
        this.failedLoginLabel = {
            message: "Nastala chyba při komunikaci se službou SkautIS.",
            visibility: "hidden"
        };
    };
    LoginComponent.prototype.showErrorBar = function (message) {
        var _this = this;
        this.failedLoginLabel.message = message;
        this.failedLoginLabel.visibility = "visible";
        setTimeout(function () {
            _this.failedLoginLabel.visibility = "hidden";
            _this.failedLoginLabel.message = "Nastala chyba při komunikaci se službou SkautIS.";
        }, 3000);
    };
    /*
        Performs login request followed by userDetail request using data from response to login
        Params from response which will be used later by app are saved to AppSettings.
     */
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.userService.login(this.user)
            .subscribe(function (resp) {
            var result = responseParsers_1.parseLoginResponse(resp);
            if (result === 0 /* success */) {
                AppSettings.setString("userName", _this.user.name);
                _this.userService.getUserDetail(new userDetail_1.UserDetail())
                    .subscribe(function (resp) {
                    var userDetailResult = responseParsers_1.parseSoapResponse(resp, new userDetailResult_1.UserDetailResult());
                    // todo - save data in userDetail to db/AppSettings and handle error
                    _this.routerExtensions.navigate(["/warehouseList"], { clearHistory: true });
                }, function () {
                    _this.showErrorBar("Nepovedlo se načíst uživatelská data.");
                });
            }
            else {
                _this.showErrorBar("Špatné uživatelské jméno nebo heslo.");
            }
        }, function () {
            _this.showErrorBar("Přihlášení se nezdařilo. Zkontrolujte připojení k internetu.");
        });
    };
    __decorate([
        core_1.ViewChild("name"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "name", void 0);
    __decorate([
        core_1.ViewChild("password"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "password", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            providers: [user_service_1.UserService],
            selector: "login-component",
            templateUrl: "./pages/login/login.html",
            styleUrls: ["pages/login/login-common.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page, user_service_1.UserService, nativescript_angular_1.RouterExtensions])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLGdDQUErQjtBQUMvQixpREFBK0M7QUFDL0MsaUVBQStEO0FBQy9ELDhFQUFtRztBQUNuRyw2REFBNEQ7QUFDNUQsNkRBQXdEO0FBQ3hELHdFQUF1RTtBQUV2RSxrREFBb0Q7QUFVcEQ7SUFpQkksd0JBQXFCLElBQVUsRUFBVSxXQUF3QixFQUFVLGdCQUFrQztRQUF4RixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ3pHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQztJQUMzQyxDQUFDO0lBWkQsaUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUc7WUFDcEIsT0FBTyxFQUFFLGtEQUFrRDtZQUMzRCxVQUFVLEVBQUUsUUFBUTtTQUN2QixDQUFBO0lBQ0wsQ0FBQztJQVFPLHFDQUFZLEdBQXBCLFVBQXFCLE9BQU87UUFBNUIsaUJBT0M7UUFORyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM3QyxVQUFVLENBQUM7WUFDUCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztZQUM1QyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLGtEQUFrRCxDQUFDO1FBQ3ZGLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNaLENBQUM7SUFFRDs7O09BR0c7SUFDSCw4QkFBSyxHQUFMO1FBQUEsaUJBNEJDO1FBM0JHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDNUIsU0FBUyxDQUNOLFVBQUEsSUFBSTtZQUNBLElBQU0sTUFBTSxHQUFHLG9DQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sb0JBQW1CLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixXQUFXLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsRCxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLHVCQUFVLEVBQUUsQ0FBQztxQkFDM0MsU0FBUyxDQUNOLFVBQUEsSUFBSTtvQkFDQSxJQUFNLGdCQUFnQixHQUFHLG1DQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLG1DQUFnQixFQUFFLENBQUMsQ0FBQztvQkFDekUsb0VBQW9FO29CQUNwRSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDLEVBQ0w7b0JBQ0ksS0FBSSxDQUFDLFlBQVksQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO2dCQUMvRCxDQUFDLENBQ0osQ0FBQztZQUNWLENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDRixLQUFJLENBQUMsWUFBWSxDQUFDLHNDQUFzQyxDQUFDLENBQUE7WUFDN0QsQ0FBQztRQUNMLENBQUMsRUFDRDtZQUNJLEtBQUksQ0FBQyxZQUFZLENBQUMsOERBQThELENBQUMsQ0FBQTtRQUNyRixDQUFDLENBQ0osQ0FBQztJQUVWLENBQUM7SUExRGtCO1FBQWxCLGdCQUFTLENBQUMsTUFBTSxDQUFDO2tDQUFPLGlCQUFVO2dEQUFDO0lBQ2I7UUFBdEIsZ0JBQVMsQ0FBQyxVQUFVLENBQUM7a0NBQVcsaUJBQVU7b0RBQUM7SUFQbkMsY0FBYztRQVAxQixnQkFBUyxDQUFDO1lBQ1AsU0FBUyxFQUFFLENBQUMsMEJBQVcsQ0FBQztZQUN4QixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7U0FDOUMsQ0FBQzt5Q0FtQjZCLFdBQUksRUFBdUIsMEJBQVcsRUFBNEIsdUNBQWdCO09BakJwRyxjQUFjLENBaUUxQjtJQUFELHFCQUFDO0NBQUEsQUFqRUQsSUFpRUM7QUFqRVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vZW50aXRpZXMvdXNlci91c2VyXCJcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vZW50aXRpZXMvdXNlci91c2VyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgcGFyc2VMb2dpblJlc3BvbnNlLCBwYXJzZVNvYXBSZXNwb25zZSB9IGZyb20gXCIuLi8uLi9zb2FwL3Jlc3BvbnNlUGFyc2Vycy9yZXNwb25zZVBhcnNlcnNcIjtcclxuaW1wb3J0IHsgVXNlckRldGFpbCB9IGZyb20gXCIuLi8uLi9zb2FwL3JlcXVlc3RzL3VzZXJEZXRhaWxcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBVc2VyRGV0YWlsUmVzdWx0IH0gZnJvbSBcIi4uLy4uL3NvYXAvcmVzdWx0cy91c2VyRGV0YWlsUmVzdWx0XCI7XHJcbmltcG9ydCB7IFN0YXR1cyB9IGZyb20gXCIuLi8uLi91dGlscy9lbnVtc1wiO1xyXG5pbXBvcnQgKiBhcyBBcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHByb3ZpZGVyczogW1VzZXJTZXJ2aWNlXSxcclxuICAgIHNlbGVjdG9yOiBcImxvZ2luLWNvbXBvbmVudFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy9sb2dpbi9sb2dpbi5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcInBhZ2VzL2xvZ2luL2xvZ2luLWNvbW1vbi5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICB1c2VyOiBVc2VyO1xyXG4gICAgZmFpbGVkTG9naW5MYWJlbDoge1xyXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgICAgICB2aXNpYmlsaXR5OiBzdHJpbmdcclxuICAgIH07XHJcbiAgICBAVmlld0NoaWxkKFwibmFtZVwiKSBuYW1lOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZChcInBhc3N3b3JkXCIpIHBhc3N3b3JkOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZmFpbGVkTG9naW5MYWJlbCA9IHtcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJOYXN0YWxhIGNoeWJhIHDFmWkga29tdW5pa2FjaSBzZSBzbHXFvmJvdSBTa2F1dElTLlwiLFxyXG4gICAgICAgICAgICB2aXNpYmlsaXR5OiBcImhpZGRlblwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMgKSB7XHJcbiAgICAgICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcclxuICAgICAgICB0aGlzLnVzZXIubmFtZSA9IEFwcFNldHRpbmdzLmdldFN0cmluZyhcInVzZXJOYW1lXCIsIFwiXCIpO1xyXG4gICAgICAgIHRoaXMudXNlci5wYXNzd29yZCA9IFwia29wcml2bmljZS5XZWI1XCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93RXJyb3JCYXIobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMuZmFpbGVkTG9naW5MYWJlbC5tZXNzYWdlID0gbWVzc2FnZTtcclxuICAgICAgICB0aGlzLmZhaWxlZExvZ2luTGFiZWwudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZhaWxlZExvZ2luTGFiZWwudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgICAgIHRoaXMuZmFpbGVkTG9naW5MYWJlbC5tZXNzYWdlID0gXCJOYXN0YWxhIGNoeWJhIHDFmWkga29tdW5pa2FjaSBzZSBzbHXFvmJvdSBTa2F1dElTLlwiO1xyXG4gICAgICAgIH0sIDMwMDApXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAgICBQZXJmb3JtcyBsb2dpbiByZXF1ZXN0IGZvbGxvd2VkIGJ5IHVzZXJEZXRhaWwgcmVxdWVzdCB1c2luZyBkYXRhIGZyb20gcmVzcG9uc2UgdG8gbG9naW5cclxuICAgICAgICBQYXJhbXMgZnJvbSByZXNwb25zZSB3aGljaCB3aWxsIGJlIHVzZWQgbGF0ZXIgYnkgYXBwIGFyZSBzYXZlZCB0byBBcHBTZXR0aW5ncy5cclxuICAgICAqL1xyXG4gICAgbG9naW4oKSB7XHJcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS5sb2dpbih0aGlzLnVzZXIpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICByZXNwID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwYXJzZUxvZ2luUmVzcG9uc2UocmVzcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gU3RhdHVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwidXNlck5hbWVcIiwgdGhpcy51c2VyLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXJEZXRhaWwobmV3IFVzZXJEZXRhaWwoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJEZXRhaWxSZXN1bHQgPSBwYXJzZVNvYXBSZXNwb25zZShyZXNwLCBuZXcgVXNlckRldGFpbFJlc3VsdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG9kbyAtIHNhdmUgZGF0YSBpbiB1c2VyRGV0YWlsIHRvIGRiL0FwcFNldHRpbmdzIGFuZCBoYW5kbGUgZXJyb3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi93YXJlaG91c2VMaXN0XCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yQmFyKFwiTmVwb3ZlZGxvIHNlIG5hxI3DrXN0IHXFvml2YXRlbHNrw6EgZGF0YS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yQmFyKFwixaBwYXRuw6kgdcW+aXZhdGVsc2vDqSBqbcOpbm8gbmVibyBoZXNsby5cIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yQmFyKFwiUMWZaWhsw6HFoWVuw60gc2UgbmV6ZGHFmWlsby4gWmtvbnRyb2x1anRlIHDFmWlwb2plbsOtIGsgaW50ZXJuZXR1LlwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgIH1cclxufVxyXG4iXX0=