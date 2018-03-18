"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var Constants = require("../../constants");
var UserService = /** @class */ (function () {
    function UserService(httpClient) {
        this.httpClient = httpClient;
        this.serviceName = "UserManagement";
    }
    UserService.prototype.login = function (user) {
        var url = Constants.SERVER_URL + "Login/";
        var body = this.buildLoginBody(user);
        return this.httpClient.post(url, body, { responseType: "text" });
    };
    UserService.prototype.getUserDetail = function (userDetail) {
        return userDetail.call(userDetail, this.serviceName, this.httpClient);
    };
    UserService.prototype.buildLoginBody = function (user) {
        var body = new FormData();
        body.append("appid", Constants.APPLICATION_ID);
        body.append("ctl00$Content$txtUserName", user.name);
        body.append("ctl00$Content$txtPassword", user.password);
        body.append("ctl00$Content$BtnLogin", Constants.BUTTON_LOGIN);
        body.append("__EVENTVALIDATION", Constants.__EVENTVALIDATION);
        body.append("__VIEWSTATE", Constants.__VIEWSTATE);
        body.append("__VIEWSTATEGENERATOR", Constants.__VIEWSTATEGENERATOR);
        return body;
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDZDQUFrRDtBQUdsRCwyQ0FBNEM7QUFLNUM7SUFJSSxxQkFBcUIsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUYzQyxnQkFBVyxHQUFXLGdCQUFnQixDQUFDO0lBRVEsQ0FBQztJQUdoRCwyQkFBSyxHQUFMLFVBQU8sSUFBVTtRQUNiLElBQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQzVDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUN2QixHQUFHLEVBQ0gsSUFBSSxFQUNKLEVBQUUsWUFBWSxFQUFFLE1BQWdCLEVBQUUsQ0FDckMsQ0FBQztJQUNOLENBQUM7SUFFRCxtQ0FBYSxHQUFiLFVBQWMsVUFBc0I7UUFDaEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFTyxvQ0FBYyxHQUF0QixVQUF1QixJQUFVO1FBQzdCLElBQU0sSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxNQUFNLENBQUMsd0JBQXdCLEVBQUUsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUUsU0FBUyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDcEUsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBL0JRLFdBQVc7UUFEdkIsaUJBQVUsRUFBRTt5Q0FLd0IsaUJBQVU7T0FKbEMsV0FBVyxDQWdDdkI7SUFBRCxrQkFBQztDQUFBLEFBaENELElBZ0NDO0FBaENZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuL3VzZXJcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0ICogYXMgQ29uc3RhbnRzIGZyb20gXCIuLi8uLi9jb25zdGFudHNcIlxyXG5pbXBvcnQgeyBVc2VyRGV0YWlsIH0gZnJvbSBcIi4uLy4uL3NvYXAvc29hcEVudGl0aWVzL3VzZXJEZXRhaWxcIjtcclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBVc2VyU2VydmljZSB7XHJcblxyXG4gICAgc2VydmljZU5hbWU6IHN0cmluZyA9IFwiVXNlck1hbmFnZW1lbnRcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50ICkge31cclxuXHJcblxyXG4gICAgbG9naW4oIHVzZXI6IFVzZXIgKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICBjb25zdCB1cmwgPSBDb25zdGFudHMuU0VSVkVSX1VSTCArIFwiTG9naW4vXCI7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IHRoaXMuYnVpbGRMb2dpbkJvZHkodXNlcik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wb3N0KFxyXG4gICAgICAgICAgICB1cmwsXHJcbiAgICAgICAgICAgIGJvZHksXHJcbiAgICAgICAgICAgIHsgcmVzcG9uc2VUeXBlOiBcInRleHRcIiBhcyBcInRleHRcIiB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRVc2VyRGV0YWlsKHVzZXJEZXRhaWw6IFVzZXJEZXRhaWwpIHtcclxuICAgICAgICByZXR1cm4gdXNlckRldGFpbC5jYWxsKHVzZXJEZXRhaWwsIHRoaXMuc2VydmljZU5hbWUsIHRoaXMuaHR0cENsaWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZExvZ2luQm9keSh1c2VyOiBVc2VyKTogRm9ybURhdGEge1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBib2R5LmFwcGVuZChcImFwcGlkXCIsIENvbnN0YW50cy5BUFBMSUNBVElPTl9JRCk7XHJcbiAgICAgICAgYm9keS5hcHBlbmQoXCJjdGwwMCRDb250ZW50JHR4dFVzZXJOYW1lXCIsIHVzZXIubmFtZSk7XHJcbiAgICAgICAgYm9keS5hcHBlbmQoXCJjdGwwMCRDb250ZW50JHR4dFBhc3N3b3JkXCIsIHVzZXIucGFzc3dvcmQpO1xyXG4gICAgICAgIGJvZHkuYXBwZW5kKFwiY3RsMDAkQ29udGVudCRCdG5Mb2dpblwiLCBDb25zdGFudHMuQlVUVE9OX0xPR0lOKTtcclxuICAgICAgICBib2R5LmFwcGVuZChcIl9fRVZFTlRWQUxJREFUSU9OXCIsIENvbnN0YW50cy5fX0VWRU5UVkFMSURBVElPTik7XHJcbiAgICAgICAgYm9keS5hcHBlbmQoXCJfX1ZJRVdTVEFURVwiLCBDb25zdGFudHMuX19WSUVXU1RBVEUpO1xyXG4gICAgICAgIGJvZHkuYXBwZW5kKFwiX19WSUVXU1RBVEVHRU5FUkFUT1JcIiwgQ29uc3RhbnRzLl9fVklFV1NUQVRFR0VORVJBVE9SKTtcclxuICAgICAgICByZXR1cm4gYm9keTtcclxuICAgIH1cclxufSJdfQ==