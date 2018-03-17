"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var user_1 = require("../../entities/user/user");
var router_1 = require("@angular/router");
var user_service_1 = require("../../entities/user/user.service");
var responseParser_1 = require("../../soap/response/responseParser");
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
                _this.userService.userDetail(response.getToken())
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLGdDQUErQjtBQUMvQixpREFBK0M7QUFDL0MsMENBQXlDO0FBQ3pDLGlFQUErRDtBQUMvRCxxRUFBbUU7QUFDbkUsa0RBQW9EO0FBU3BEO0lBaUJJLHdCQUFxQixJQUFVLEVBQVUsTUFBYyxFQUFVLFdBQXdCO1FBQXBFLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDckYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLHNCQUFzQixDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLGlCQUFpQixDQUFDO0lBQzNDLENBQUM7SUFaRCxpQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRztZQUNwQixPQUFPLEVBQUUsa0RBQWtEO1lBQzNELFVBQVUsRUFBRSxRQUFRO1NBQ3ZCLENBQUE7SUFDTCxDQUFDO0lBUU8scUNBQVksR0FBcEIsVUFBcUIsT0FBTztRQUE1QixpQkFNQztRQUxHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzdDLFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQ2hELENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNaLENBQUM7SUFFRDs7O09BR0c7SUFDSCw4QkFBSyxHQUFMO1FBQUEsaUJBOEJDO1FBN0JHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDNUIsU0FBUyxDQUNOLFVBQUEsSUFBSTtZQUNBLElBQU0sUUFBUSxHQUFHLElBQUksOEJBQWEsRUFBRSxDQUFDO1lBQ3JDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDcEQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNqRCxXQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2pELEtBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztxQkFDM0MsU0FBUyxDQUNOLFVBQUEsSUFBSTtvQkFDQSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNyQixDQUFDLEVBQ0QsVUFBQSxLQUFLO29CQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNsRCxDQUFDLENBQ0osQ0FBQztnQkFDTixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUM3QyxDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsS0FBSSxDQUFDLFlBQVksQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFBO1lBQzdELENBQUM7UUFDTCxDQUFDLEVBQ0Q7WUFDSSxLQUFJLENBQUMsWUFBWSxDQUFDLDhEQUE4RCxDQUFDLENBQUE7UUFDckYsQ0FBQyxDQUNKLENBQUM7SUFFVixDQUFDO0lBM0RrQjtRQUFsQixnQkFBUyxDQUFDLE1BQU0sQ0FBQztrQ0FBTyxpQkFBVTtnREFBQztJQUNiO1FBQXRCLGdCQUFTLENBQUMsVUFBVSxDQUFDO2tDQUFXLGlCQUFVO29EQUFDO0lBUG5DLGNBQWM7UUFQMUIsZ0JBQVMsQ0FBQztZQUNQLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7WUFDeEIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFNBQVMsRUFBRSxDQUFDLDhCQUE4QixDQUFDO1NBQzlDLENBQUM7eUNBbUI2QixXQUFJLEVBQWtCLGVBQU0sRUFBdUIsMEJBQVc7T0FqQmhGLGNBQWMsQ0FrRTFCO0lBQUQscUJBQUM7Q0FBQSxBQWxFRCxJQWtFQztBQWxFWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9lbnRpdGllcy91c2VyL3VzZXJcIlxyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2VudGl0aWVzL3VzZXIvdXNlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IExvZ2luUmVzcG9uc2UgfSBmcm9tIFwiLi4vLi4vc29hcC9yZXNwb25zZS9yZXNwb25zZVBhcnNlclwiO1xyXG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgcHJvdmlkZXJzOiBbVXNlclNlcnZpY2VdLFxyXG4gICAgc2VsZWN0b3I6IFwibG9naW4tY29tcG9uZW50XCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BhZ2VzL2xvZ2luL2xvZ2luLmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvbG9naW4vbG9naW4tY29tbW9uLmNzc1wiXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHVzZXI6IFVzZXI7XHJcbiAgICBmYWlsZWRMb2dpbkxhYmVsOiB7XHJcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgICAgIHZpc2liaWxpdHk6IHN0cmluZ1xyXG4gICAgfTtcclxuICAgIEBWaWV3Q2hpbGQoXCJuYW1lXCIpIG5hbWU6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKFwicGFzc3dvcmRcIikgcGFzc3dvcmQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mYWlsZWRMb2dpbkxhYmVsID0ge1xyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIk5hc3RhbGEgY2h5YmEgcMWZaSBrb211bmlrYWNpIHNlIHNsdcW+Ym91IFNrYXV0SVMuXCIsXHJcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IFwiaGlkZGVuXCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoIHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UgKSB7XHJcbiAgICAgICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcclxuICAgICAgICB0aGlzLnVzZXIubmFtZSA9IFwic3RyZWRpc2tvLmtvcHJpdm5pY2VcIjtcclxuICAgICAgICB0aGlzLnVzZXIucGFzc3dvcmQgPSBcImtvcHJpdm5pY2UuV2ViNVwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd0Vycm9yQmFyKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLmZhaWxlZExvZ2luTGFiZWwubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgdGhpcy5mYWlsZWRMb2dpbkxhYmVsLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5mYWlsZWRMb2dpbkxhYmVsLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG4gICAgICAgIH0sIDMwMDApXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAgICBQZXJmb3JtcyBsb2dpbiByZXF1ZXN0IGZvbGxvd2VkIGJ5IHVzZXJEZXRhaWwgcmVxdWVzdCB1c2luZyBkYXRhIGZyb20gcmVzcG9uc2UgdG8gbG9naW5cclxuICAgICAgICBQYXJhbXMgZnJvbSByZXNwb25zZSB3aGljaCB3aWxsIGJlIHVzZWQgbGF0ZXIgYnkgYXBwIGFyZSBzYXZlZCB0byBhcHBTZXR0aW5ncy5cclxuICAgICAqL1xyXG4gICAgbG9naW4oKSB7XHJcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS5sb2dpbih0aGlzLnVzZXIpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICByZXNwID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IG5ldyBMb2dpblJlc3BvbnNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UucGFyc2VMb2dpblJlc3BvbnNlKHJlc3ApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwidG9rZW5cIiwgcmVzcG9uc2UuZ2V0VG9rZW4oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzLnNldFN0cmluZyhcInJvbGVJZFwiLCByZXNwb25zZS5yb2xlSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJ1bml0SWRcIiwgcmVzcG9uc2UudW5pdElkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyU2VydmljZS51c2VyRGV0YWlsKHJlc3BvbnNlLmdldFRva2VuKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3AgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZvY2tpbiBlcnJvcjogXCIgICsgZXJyb3Iuc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvd2FyZWhvdXNlTGlzdFwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dFcnJvckJhcihcIsWgcGF0bsOpIHXFvml2YXRlbHNrw6kgam3DqW5vIG5lYm8gaGVzbG8uXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dFcnJvckJhcihcIlDFmWlobMOhxaFlbsOtIHNlIG5lemRhxZlpbG8uIFprb250cm9sdWp0ZSBwxZlpcG9qZW7DrSBrIGludGVybmV0dS5cIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICB9XHJcbn1cclxuIl19