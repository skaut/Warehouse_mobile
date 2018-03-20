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
var userRoleAll_1 = require("../../soap/requests/userRoleAll");
var userRoleAllResult_1 = require("../../soap/results/userRoleAllResult");
var userRole_1 = require("../../entities/userRole/userRole");
var constants_1 = require("../../constants");
var AppSettings = require("application-settings");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(page, userService, routerExtensions, userRoleAllResult) {
        this.page = page;
        this.userService = userService;
        this.routerExtensions = routerExtensions;
        this.userRoleAllResult = userRoleAllResult;
        this.user = new user_1.User();
        this.user.name = AppSettings.getString(constants_1.USER_NAME, "");
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
    /**
     * Method attempts to log user in. When login request is successful calls UserDetail request.
     * App actually log user in only if all login, UserDetail and UserRoleAll request were successful.
     */
    LoginComponent.prototype.login = function () {
        var _this = this;
        AppSettings.setString(constants_1.USER_NAME, this.user.name);
        this.userService.login(this.user)
            .subscribe(function (resp) {
            var result = responseParsers_1.parseLoginResponse(resp);
            if (result === 0 /* success */) {
                _this.getUserDetail();
            }
            else {
                _this.showErrorBar("Špatné uživatelské jméno nebo heslo.");
            }
        }, function () {
            _this.showErrorBar("Přihlášení se nezdařilo. Zkontrolujte připojení k internetu.");
        });
    };
    /**
     * Method performs UserDetail request and saves parsed data to AppSettings.
     * If successful follows by calling getUserRoles().
     */
    LoginComponent.prototype.getUserDetail = function () {
        var _this = this;
        this.userService.getUserDetail(new userDetail_1.UserDetail())
            .subscribe(function (resp) {
            var userDetailResult = responseParsers_1.parseSoapResponse(resp, new userDetailResult_1.UserDetailResult());
            if (userDetailResult) {
                userDetailResult.saveData();
                _this.gerUserRoles();
            }
            else {
                _this.showErrorBar("Nepodařilo se načíst uživatelská data.");
            }
        }, function () {
            _this.showErrorBar("Nepodařilo se načíst uživatelská data.");
        });
    };
    /**
     * Method performs UserRoleAll request. After parsing response list of roles is filtered to contain only roles
     * allowed to handle material agendas. This filtered list is assigned to the list of provider userRoleAllResult
     * which will be used as provider in next page (select role) as well and therefore role data will be accessible.
     * If no error appeared method navigates to the next page as last step.
     */
    LoginComponent.prototype.gerUserRoles = function () {
        var _this = this;
        this.userService.getUserRoleAll(new userRoleAll_1.UserRoleAll())
            .subscribe(function (resp) {
            try {
                _this.userRoleAllResult.UserRoles = responseParsers_1.parseSoapResponse(resp, _this.userRoleAllResult, function () { return new userRole_1.UserRole(); })["UserRoles"].filter(function (role) {
                    return constants_1.ALLOWED_ROLES.some(function (value) { return value === role["ID_Role"]; });
                });
                _this.routerExtensions.navigate(["/warehouseList"], { clearHistory: true });
            }
            catch (_a) {
                _this.showErrorBar("Nepodařilo se načíst uživatelské role.");
            }
        }, function () {
            _this.showErrorBar("Nepodařilo se načíst uživatelské role.");
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
        __metadata("design:paramtypes", [page_1.Page,
            user_service_1.UserService,
            nativescript_angular_1.RouterExtensions,
            userRoleAllResult_1.UserRoleAllResult])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLGdDQUErQjtBQUMvQixpREFBK0M7QUFDL0MsaUVBQStEO0FBQy9ELDhFQUFtRztBQUNuRyw2REFBNEQ7QUFDNUQsNkRBQXdEO0FBQ3hELHdFQUF1RTtBQUN2RSwrREFBOEQ7QUFDOUQsMEVBQXlFO0FBQ3pFLDZEQUE0RDtBQUU1RCw2Q0FBMkQ7QUFDM0Qsa0RBQW9EO0FBVXBEO0lBaUJJLHdCQUNZLElBQVUsRUFDVixXQUF3QixFQUN4QixnQkFBa0MsRUFDbEMsaUJBQW9DO1FBSHBDLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFFNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMscUJBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQztJQUMzQyxDQUFDO0lBakJELGlDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixHQUFHO1lBQ3BCLE9BQU8sRUFBRSxrREFBa0Q7WUFDM0QsVUFBVSxFQUFFLFFBQVE7U0FDdkIsQ0FBQTtJQUNMLENBQUM7SUFhTyxxQ0FBWSxHQUFwQixVQUFxQixPQUFPO1FBQTVCLGlCQU9DO1FBTkcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDeEMsSUFBSSxD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QUNEO1lBQ0ksS0FBSSxDQUFDLFlBQVksQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFBO1FBQy9ELENBQUMsQ0FDSixDQUFBO0lBQ1QsQ0FBQztJQXZHa0I7UUFBbEIsZ0JBQVMsQ0FBQyxNQUFNLENBQUM7a0NBQU8saUJBQVU7Z0RBQUM7SUFDYjtRQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQztrQ0FBVyxpQkFBVTtvREFBQztJQVBuQyxjQUFjO1FBUDFCLGdCQUFTLENBQUM7WUFDUCxTQUFTLEVBQUUsQ0FBQywwQkFBVyxDQUFDO1lBQ3hCLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztTQUM5QyxDQUFDO3lDQW9Cb0IsV0FBSTtZQUNHLDBCQUFXO1lBQ04sdUNBQWdCO1lBQ2YscUNBQWlCO09BckJ2QyxjQUFjLENBOEcxQjtJQUFELHFCQUFDO0NBQUEsQUE5R0QsSUE4R0M7QUE5R1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vZW50aXRpZXMvdXNlci91c2VyXCJcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vZW50aXRpZXMvdXNlci91c2VyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgcGFyc2VMb2dpblJlc3BvbnNlLCBwYXJzZVNvYXBSZXNwb25zZSB9IGZyb20gXCIuLi8uLi9zb2FwL3Jlc3BvbnNlUGFyc2Vycy9yZXNwb25zZVBhcnNlcnNcIjtcclxuaW1wb3J0IHsgVXNlckRldGFpbCB9IGZyb20gXCIuLi8uLi9zb2FwL3JlcXVlc3RzL3VzZXJEZXRhaWxcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBVc2VyRGV0YWlsUmVzdWx0IH0gZnJvbSBcIi4uLy4uL3NvYXAvcmVzdWx0cy91c2VyRGV0YWlsUmVzdWx0XCI7XHJcbmltcG9ydCB7IFVzZXJSb2xlQWxsIH0gZnJvbSBcIi4uLy4uL3NvYXAvcmVxdWVzdHMvdXNlclJvbGVBbGxcIjtcclxuaW1wb3J0IHsgVXNlclJvbGVBbGxSZXN1bHQgfSBmcm9tIFwiLi4vLi4vc29hcC9yZXN1bHRzL3VzZXJSb2xlQWxsUmVzdWx0XCI7XHJcbmltcG9ydCB7IFVzZXJSb2xlIH0gZnJvbSBcIi4uLy4uL2VudGl0aWVzL3VzZXJSb2xlL3VzZXJSb2xlXCI7XHJcbmltcG9ydCB7IFN0YXR1cyB9IGZyb20gXCIuLi8uLi91dGlscy9lbnVtc1wiO1xyXG5pbXBvcnQgeyBBTExPV0VEX1JPTEVTLCBVU0VSX05BTUUgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XHJcbmltcG9ydCAqIGFzIEFwcFNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgcHJvdmlkZXJzOiBbVXNlclNlcnZpY2VdLFxyXG4gICAgc2VsZWN0b3I6IFwibG9naW4tY29tcG9uZW50XCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BhZ2VzL2xvZ2luL2xvZ2luLmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvbG9naW4vbG9naW4tY29tbW9uLmNzc1wiXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHVzZXI6IFVzZXI7XHJcbiAgICBmYWlsZWRMb2dpbkxhYmVsOiB7XHJcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgICAgIHZpc2liaWxpdHk6IHN0cmluZ1xyXG4gICAgfTtcclxuICAgIEBWaWV3Q2hpbGQoXCJuYW1lXCIpIG5hbWU6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKFwicGFzc3dvcmRcIikgcGFzc3dvcmQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mYWlsZWRMb2dpbkxhYmVsID0ge1xyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIk5hc3RhbGEgY2h5YmEgcMWZaSBrb211bmlrYWNpIHNlIHNsdcW+Ym91IFNrYXV0SVMuXCIsXHJcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IFwiaGlkZGVuXCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxyXG4gICAgICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyAsXHJcbiAgICAgICAgcHJpdmF0ZSB1c2VyUm9sZUFsbFJlc3VsdDogVXNlclJvbGVBbGxSZXN1bHQsXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcigpO1xyXG4gICAgICAgIHRoaXMudXNlci5uYW1lID0gQXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFVTRVJfTkFNRSwgXCJcIik7XHJcbiAgICAgICAgdGhpcy51c2VyLnBhc3N3b3JkID0gXCJrb3ByaXZuaWNlLldlYjVcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dFcnJvckJhcihtZXNzYWdlKSB7XHJcbiAgICAgICAgdGhpcy5mYWlsZWRMb2dpbkxhYmVsLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gICAgICAgIHRoaXMuZmFpbGVkTG9naW5MYWJlbC52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZmFpbGVkTG9naW5MYWJlbC52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxuICAgICAgICAgICAgdGhpcy5mYWlsZWRMb2dpbkxhYmVsLm1lc3NhZ2UgPSBcIk5hc3RhbGEgY2h5YmEgcMWZaSBrb211bmlrYWNpIHNlIHNsdcW+Ym91IFNrYXV0SVMuXCI7XHJcbiAgICAgICAgfSwgMzAwMClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGhvZCBhdHRlbXB0cyB0byBsb2cgdXNlciBpbi4gV2hlbiBsb2dpbiByZXF1ZXN0IGlzIHN1Y2Nlc3NmdWwgY2FsbHMgVXNlckRldGFpbCByZXF1ZXN0LlxyXG4gICAgICogQXBwIGFjdHVhbGx5IGxvZyB1c2VyIGluIG9ubHkgaWYgYWxsIGxvZ2luLCBVc2VyRGV0YWlsIGFuZCBVc2VyUm9sZUFsbCByZXF1ZXN0IHdlcmUgc3VjY2Vzc2Z1bC5cclxuICAgICAqL1xyXG4gICAgbG9naW4oKSB7XHJcbiAgICAgICAgQXBwU2V0dGluZ3Muc2V0U3RyaW5nKFVTRVJfTkFNRSwgdGhpcy51c2VyLm5hbWUpO1xyXG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UubG9naW4odGhpcy51c2VyKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgcmVzcCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcGFyc2VMb2dpblJlc3BvbnNlKHJlc3ApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IFN0YXR1cy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VXNlckRldGFpbCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dFcnJvckJhcihcIsWgcGF0bsOpIHXFvml2YXRlbHNrw6kgam3DqW5vIG5lYm8gaGVzbG8uXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dFcnJvckJhcihcIlDFmWlobMOhxaFlbsOtIHNlIG5lemRhxZlpbG8uIFprb250cm9sdWp0ZSBwxZlpcG9qZW7DrSBrIGludGVybmV0dS5cIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGhvZCBwZXJmb3JtcyBVc2VyRGV0YWlsIHJlcXVlc3QgYW5kIHNhdmVzIHBhcnNlZCBkYXRhIHRvIEFwcFNldHRpbmdzLlxyXG4gICAgICogSWYgc3VjY2Vzc2Z1bCBmb2xsb3dzIGJ5IGNhbGxpbmcgZ2V0VXNlclJvbGVzKCkuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VXNlckRldGFpbCgpIHtcclxuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXJEZXRhaWwobmV3IFVzZXJEZXRhaWwoKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIHJlc3AgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJEZXRhaWxSZXN1bHQgPSBwYXJzZVNvYXBSZXNwb25zZShyZXNwLCBuZXcgVXNlckRldGFpbFJlc3VsdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih1c2VyRGV0YWlsUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJEZXRhaWxSZXN1bHQuc2F2ZURhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXJVc2VyUm9sZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yQmFyKFwiTmVwb2RhxZlpbG8gc2UgbmHEjcOtc3QgdcW+aXZhdGVsc2vDoSBkYXRhLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93RXJyb3JCYXIoXCJOZXBvZGHFmWlsbyBzZSBuYcSNw61zdCB1xb5pdmF0ZWxza8OhIGRhdGEuXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGhvZCBwZXJmb3JtcyBVc2VyUm9sZUFsbCByZXF1ZXN0LiBBZnRlciBwYXJzaW5nIHJlc3BvbnNlIGxpc3Qgb2Ygcm9sZXMgaXMgZmlsdGVyZWQgdG8gY29udGFpbiBvbmx5IHJvbGVzXHJcbiAgICAgKiBhbGxvd2VkIHRvIGhhbmRsZSBtYXRlcmlhbCBhZ2VuZGFzLiBUaGlzIGZpbHRlcmVkIGxpc3QgaXMgYXNzaWduZWQgdG8gdGhlIGxpc3Qgb2YgcHJvdmlkZXIgdXNlclJvbGVBbGxSZXN1bHRcclxuICAgICAqIHdoaWNoIHdpbGwgYmUgdXNlZCBhcyBwcm92aWRlciBpbiBuZXh0IHBhZ2UgKHNlbGVjdCByb2xlKSBhcyB3ZWxsIGFuZCB0aGVyZWZvcmUgcm9sZSBkYXRhIHdpbGwgYmUgYWNjZXNzaWJsZS5cclxuICAgICAqIElmIG5vIGVycm9yIGFwcGVhcmVkIG1ldGhvZCBuYXZpZ2F0ZXMgdG8gdGhlIG5leHQgcGFnZSBhcyBsYXN0IHN0ZXAuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2VyVXNlclJvbGVzKCkge1xyXG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UuZ2V0VXNlclJvbGVBbGwobmV3IFVzZXJSb2xlQWxsKCkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICByZXNwID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJSb2xlQWxsUmVzdWx0LlVzZXJSb2xlcyA9IHBhcnNlU29hcFJlc3BvbnNlKHJlc3AsIHRoaXMudXNlclJvbGVBbGxSZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiBuZXcgVXNlclJvbGUoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcIlVzZXJSb2xlc1wiXS5maWx0ZXIocm9sZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gQUxMT1dFRF9ST0xFUy5zb21lKHZhbHVlID0+IHZhbHVlID09PSByb2xlW1wiSURfUm9sZVwiXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvd2FyZWhvdXNlTGlzdFwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93RXJyb3JCYXIoXCJOZXBvZGHFmWlsbyBzZSBuYcSNw61zdCB1xb5pdmF0ZWxza8OpIHJvbGUuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dFcnJvckJhcihcIk5lcG9kYcWZaWxvIHNlIG5hxI3DrXN0IHXFvml2YXRlbHNrw6kgcm9sZS5cIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==