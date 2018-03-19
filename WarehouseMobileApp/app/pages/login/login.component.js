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
            var response = new responseParsers_1.LoginResponse();
            response.parseLoginResponse(resp);
            if (!response.error) {
                appSettings.setString("userName", _this.user.name);
                appSettings.setString("token", response.getToken());
                appSettings.setString("roleId", response.roleId);
                appSettings.setString("unitId", response.unitId);
                _this.userService.getUserDetail(new userDetail_1.UserDetail())
                    .subscribe(function (resp) {
                    // console.log(resp);
                    var response = new responseParsers_1.SoapResponse();
                    var userDetailResult = response
                        .parseResponse(resp, new userDetailResult_1.UserDetailResult());
                    // response.parseResponse(test, new UserDetailResult());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLGdDQUErQjtBQUMvQixpREFBK0M7QUFDL0MsaUVBQStEO0FBQy9ELDhFQUF5RjtBQUN6Riw2REFBNEQ7QUFDNUQsNkRBQXdEO0FBQ3hELHdFQUF1RTtBQUN2RSxrREFBb0Q7QUFXcEQ7SUFpQkksd0JBQXFCLElBQVUsRUFBVSxXQUF3QixFQUFVLGdCQUFrQztRQUF4RixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ3pHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxzQkFBc0IsQ0FBQztRQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQztJQUMzQyxDQUFDO0lBWkQsaUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUc7WUFDcEIsT0FBTyxFQUFFLGtEQUFrRDtZQUMzRCxVQUFVLEVBQUUsUUFBUTtTQUN2QixDQUFBO0lBQ0wsQ0FBQztJQVFPLHFDQUFZLEdBQXBCLFVBQXFCLE9BQU87UUFBNUIsaUJBTUM7UUFMRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM3QyxVQUFVLENBQUM7WUFDUCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUNoRCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDWixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsOEJBQUssR0FBTDtRQUFBLGlCQW1DQztRQWxDRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzVCLFNBQVMsQ0FDTixVQUFBLElBQUk7WUFDQSxJQUFNLFFBQVEsR0FBRyxJQUFJLCtCQUFhLEVBQUUsQ0FBQztZQUNyQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ3BELFdBQVcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDakQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNqRCxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLHVCQUFVLEVBQUUsQ0FBQztxQkFDM0MsU0FBUyxDQUNOLFVBQUEsSUFBSTtvQkFDQSxxQkFBcUI7b0JBQ3JCLElBQU0sUUFBUSxHQUFHLElBQUksOEJBQVksRUFBRSxDQUFDO29CQUNwQyxJQUFNLGdCQUFnQixHQUFxQixRQUFRO3lCQUM5QyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksbUNBQWdCLEVBQUUsQ0FBQyxDQUFDO29CQUNqRCx3REFBd0Q7b0JBQ3hELEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzNFLENBQUMsRUFDTDtvQkFDSSxLQUFJLENBQUMsWUFBWSxDQUFDLHVDQUF1QyxDQUFDLENBQUM7Z0JBQy9ELENBQUMsQ0FDSixDQUFDO1lBQ1YsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLEtBQUksQ0FBQyxZQUFZLENBQUMsc0NBQXNDLENBQUMsQ0FBQTtZQUM3RCxDQUFDO1FBQ0wsQ0FBQyxFQUNEO1lBQ0ksS0FBSSxDQUFDLFlBQVksQ0FBQyw4REFBOEQsQ0FBQyxDQUFBO1FBQ3JGLENBQUMsQ0FDSixDQUFDO0lBRVYsQ0FBQztJQWhFa0I7UUFBbEIsZ0JBQVMsQ0FBQyxNQUFNLENBQUM7a0NBQU8saUJBQVU7Z0RBQUM7SUFDYjtRQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQztrQ0FBVyxpQkFBVTtvREFBQztJQVBuQyxjQUFjO1FBUDFCLGdCQUFTLENBQUM7WUFDUCxTQUFTLEVBQUUsQ0FBQywwQkFBVyxDQUFDO1lBQ3hCLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztTQUM5QyxDQUFDO3lDQW1CNkIsV0FBSSxFQUF1QiwwQkFBVyxFQUE0Qix1Q0FBZ0I7T0FqQnBHLGNBQWMsQ0F1RTFCO0lBQUQscUJBQUM7Q0FBQSxBQXZFRCxJQXVFQztBQXZFWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9lbnRpdGllcy91c2VyL3VzZXJcIlxyXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9lbnRpdGllcy91c2VyL3VzZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBMb2dpblJlc3BvbnNlLCBTb2FwUmVzcG9uc2UgfSBmcm9tIFwiLi4vLi4vc29hcC9yZXNwb25zZVBhcnNlcnMvcmVzcG9uc2VQYXJzZXJzXCI7XHJcbmltcG9ydCB7IFVzZXJEZXRhaWwgfSBmcm9tIFwiLi4vLi4vc29hcC9yZXF1ZXN0cy91c2VyRGV0YWlsXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcclxuaW1wb3J0IHsgVXNlckRldGFpbFJlc3VsdCB9IGZyb20gXCIuLi8uLi9zb2FwL3Jlc3VsdHMvdXNlckRldGFpbFJlc3VsdFwiO1xyXG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHt0ZXN0fSBmcm9tIFwiLi4vLi4vc29hcC9yZXNwb25zZVBhcnNlcnMvX190ZXN0c19fL3NvYXBSZXNwb25zZS5zcGVjXCJcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHByb3ZpZGVyczogW1VzZXJTZXJ2aWNlXSxcclxuICAgIHNlbGVjdG9yOiBcImxvZ2luLWNvbXBvbmVudFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy9sb2dpbi9sb2dpbi5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcInBhZ2VzL2xvZ2luL2xvZ2luLWNvbW1vbi5jc3NcIl1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICB1c2VyOiBVc2VyO1xyXG4gICAgZmFpbGVkTG9naW5MYWJlbDoge1xyXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgICAgICB2aXNpYmlsaXR5OiBzdHJpbmdcclxuICAgIH07XHJcbiAgICBAVmlld0NoaWxkKFwibmFtZVwiKSBuYW1lOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZChcInBhc3N3b3JkXCIpIHBhc3N3b3JkOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZmFpbGVkTG9naW5MYWJlbCA9IHtcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJOYXN0YWxhIGNoeWJhIHDFmWkga29tdW5pa2FjaSBzZSBzbHXFvmJvdSBTa2F1dElTLlwiLFxyXG4gICAgICAgICAgICB2aXNpYmlsaXR5OiBcImhpZGRlblwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMgKSB7XHJcbiAgICAgICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcclxuICAgICAgICB0aGlzLnVzZXIubmFtZSA9IFwic3RyZWRpc2tvLmtvcHJpdm5pY2VcIjtcclxuICAgICAgICB0aGlzLnVzZXIucGFzc3dvcmQgPSBcImtvcHJpdm5pY2UuV2ViNVwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd0Vycm9yQmFyKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLmZhaWxlZExvZ2luTGFiZWwubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgdGhpcy5mYWlsZWRMb2dpbkxhYmVsLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5mYWlsZWRMb2dpbkxhYmVsLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG4gICAgICAgIH0sIDMwMDApXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAgICBQZXJmb3JtcyBsb2dpbiByZXF1ZXN0IGZvbGxvd2VkIGJ5IHVzZXJEZXRhaWwgcmVxdWVzdCB1c2luZyBkYXRhIGZyb20gcmVzcG9uc2UgdG8gbG9naW5cclxuICAgICAgICBQYXJhbXMgZnJvbSByZXNwb25zZSB3aGljaCB3aWxsIGJlIHVzZWQgbGF0ZXIgYnkgYXBwIGFyZSBzYXZlZCB0byBhcHBTZXR0aW5ncy5cclxuICAgICAqL1xyXG4gICAgbG9naW4oKSB7XHJcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS5sb2dpbih0aGlzLnVzZXIpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICByZXNwID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IG5ldyBMb2dpblJlc3BvbnNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UucGFyc2VMb2dpblJlc3BvbnNlKHJlc3ApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwidXNlck5hbWVcIiwgdGhpcy51c2VyLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJ0b2tlblwiLCByZXNwb25zZS5nZXRUb2tlbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwicm9sZUlkXCIsIHJlc3BvbnNlLnJvbGVJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcFNldHRpbmdzLnNldFN0cmluZyhcInVuaXRJZFwiLCByZXNwb25zZS51bml0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXJEZXRhaWwobmV3IFVzZXJEZXRhaWwoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IG5ldyBTb2FwUmVzcG9uc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlckRldGFpbFJlc3VsdDogVXNlckRldGFpbFJlc3VsdCA9IHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyc2VSZXNwb25zZShyZXNwLCBuZXcgVXNlckRldGFpbFJlc3VsdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVzcG9uc2UucGFyc2VSZXNwb25zZSh0ZXN0LCBuZXcgVXNlckRldGFpbFJlc3VsdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi93YXJlaG91c2VMaXN0XCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yQmFyKFwiTmVwb3ZlZGxvIHNlIG5hxI3DrXN0IHXFvml2YXRlbHNrw6EgZGF0YS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yQmFyKFwixaBwYXRuw6kgdcW+aXZhdGVsc2vDqSBqbcOpbm8gbmVibyBoZXNsby5cIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yQmFyKFwiUMWZaWhsw6HFoWVuw60gc2UgbmV6ZGHFmWlsby4gWmtvbnRyb2x1anRlIHDFmWlwb2plbsOtIGsgaW50ZXJuZXR1LlwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgIH1cclxufVxyXG4iXX0=