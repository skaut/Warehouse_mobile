"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var appSettings = require("application-settings");
var Constants = require("../../constants");
var BaseRequest = /** @class */ (function () {
    function BaseRequest() {
        this.ID_Application = Constants.APPLICATION_ID;
    }
    /**
     * Method for post call on skautIS webservice
     *
     * @param entity object used to get required parameters and xml tags names
     * @param {string} serviceName to call on backend api
     * @returns {Observable<any>} result of post request
     */
    BaseRequest.prototype.call = function (entity, serviceName, httpClient) {
        // const entityName = entity.constructor.name;
        var options = {
            headers: new http_1.HttpHeaders({
                "Content-Type": "text/xml",
            }),
            responseType: "text"
        };
        return httpClient.post(Constants.BASE_SERVICE_URL + serviceName + ".asmx", this.getBody(entity, entity.constructor.name), options);
    };
    BaseRequest.prototype.getBody = function (entity, entityName) {
        var requestParams = Object.getOwnPropertyNames(entity)
            .map(function (element) { return "<" + element + ">" + entity[element] + "</" + element + ">"; });
        return "<soap12:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap12=\"http://www.w3.org/2003/05/soap-envelope\">\n                  <soap12:Body>\n                    <" + entityName + " xmlns=\"https://is.skaut.cz/\">\n                      <" + this.lowerCaseFirstLetter(entityName) + "Input>\n                        <ID_Login>" + appSettings.getString("token") + "</ID_Login>\n                        " + requestParams.join('') + "\n                      </" + this.lowerCaseFirstLetter(entityName) + "Input>\n                    </" + entityName + ">\n                  </soap12:Body>\n                </soap12:Envelope>";
    };
    BaseRequest.prototype.lowerCaseFirstLetter = function (string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
    };
    BaseRequest = __decorate([
        core_1.Injectable()
    ], BaseRequest);
    return BaseRequest;
}());
exports.BaseRequest = BaseRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZVJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYXNlUmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUErRDtBQUUvRCxzQ0FBMkM7QUFDM0Msa0RBQW1EO0FBQ25ELDJDQUE2QztBQUk3QztJQURBO1FBR0ksbUJBQWMsR0FBVyxTQUFTLENBQUMsY0FBYyxDQUFDO0lBMkN0RCxDQUFDO0lBekNHOzs7Ozs7T0FNRztJQUNILDBCQUFJLEdBQUosVUFBSyxNQUFXLEVBQUUsV0FBbUIsRUFBRSxVQUFzQjtRQUN6RCw4Q0FBOEM7UUFDOUMsSUFBTSxPQUFPLEdBQUc7WUFDWixPQUFPLEVBQUUsSUFBSSxrQkFBVyxDQUFDO2dCQUNyQixjQUFjLEVBQUUsVUFBVTthQUU3QixDQUFDO1lBQ0YsWUFBWSxFQUFFLE1BQWdCO1NBQ2pDLENBQUM7UUFDRixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDbEIsU0FBUyxDQUFDLGdCQUFnQixHQUFHLFdBQVcsR0FBRyxPQUFPLEVBQ2xELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQzdDLE9BQU8sQ0FDVixDQUFDO0lBQ04sQ0FBQztJQUVPLDZCQUFPLEdBQWYsVUFBZ0IsTUFBVyxFQUFFLFVBQWtCO1FBQzNDLElBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUM7YUFDbkQsR0FBRyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsTUFBSSxPQUFPLFNBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFLLE9BQU8sTUFBRyxFQUE3QyxDQUE2QyxDQUFDLENBQUM7UUFDbkUsTUFBTSxDQUFDLDhPQUVRLFVBQVUsaUVBQ1IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxrREFDMUIsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsNkNBQ3hDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGtDQUN0QixJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLHNDQUN2QyxVQUFVLDRFQUVDLENBQUM7SUFDaEMsQ0FBQztJQUVPLDBDQUFvQixHQUE1QixVQUE2QixNQUFNO1FBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQTVDUSxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7T0FDQSxXQUFXLENBNkN2QjtJQUFELGtCQUFDO0NBQUEsQUE3Q0QsSUE2Q0M7QUE3Q1ksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCJcclxuaW1wb3J0ICogYXMgQ29uc3RhbnRzIGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCYXNlUmVxdWVzdCB7XHJcblxyXG4gICAgSURfQXBwbGljYXRpb246IHN0cmluZyA9IENvbnN0YW50cy5BUFBMSUNBVElPTl9JRDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ldGhvZCBmb3IgcG9zdCBjYWxsIG9uIHNrYXV0SVMgd2Vic2VydmljZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbnRpdHkgb2JqZWN0IHVzZWQgdG8gZ2V0IHJlcXVpcmVkIHBhcmFtZXRlcnMgYW5kIHhtbCB0YWdzIG5hbWVzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VydmljZU5hbWUgdG8gY2FsbCBvbiBiYWNrZW5kIGFwaVxyXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn0gcmVzdWx0IG9mIHBvc3QgcmVxdWVzdFxyXG4gICAgICovXHJcbiAgICBjYWxsKGVudGl0eTogYW55LCBzZXJ2aWNlTmFtZTogc3RyaW5nLCBodHRwQ2xpZW50OiBIdHRwQ2xpZW50KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICAvLyBjb25zdCBlbnRpdHlOYW1lID0gZW50aXR5LmNvbnN0cnVjdG9yLm5hbWU7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwidGV4dC94bWxcIixcclxuICAgICAgICAgICAgICAgIC8vIFwiU09BUEFjdGlvblwiOiBgaHR0cHM6Ly9pcy5za2F1dC5jei8ke2VudGl0eU5hbWV9YFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiBcInRleHRcIiBhcyBcInRleHRcIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGh0dHBDbGllbnQucG9zdChcclxuICAgICAgICAgICAgQ29uc3RhbnRzLkJBU0VfU0VSVklDRV9VUkwgKyBzZXJ2aWNlTmFtZSArIFwiLmFzbXhcIixcclxuICAgICAgICAgICAgdGhpcy5nZXRCb2R5KGVudGl0eSwgZW50aXR5LmNvbnN0cnVjdG9yLm5hbWUpLFxyXG4gICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEJvZHkoZW50aXR5OiBhbnksIGVudGl0eU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHJlcXVlc3RQYXJhbXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlbnRpdHkpXHJcbiAgICAgICAgICAgIC5tYXAoZWxlbWVudCA9PiBgPCR7ZWxlbWVudH0+JHtlbnRpdHlbZWxlbWVudF19PC8ke2VsZW1lbnR9PmApO1xyXG4gICAgICAgIHJldHVybiBgPHNvYXAxMjpFbnZlbG9wZSB4bWxuczp4c2k9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZVwiIHhtbG5zOnhzZD1cImh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hXCIgeG1sbnM6c29hcDEyPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMy8wNS9zb2FwLWVudmVsb3BlXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxzb2FwMTI6Qm9keT5cclxuICAgICAgICAgICAgICAgICAgICA8JHtlbnRpdHlOYW1lfSB4bWxucz1cImh0dHBzOi8vaXMuc2thdXQuY3ovXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8JHt0aGlzLmxvd2VyQ2FzZUZpcnN0TGV0dGVyKGVudGl0eU5hbWUpfUlucHV0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8SURfTG9naW4+JHthcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0b2tlblwiKX08L0lEX0xvZ2luPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke3JlcXVlc3RQYXJhbXMuam9pbignJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8LyR7dGhpcy5sb3dlckNhc2VGaXJzdExldHRlcihlbnRpdHlOYW1lKX1JbnB1dD5cclxuICAgICAgICAgICAgICAgICAgICA8LyR7ZW50aXR5TmFtZX0+XHJcbiAgICAgICAgICAgICAgICAgIDwvc29hcDEyOkJvZHk+XHJcbiAgICAgICAgICAgICAgICA8L3NvYXAxMjpFbnZlbG9wZT5gO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG93ZXJDYXNlRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcclxuICAgIH1cclxufSJdfQ==