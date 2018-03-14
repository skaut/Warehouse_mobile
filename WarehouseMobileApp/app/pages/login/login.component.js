"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var user_1 = require("../../entities/user/user");
var router_1 = require("@angular/router");
var user_service_1 = require("../../entities/user/user.service");
var responseParsers_1 = require("../../soap/responseParsers");
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
            message: "Přihlášení se nezdařilo. Zkontrolujte připojení k internetu.",
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
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.userService.login(this.user)
            .subscribe(function (resp) {
            var response = new responseParsers_1.LoginResponse();
            response.parseLoginResponse(resp);
            if (!response.error) {
                appSettings.setString("token", response.getToken());
                appSettings.setString("idRole", response.idRole);
                appSettings.setString("idUnit", response.idUnit);
                _this.router.navigate(["/warehouseList"]);
            }
            else {
                _this.showErrorBar("Špatné uživatelské jméno nebo heslo.");
            }
        }, function () {
            _this.showErrorBar("Nastala chyba při komunikaci se službou SkautIS.");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLGdDQUErQjtBQUMvQixpREFBK0M7QUFDL0MsMENBQXlDO0FBQ3pDLGlFQUErRDtBQUMvRCw4REFBMkQ7QUFDM0Qsa0RBQW9EO0FBU3BEO0lBaUJJLHdCQUFxQixJQUFVLEVBQVUsTUFBYyxFQUFVLFdBQXdCO1FBQXBFLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDckYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLHNCQUFzQixDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLGlCQUFpQixDQUFDO0lBQzNDLENBQUM7SUFaRCxpQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRztZQUNwQixPQUFPLEVBQUUsOERBQThEO1lBQ3ZFLFVBQVUsRUFBRSxRQUFRO1NBQ3ZCLENBQUE7SUFDTCxDQUFDO0lBUU8scUNBQVksR0FBcEIsVUFBcUIsT0FBTztRQUE1QixpQkFNQztRQUxHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzdDLFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQ2hELENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNaLENBQUM7SUFFRCw4QkFBSyxHQUFMO1FBQUEsaUJBb0JDO1FBbkJHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDNUIsU0FBUyxDQUNOLFVBQUEsSUFBSTtZQUNBLElBQU0sUUFBUSxHQUFHLElBQUksK0JBQWEsRUFBRSxDQUFDO1lBQ3JDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDcEQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNqRCxXQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2pELEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQzdDLENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDRixLQUFJLENBQUMsWUFBWSxDQUFDLHNDQUFzQyxDQUFDLENBQUE7WUFDN0QsQ0FBQztRQUNMLENBQUMsRUFDRDtZQUNJLEtBQUksQ0FBQyxZQUFZLENBQUMsa0RBQWtELENBQUMsQ0FBQTtRQUN6RSxDQUFDLENBQ0osQ0FBQztJQUNWLENBQUM7SUE3Q2tCO1FBQWxCLGdCQUFTLENBQUMsTUFBTSxDQUFDO2tDQUFPLGlCQUFVO2dEQUFDO0lBQ2I7UUFBdEIsZ0JBQVMsQ0FBQyxVQUFVLENBQUM7a0NBQVcsaUJBQVU7b0RBQUM7SUFQbkMsY0FBYztRQVAxQixnQkFBUyxDQUFDO1lBQ1AsU0FBUyxFQUFFLENBQUMsMEJBQVcsQ0FBQztZQUN4QixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7U0FDOUMsQ0FBQzt5Q0FtQjZCLFdBQUksRUFBa0IsZUFBTSxFQUF1QiwwQkFBVztPQWpCaEYsY0FBYyxDQW9EMUI7SUFBRCxxQkFBQztDQUFBLEFBcERELElBb0RDO0FBcERZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL2VudGl0aWVzL3VzZXIvdXNlclwiXHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vZW50aXRpZXMvdXNlci91c2VyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgTG9naW5SZXNwb25zZSB9IGZyb20gXCIuLi8uLi9zb2FwL3Jlc3BvbnNlUGFyc2Vyc1wiO1xyXG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgcHJvdmlkZXJzOiBbVXNlclNlcnZpY2VdLFxyXG4gICAgc2VsZWN0b3I6IFwibG9naW4tY29tcG9uZW50XCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BhZ2VzL2xvZ2luL2xvZ2luLmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvbG9naW4vbG9naW4tY29tbW9uLmNzc1wiXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHVzZXI6IFVzZXI7XHJcbiAgICBmYWlsZWRMb2dpbkxhYmVsOiB7XHJcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgICAgIHZpc2liaWxpdHk6IHN0cmluZ1xyXG4gICAgfTtcclxuICAgIEBWaWV3Q2hpbGQoXCJuYW1lXCIpIG5hbWU6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKFwicGFzc3dvcmRcIikgcGFzc3dvcmQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mYWlsZWRMb2dpbkxhYmVsID0ge1xyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlDFmWlobMOhxaFlbsOtIHNlIG5lemRhxZlpbG8uIFprb250cm9sdWp0ZSBwxZlpcG9qZW7DrSBrIGludGVybmV0dS5cIixcclxuICAgICAgICAgICAgdmlzaWJpbGl0eTogXCJoaWRkZW5cIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSApIHtcclxuICAgICAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcigpO1xyXG4gICAgICAgIHRoaXMudXNlci5uYW1lID0gXCJzdHJlZGlza28ua29wcml2bmljZVwiO1xyXG4gICAgICAgIHRoaXMudXNlci5wYXNzd29yZCA9IFwia29wcml2bmljZS5XZWI1XCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93RXJyb3JCYXIobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMuZmFpbGVkTG9naW5MYWJlbC5tZXNzYWdlID0gbWVzc2FnZTtcclxuICAgICAgICB0aGlzLmZhaWxlZExvZ2luTGFiZWwudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZhaWxlZExvZ2luTGFiZWwudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgfSwgMzAwMClcclxuICAgIH1cclxuXHJcbiAgICBsb2dpbigpIHtcclxuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmxvZ2luKHRoaXMudXNlcilcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIHJlc3AgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gbmV3IExvZ2luUmVzcG9uc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5wYXJzZUxvZ2luUmVzcG9uc2UocmVzcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJ0b2tlblwiLCByZXNwb25zZS5nZXRUb2tlbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwiaWRSb2xlXCIsIHJlc3BvbnNlLmlkUm9sZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzLnNldFN0cmluZyhcImlkVW5pdFwiLCByZXNwb25zZS5pZFVuaXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvd2FyZWhvdXNlTGlzdFwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dFcnJvckJhcihcIsWgcGF0bsOpIHXFvml2YXRlbHNrw6kgam3DqW5vIG5lYm8gaGVzbG8uXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dFcnJvckJhcihcIk5hc3RhbGEgY2h5YmEgcMWZaSBrb211bmlrYWNpIHNlIHNsdcW+Ym91IFNrYXV0SVMuXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIl19