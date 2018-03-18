"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var user_1 = require("../../entities/user/user");
var router_1 = require("@angular/router");
var user_service_1 = require("../../entities/user/user.service");
var responseParser_1 = require("../../soap/response/responseParser");
var userDetail_1 = require("../../soap/soapEntities/userDetail");
var appSettings = require("application-settings");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(page, router, userService) {
        this.page = page;
        this.router = router;
        this.userService = userService;
        this.user = new user_1.User();
        this.user.name = "stredisko.koprivnice";
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
        }, 3000);
    };
    /*
        Performs login request followed by userDetail request using data from response to login
        Params from response which will be used later by app are saved to appSettings.
     */
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.userService.login(this.user)
            .subscribe(function (resp) {
            var response = new responseParser_1.LoginResponse();
            response.parseLoginResponse(resp);
            if (!response.error) {
                appSettings.setString("token", response.getToken());
                appSettings.setString("roleId", response.roleId);
                appSettings.setString("unitId", response.unitId);
                _this.userService.getUserDetail(new userDetail_1.UserDetail())
                    .subscribe(function (resp) {
                    console.log(resp);
                }, function (error) {
                    console.log("Fockin error: " + error.status);
                });
                _this.router.navigate(["/warehouseList"]);
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
        __metadata("design:paramtypes", [page_1.Page, router_1.Router, user_service_1.UserService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLGdDQUErQjtBQUMvQixpREFBK0M7QUFDL0MsMENBQXlDO0FBQ3pDLGlFQUErRDtBQUMvRCxxRUFBbUU7QUFDbkUsaUVBQWdFO0FBQ2hFLGtEQUFvRDtBQVVwRDtJQWlCSSx3QkFBcUIsSUFBVSxFQUFVLE1BQWMsRUFBVSxXQUF3QjtRQUFwRSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3JGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxzQkFBc0IsQ0FBQztRQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQztJQUMzQyxDQUFDO0lBWkQsaUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUc7WUFDcEIsT0FBTyxFQUFFLGtEQUFrRDtZQUMzRCxVQUFVLEVBQUUsUUFBUTtTQUN2QixDQUFBO0lBQ0wsQ0FBQztJQVFPLHFDQUFZLEdBQXBCLFVBQXFCLE9BQU87UUFBNUIsaUJBTUM7UUFMRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM3QyxVQUFVLENBQUM7WUFDUCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUNoRCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDWixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsOEJBQUssR0FBTDtRQUFBLGlCQThCQztRQTdCRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzVCLFNBQVMsQ0FDTixVQUFBLElBQUk7WUFDQSxJQUFNLFFBQVEsR0FBRyxJQUFJLDhCQUFhLEVBQUUsQ0FBQztZQUNyQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ3BELFdBQVcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDakQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNqRCxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLHVCQUFVLEVBQUUsQ0FBQztxQkFDM0MsU0FBUyxDQUNOLFVBQUEsSUFBSTtvQkFDQSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNyQixDQUFDLEVBQ0QsVUFBQSxLQUFLO29CQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNsRCxDQUFDLENBQ0osQ0FBQztnQkFDTixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUM3QyxDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsS0FBSSxDQUFDLFlBQVksQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFBO1lBQzdELENBQUM7UUFDTCxDQUFDLEVBQ0Q7WUFDSSxLQUFJLENBQUMsWUFBWSxDQUFDLDhEQUE4RCxDQUFDLENBQUE7UUFDckYsQ0FBQyxDQUNKLENBQUM7SUFFVixDQUFDO0lBM0RrQjtRQUFsQixnQkFBUyxDQUFDLE1BQU0sQ0FBQztrQ0FBTyxpQkFBVTtnREFBQztJQUNiO1FBQXRCLGdCQUFTLENBQUMsVUFBVSxDQUFDO2tDQUFXLGlCQUFVO29EQUFDO0lBUG5DLGNBQWM7UUFQMUIsZ0JBQVMsQ0FBQztZQUNQLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7WUFDeEIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFNBQVMsRUFBRSxDQUFDLDhCQUE4QixDQUFDO1NBQzlDLENBQUM7eUNBbUI2QixXQUFJLEVBQWtCLGVBQU0sRUFBdUIsMEJBQVc7T0FqQmhGLGNBQWMsQ0FrRTFCO0lBQUQscUJBQUM7Q0FBQSxBQWxFRCxJQWtFQztBQWxFWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9lbnRpdGllcy91c2VyL3VzZXJcIlxyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2VudGl0aWVzL3VzZXIvdXNlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IExvZ2luUmVzcG9uc2UgfSBmcm9tIFwiLi4vLi4vc29hcC9yZXNwb25zZS9yZXNwb25zZVBhcnNlclwiO1xyXG5pbXBvcnQgeyBVc2VyRGV0YWlsIH0gZnJvbSBcIi4uLy4uL3NvYXAvc29hcEVudGl0aWVzL3VzZXJEZXRhaWxcIjtcclxuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBwcm92aWRlcnM6IFtVc2VyU2VydmljZV0sXHJcbiAgICBzZWxlY3RvcjogXCJsb2dpbi1jb21wb25lbnRcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvbG9naW4vbG9naW4uaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJwYWdlcy9sb2dpbi9sb2dpbi1jb21tb24uY3NzXCJdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgdXNlcjogVXNlcjtcclxuICAgIGZhaWxlZExvZ2luTGFiZWw6IHtcclxuICAgICAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICAgICAgdmlzaWJpbGl0eTogc3RyaW5nXHJcbiAgICB9O1xyXG4gICAgQFZpZXdDaGlsZChcIm5hbWVcIikgbmFtZTogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoXCJwYXNzd29yZFwiKSBwYXNzd29yZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZhaWxlZExvZ2luTGFiZWwgPSB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTmFzdGFsYSBjaHliYSBwxZlpIGtvbXVuaWthY2kgc2Ugc2x1xb5ib3UgU2thdXRJUy5cIixcclxuICAgICAgICAgICAgdmlzaWJpbGl0eTogXCJoaWRkZW5cIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSApIHtcclxuICAgICAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcigpO1xyXG4gICAgICAgIHRoaXMudXNlci5uYW1lID0gXCJzdHJlZGlza28ua29wcml2bmljZVwiO1xyXG4gICAgICAgIHRoaXMudXNlci5wYXNzd29yZCA9IFwia29wcml2bmljZS5XZWI1XCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93RXJyb3JCYXIobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMuZmFpbGVkTG9naW5MYWJlbC5tZXNzYWdlID0gbWVzc2FnZTtcclxuICAgICAgICB0aGlzLmZhaWxlZExvZ2luTGFiZWwudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZhaWxlZExvZ2luTGFiZWwudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgfSwgMzAwMClcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICAgIFBlcmZvcm1zIGxvZ2luIHJlcXVlc3QgZm9sbG93ZWQgYnkgdXNlckRldGFpbCByZXF1ZXN0IHVzaW5nIGRhdGEgZnJvbSByZXNwb25zZSB0byBsb2dpblxyXG4gICAgICAgIFBhcmFtcyBmcm9tIHJlc3BvbnNlIHdoaWNoIHdpbGwgYmUgdXNlZCBsYXRlciBieSBhcHAgYXJlIHNhdmVkIHRvIGFwcFNldHRpbmdzLlxyXG4gICAgICovXHJcbiAgICBsb2dpbigpIHtcclxuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmxvZ2luKHRoaXMudXNlcilcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIHJlc3AgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gbmV3IExvZ2luUmVzcG9uc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5wYXJzZUxvZ2luUmVzcG9uc2UocmVzcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJ0b2tlblwiLCByZXNwb25zZS5nZXRUb2tlbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwicm9sZUlkXCIsIHJlc3BvbnNlLnJvbGVJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzLnNldFN0cmluZyhcInVuaXRJZFwiLCByZXNwb25zZS51bml0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXJEZXRhaWwobmV3IFVzZXJEZXRhaWwoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3ApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRm9ja2luIGVycm9yOiBcIiAgKyBlcnJvci5zdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi93YXJlaG91c2VMaXN0XCJdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yQmFyKFwixaBwYXRuw6kgdcW+aXZhdGVsc2vDqSBqbcOpbm8gbmVibyBoZXNsby5cIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yQmFyKFwiUMWZaWhsw6HFoWVuw60gc2UgbmV6ZGHFmWlsby4gWmtvbnRyb2x1anRlIHDFmWlwb2plbsOtIGsgaW50ZXJuZXR1LlwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgIH1cclxufVxyXG4iXX0=