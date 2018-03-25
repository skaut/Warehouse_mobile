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
                _this.userRoleAllResult.UserRoles = [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLGdDQUErQjtBQUMvQixpREFBK0M7QUFDL0MsaUVBQStEO0FBQy9ELDhFQUFtRztBQUNuRyw2REFBNEQ7QUFDNUQsNkRBQXdEO0FBQ3hELHdFQUF1RTtBQUN2RSwrREFBOEQ7QUFDOUQsMEVBQXlFO0FBQ3pFLDZEQUE0RDtBQUU1RCw2Q0FBMkQ7QUFDM0Qsa0RBQW9EO0FBVXBEO0lBaUJJLHdCQUNZLElBQVUsRUFDVixXQUF3QixFQUN4QixnQkFBa0MsRUFDbEMsaUJBQW9DO1FBSHBDLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFFNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMscUJBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQztJQUMzQyxDQUFDO0lBakJELGlDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixHQUFHO1lBQ3BCLE9BQU8sRUFBRSxrREFBa0Q7WUFDM0QsVUFBVSxFQUFFLFFBQVE7U0FDdkIsQ0FBQTtJQUNMLENBQUM7SUFhTyxxQ0FBWSxHQUFwQixVQUFxQixPQUFPO1FBQTVCLGlCQU9DO1FBTkcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDeEMsSUFBSSxD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WUFBWSxDQUFDLHdDQUF3QyxDQUFDLENBQUE7WUFDL0QsQ0FBQztRQUNMLENBQUMsRUFDRDtZQUNJLEtBQUksQ0FBQyxZQUFZLENBQUMsd0NBQXdDLENBQUMsQ0FBQTtRQUMvRCxDQUFDLENBQ0osQ0FBQTtJQUNULENBQUM7SUF4R2tCO1FBQWxCLGdCQUFTLENBQUMsTUFBTSxDQUFDO2tDQUFPLGlCQUFVO2dEQUFDO0lBQ2I7UUFBdEIsZ0JBQVMsQ0FBQyxVQUFVLENBQUM7a0NBQVcsaUJBQVU7b0RBQUM7SUFQbkMsY0FBYztRQVAxQixnQkFBUyxDQUFDO1lBQ1AsU0FBUyxFQUFFLENBQUMsMEJBQVcsQ0FBQztZQUN4QixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7U0FDOUMsQ0FBQzt5Q0FvQm9CLFdBQUk7WUFDRywwQkFBVztZQUNOLHVDQUFnQjtZQUNmLHFDQUFpQjtPQXJCdkMsY0FBYyxDQStHMUI7SUFBRCxxQkFBQztDQUFBLEFBL0dELElBK0dDO0FBL0dZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL2VudGl0aWVzL3VzZXIvdXNlclwiXHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2VudGl0aWVzL3VzZXIvdXNlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IHBhcnNlTG9naW5SZXNwb25zZSwgcGFyc2VTb2FwUmVzcG9uc2UgfSBmcm9tIFwiLi4vLi4vc29hcC9yZXNwb25zZVBhcnNlcnMvcmVzcG9uc2VQYXJzZXJzXCI7XHJcbmltcG9ydCB7IFVzZXJEZXRhaWwgfSBmcm9tIFwiLi4vLi4vc29hcC9yZXF1ZXN0cy91c2VyRGV0YWlsXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcclxuaW1wb3J0IHsgVXNlckRldGFpbFJlc3VsdCB9IGZyb20gXCIuLi8uLi9zb2FwL3Jlc3VsdHMvdXNlckRldGFpbFJlc3VsdFwiO1xyXG5pbXBvcnQgeyBVc2VyUm9sZUFsbCB9IGZyb20gXCIuLi8uLi9zb2FwL3JlcXVlc3RzL3VzZXJSb2xlQWxsXCI7XHJcbmltcG9ydCB7IFVzZXJSb2xlQWxsUmVzdWx0IH0gZnJvbSBcIi4uLy4uL3NvYXAvcmVzdWx0cy91c2VyUm9sZUFsbFJlc3VsdFwiO1xyXG5pbXBvcnQgeyBVc2VyUm9sZSB9IGZyb20gXCIuLi8uLi9lbnRpdGllcy91c2VyUm9sZS91c2VyUm9sZVwiO1xyXG5pbXBvcnQgeyBTdGF0dXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZW51bXNcIjtcclxuaW1wb3J0IHsgQUxMT1dFRF9ST0xFUywgVVNFUl9OQU1FIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgKiBhcyBBcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHByb3ZpZGVyczogW1VzZXJTZXJ2aWNlXSxcclxuICAgIHNlbGVjdG9yOiBcImxvZ2luLWNvbXBvbmVudFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy9sb2dpbi9sb2dpbi5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcInBhZ2VzL2xvZ2luL2xvZ2luLWNvbW1vbi5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICB1c2VyOiBVc2VyO1xyXG4gICAgZmFpbGVkTG9naW5MYWJlbDoge1xyXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgICAgICB2aXNpYmlsaXR5OiBzdHJpbmdcclxuICAgIH07XHJcbiAgICBAVmlld0NoaWxkKFwibmFtZVwiKSBuYW1lOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZChcInBhc3N3b3JkXCIpIHBhc3N3b3JkOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZmFpbGVkTG9naW5MYWJlbCA9IHtcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJOYXN0YWxhIGNoeWJhIHDFmWkga29tdW5pa2FjaSBzZSBzbHXFvmJvdSBTa2F1dElTLlwiLFxyXG4gICAgICAgICAgICB2aXNpYmlsaXR5OiBcImhpZGRlblwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSxcclxuICAgICAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMgLFxyXG4gICAgICAgIHByaXZhdGUgdXNlclJvbGVBbGxSZXN1bHQ6IFVzZXJSb2xlQWxsUmVzdWx0LFxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcclxuICAgICAgICB0aGlzLnVzZXIubmFtZSA9IEFwcFNldHRpbmdzLmdldFN0cmluZyhVU0VSX05BTUUsIFwiXCIpO1xyXG4gICAgICAgIHRoaXMudXNlci5wYXNzd29yZCA9IFwia29wcml2bmljZS5XZWI1XCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93RXJyb3JCYXIobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMuZmFpbGVkTG9naW5MYWJlbC5tZXNzYWdlID0gbWVzc2FnZTtcclxuICAgICAgICB0aGlzLmZhaWxlZExvZ2luTGFiZWwudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZhaWxlZExvZ2luTGFiZWwudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgICAgIHRoaXMuZmFpbGVkTG9naW5MYWJlbC5tZXNzYWdlID0gXCJOYXN0YWxhIGNoeWJhIHDFmWkga29tdW5pa2FjaSBzZSBzbHXFvmJvdSBTa2F1dElTLlwiO1xyXG4gICAgICAgIH0sIDMwMDApXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRob2QgYXR0ZW1wdHMgdG8gbG9nIHVzZXIgaW4uIFdoZW4gbG9naW4gcmVxdWVzdCBpcyBzdWNjZXNzZnVsIGNhbGxzIFVzZXJEZXRhaWwgcmVxdWVzdC5cclxuICAgICAqIEFwcCBhY3R1YWxseSBsb2cgdXNlciBpbiBvbmx5IGlmIGFsbCBsb2dpbiwgVXNlckRldGFpbCBhbmQgVXNlclJvbGVBbGwgcmVxdWVzdCB3ZXJlIHN1Y2Nlc3NmdWwuXHJcbiAgICAgKi9cclxuICAgIGxvZ2luKCkge1xyXG4gICAgICAgIEFwcFNldHRpbmdzLnNldFN0cmluZyhVU0VSX05BTUUsIHRoaXMudXNlci5uYW1lKTtcclxuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmxvZ2luKHRoaXMudXNlcilcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIHJlc3AgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlTG9naW5SZXNwb25zZShyZXNwKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBTdGF0dXMuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFVzZXJEZXRhaWwoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93RXJyb3JCYXIoXCLFoHBhdG7DqSB1xb5pdmF0ZWxza8OpIGptw6lubyBuZWJvIGhlc2xvLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93RXJyb3JCYXIoXCJQxZlpaGzDocWhZW7DrSBzZSBuZXpkYcWZaWxvLiBaa29udHJvbHVqdGUgcMWZaXBvamVuw60gayBpbnRlcm5ldHUuXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRob2QgcGVyZm9ybXMgVXNlckRldGFpbCByZXF1ZXN0IGFuZCBzYXZlcyBwYXJzZWQgZGF0YSB0byBBcHBTZXR0aW5ncy5cclxuICAgICAqIElmIHN1Y2Nlc3NmdWwgZm9sbG93cyBieSBjYWxsaW5nIGdldFVzZXJSb2xlcygpLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFVzZXJEZXRhaWwoKSB7XHJcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS5nZXRVc2VyRGV0YWlsKG5ldyBVc2VyRGV0YWlsKCkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICByZXNwID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1c2VyRGV0YWlsUmVzdWx0ID0gcGFyc2VTb2FwUmVzcG9uc2UocmVzcCwgbmV3IFVzZXJEZXRhaWxSZXN1bHQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodXNlckRldGFpbFJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyRGV0YWlsUmVzdWx0LnNhdmVEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VyVXNlclJvbGVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dFcnJvckJhcihcIk5lcG9kYcWZaWxvIHNlIG5hxI3DrXN0IHXFvml2YXRlbHNrw6EgZGF0YS5cIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yQmFyKFwiTmVwb2RhxZlpbG8gc2UgbmHEjcOtc3QgdcW+aXZhdGVsc2vDoSBkYXRhLlwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRob2QgcGVyZm9ybXMgVXNlclJvbGVBbGwgcmVxdWVzdC4gQWZ0ZXIgcGFyc2luZyByZXNwb25zZSBsaXN0IG9mIHJvbGVzIGlzIGZpbHRlcmVkIHRvIGNvbnRhaW4gb25seSByb2xlc1xyXG4gICAgICogYWxsb3dlZCB0byBoYW5kbGUgbWF0ZXJpYWwgYWdlbmRhcy4gVGhpcyBmaWx0ZXJlZCBsaXN0IGlzIGFzc2lnbmVkIHRvIHRoZSBsaXN0IG9mIHByb3ZpZGVyIHVzZXJSb2xlQWxsUmVzdWx0XHJcbiAgICAgKiB3aGljaCB3aWxsIGJlIHVzZWQgYXMgcHJvdmlkZXIgaW4gbmV4dCBwYWdlIChzZWxlY3Qgcm9sZSkgYXMgd2VsbCBhbmQgdGhlcmVmb3JlIHJvbGUgZGF0YSB3aWxsIGJlIGFjY2Vzc2libGUuXHJcbiAgICAgKiBJZiBubyBlcnJvciBhcHBlYXJlZCBtZXRob2QgbmF2aWdhdGVzIHRvIHRoZSBuZXh0IHBhZ2UgYXMgbGFzdCBzdGVwLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdlclVzZXJSb2xlcygpIHtcclxuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXJSb2xlQWxsKG5ldyBVc2VyUm9sZUFsbCgpKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgcmVzcCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyUm9sZUFsbFJlc3VsdC5Vc2VyUm9sZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyUm9sZUFsbFJlc3VsdC5Vc2VyUm9sZXMgPSBwYXJzZVNvYXBSZXNwb25zZShyZXNwLCB0aGlzLnVzZXJSb2xlQWxsUmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4gbmV3IFVzZXJSb2xlKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXCJVc2VyUm9sZXNcIl0uZmlsdGVyKHJvbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFMTE9XRURfUk9MRVMuc29tZSh2YWx1ZSA9PiB2YWx1ZSA9PT0gcm9sZVtcIklEX1JvbGVcIl0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3dhcmVob3VzZUxpc3RcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXRjaCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yQmFyKFwiTmVwb2RhxZlpbG8gc2UgbmHEjcOtc3QgdcW+aXZhdGVsc2vDqSByb2xlLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93RXJyb3JCYXIoXCJOZXBvZGHFmWlsbyBzZSBuYcSNw61zdCB1xb5pdmF0ZWxza8OpIHJvbGUuXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgIH1cclxufVxyXG4iXX0=