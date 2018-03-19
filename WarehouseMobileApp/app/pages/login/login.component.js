"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var user_1 = require("../../entities/user/user");
var user_service_1 = require("../../entities/user/user.service");
var responseParser_1 = require("../../soap/responseParsers/responseParser");
var userDetail_1 = require("../../soap/requests/userDetail");
var nativescript_angular_1 = require("nativescript-angular");
var appSettings = require("application-settings");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(page, userService, routerExtensions) {
        this.page = page;
        this.userService = userService;
        this.routerExtensions = routerExtensions;
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
                _this.routerExtensions.navigate(["/warehouseList"], { clearHistory: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLGdDQUErQjtBQUMvQixpREFBK0M7QUFDL0MsaUVBQStEO0FBQy9ELDRFQUEwRTtBQUMxRSw2REFBNEQ7QUFDNUQsNkRBQXdEO0FBQ3hELGtEQUFvRDtBQVVwRDtJQWlCSSx3QkFBcUIsSUFBVSxFQUFVLFdBQXdCLEVBQVUsZ0JBQWtDO1FBQXhGLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDekcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLHNCQUFzQixDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLGlCQUFpQixDQUFDO0lBQzNDLENBQUM7SUFaRCxpQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRztZQUNwQixPQUFPLEVBQUUsa0RBQWtEO1lBQzNELFVBQVUsRUFBRSxRQUFRO1NBQ3ZCLENBQUE7SUFDTCxDQUFDO0lBUU8scUNBQVksR0FBcEIsVUFBcUIsT0FBTztRQUE1QixpQkFNQztRQUxHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzdDLFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQ2hELENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNaLENBQUM7SUFFRDs7O09BR0c7SUFDSCw4QkFBSyxHQUFMO1FBQUEsaUJBOEJDO1FBN0JHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDNUIsU0FBUyxDQUNOLFVBQUEsSUFBSTtZQUNBLElBQU0sUUFBUSxHQUFHLElBQUksOEJBQWEsRUFBRSxDQUFDO1lBQ3JDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDcEQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNqRCxXQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2pELEtBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksdUJBQVUsRUFBRSxDQUFDO3FCQUMzQyxTQUFTLENBQ04sVUFBQSxJQUFJO29CQUNBLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ3JCLENBQUMsRUFDRCxVQUFBLEtBQUs7b0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xELENBQUMsQ0FDSixDQUFDO2dCQUNOLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDL0UsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLEtBQUksQ0FBQyxZQUFZLENBQUMsc0NBQXNDLENBQUMsQ0FBQTtZQUM3RCxDQUFDO1FBQ0wsQ0FBQyxFQUNEO1lBQ0ksS0FBSSxDQUFDLFlBQVksQ0FBQyw4REFBOEQsQ0FBQyxDQUFBO1FBQ3JGLENBQUMsQ0FDSixDQUFDO0lBRVYsQ0FBQztJQTNEa0I7UUFBbEIsZ0JBQVMsQ0FBQyxNQUFNLENBQUM7a0NBQU8saUJBQVU7Z0RBQUM7SUFDYjtRQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQztrQ0FBVyxpQkFBVTtvREFBQztJQVBuQyxjQUFjO1FBUDFCLGdCQUFTLENBQUM7WUFDUCxTQUFTLEVBQUUsQ0FBQywwQkFBVyxDQUFDO1lBQ3hCLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztTQUM5QyxDQUFDO3lDQW1CNkIsV0FBSSxFQUF1QiwwQkFBVyxFQUE0Qix1Q0FBZ0I7T0FqQnBHLGNBQWMsQ0FrRTFCO0lBQUQscUJBQUM7Q0FBQSxBQWxFRCxJQWtFQztBQWxFWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9lbnRpdGllcy91c2VyL3VzZXJcIlxyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9lbnRpdGllcy91c2VyL3VzZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBMb2dpblJlc3BvbnNlIH0gZnJvbSBcIi4uLy4uL3NvYXAvcmVzcG9uc2VQYXJzZXJzL3Jlc3BvbnNlUGFyc2VyXCI7XHJcbmltcG9ydCB7IFVzZXJEZXRhaWwgfSBmcm9tIFwiLi4vLi4vc29hcC9yZXF1ZXN0cy91c2VyRGV0YWlsXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcclxuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBwcm92aWRlcnM6IFtVc2VyU2VydmljZV0sXHJcbiAgICBzZWxlY3RvcjogXCJsb2dpbi1jb21wb25lbnRcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvbG9naW4vbG9naW4uaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJwYWdlcy9sb2dpbi9sb2dpbi1jb21tb24uY3NzXCJdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgdXNlcjogVXNlcjtcclxuICAgIGZhaWxlZExvZ2luTGFiZWw6IHtcclxuICAgICAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICAgICAgdmlzaWJpbGl0eTogc3RyaW5nXHJcbiAgICB9O1xyXG4gICAgQFZpZXdDaGlsZChcIm5hbWVcIikgbmFtZTogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoXCJwYXNzd29yZFwiKSBwYXNzd29yZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZhaWxlZExvZ2luTGFiZWwgPSB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTmFzdGFsYSBjaHliYSBwxZlpIGtvbXVuaWthY2kgc2Ugc2x1xb5ib3UgU2thdXRJUy5cIixcclxuICAgICAgICAgICAgdmlzaWJpbGl0eTogXCJoaWRkZW5cIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zICkge1xyXG4gICAgICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XHJcbiAgICAgICAgdGhpcy51c2VyLm5hbWUgPSBcInN0cmVkaXNrby5rb3ByaXZuaWNlXCI7XHJcbiAgICAgICAgdGhpcy51c2VyLnBhc3N3b3JkID0gXCJrb3ByaXZuaWNlLldlYjVcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dFcnJvckJhcihtZXNzYWdlKSB7XHJcbiAgICAgICAgdGhpcy5mYWlsZWRMb2dpbkxhYmVsLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gICAgICAgIHRoaXMuZmFpbGVkTG9naW5MYWJlbC52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZmFpbGVkTG9naW5MYWJlbC52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxuICAgICAgICB9LCAzMDAwKVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgICAgUGVyZm9ybXMgbG9naW4gcmVxdWVzdCBmb2xsb3dlZCBieSB1c2VyRGV0YWlsIHJlcXVlc3QgdXNpbmcgZGF0YSBmcm9tIHJlc3BvbnNlIHRvIGxvZ2luXHJcbiAgICAgICAgUGFyYW1zIGZyb20gcmVzcG9uc2Ugd2hpY2ggd2lsbCBiZSB1c2VkIGxhdGVyIGJ5IGFwcCBhcmUgc2F2ZWQgdG8gYXBwU2V0dGluZ3MuXHJcbiAgICAgKi9cclxuICAgIGxvZ2luKCkge1xyXG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UubG9naW4odGhpcy51c2VyKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgcmVzcCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBuZXcgTG9naW5SZXNwb25zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnBhcnNlTG9naW5SZXNwb25zZShyZXNwKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzLnNldFN0cmluZyhcInRva2VuXCIsIHJlc3BvbnNlLmdldFRva2VuKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJyb2xlSWRcIiwgcmVzcG9uc2Uucm9sZUlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwidW5pdElkXCIsIHJlc3BvbnNlLnVuaXRJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlclNlcnZpY2UuZ2V0VXNlckRldGFpbChuZXcgVXNlckRldGFpbCgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGb2NraW4gZXJyb3I6IFwiICArIGVycm9yLnN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi93YXJlaG91c2VMaXN0XCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yQmFyKFwixaBwYXRuw6kgdcW+aXZhdGVsc2vDqSBqbcOpbm8gbmVibyBoZXNsby5cIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yQmFyKFwiUMWZaWhsw6HFoWVuw60gc2UgbmV6ZGHFmWlsby4gWmtvbnRyb2x1anRlIHDFmWlwb2plbsOtIGsgaW50ZXJuZXR1LlwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgIH1cclxufVxyXG4iXX0=