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
        var entityName = entity.constructor.name;
        var options = {
            headers: new http_1.HttpHeaders({
                "Content-Type": "text/xml",
                "SOAPAction": "https://is.skaut.cz/" + entityName
            }),
            responseType: "text"
        };
        return httpClient.post(Constants.BASE_SERVICE_URL + serviceName + ".asmx", this.getBody(entity, entityName), options);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZVJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYXNlUmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUErRDtBQUUvRCxzQ0FBMkM7QUFDM0Msa0RBQW1EO0FBQ25ELDJDQUE2QztBQUk3QztJQURBO1FBR0ksbUJBQWMsR0FBVyxTQUFTLENBQUMsY0FBYyxDQUFDO0lBNEN0RCxDQUFDO0lBMUNHOzs7Ozs7T0FNRztJQUNILDBCQUFJLEdBQUosVUFBSyxNQUFXLEVBQUUsV0FBbUIsRUFBRSxVQUFzQjtRQUN6RCxJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUMzQyxJQUFNLE9BQU8sR0FBRztZQUNaLE9BQU8sRUFBRSxJQUFJLGtCQUFXLENBQUM7Z0JBQ3JCLGNBQWMsRUFBRSxVQUFVO2dCQUMxQixZQUFZLEVBQUUseUJBQXVCLFVBQVk7YUFDcEQsQ0FBQztZQUNGLFlBQVksRUFBRSxNQUFnQjtTQUNqQyxDQUFDO1FBQ0YsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQ2xCLFNBQVMsQ0FBQyxnQkFBZ0IsR0FBRyxXQUFXLEdBQUcsT0FBTyxFQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsRUFDaEMsT0FBTyxDQUNWLENBQUM7SUFDTixDQUFDO0lBRU8sNkJBQU8sR0FBZixVQUFnQixNQUFXLEVBQUUsVUFBa0I7UUFDM0MsSUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQzthQUNuRCxHQUFHLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxNQUFJLE9BQU8sU0FBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUssT0FBTyxNQUFHLEVBQTdDLENBQTZDLENBQUMsQ0FBQztRQUVuRSxNQUFNLENBQUMsOE9BRVEsVUFBVSxpRUFDUixJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLGtEQUMxQixXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyw2Q0FDeEMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsa0NBQ3RCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsc0NBQ3ZDLFVBQVUsNEVBRUMsQ0FBQztJQUNoQyxDQUFDO0lBRU8sMENBQW9CLEdBQTVCLFVBQTZCLE1BQU07UUFDL0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBN0NRLFdBQVc7UUFEdkIsaUJBQVUsRUFBRTtPQUNBLFdBQVcsQ0E4Q3ZCO0lBQUQsa0JBQUM7Q0FBQSxBQTlDRCxJQThDQztBQTlDWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIlxyXG5pbXBvcnQgKiBhcyBDb25zdGFudHMgZnJvbSBcIi4uLy4uL2NvbnN0YW50c1wiO1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEJhc2VSZXF1ZXN0IHtcclxuXHJcbiAgICBJRF9BcHBsaWNhdGlvbjogc3RyaW5nID0gQ29uc3RhbnRzLkFQUExJQ0FUSU9OX0lEO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWV0aG9kIGZvciBwb3N0IGNhbGwgb24gc2thdXRJUyB3ZWJzZXJ2aWNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVudGl0eSBvYmplY3QgdXNlZCB0byBnZXQgcmVxdWlyZWQgcGFyYW1ldGVycyBhbmQgeG1sIHRhZ3MgbmFtZXNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZXJ2aWNlTmFtZSB0byBjYWxsIG9uIGJhY2tlbmQgYXBpXHJcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fSByZXN1bHQgb2YgcG9zdCByZXF1ZXN0XHJcbiAgICAgKi9cclxuICAgIGNhbGwoZW50aXR5OiBhbnksIHNlcnZpY2VOYW1lOiBzdHJpbmcsIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIGNvbnN0IGVudGl0eU5hbWUgPSBlbnRpdHkuY29uc3RydWN0b3IubmFtZTtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJ0ZXh0L3htbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJTT0FQQWN0aW9uXCI6IGBodHRwczovL2lzLnNrYXV0LmN6LyR7ZW50aXR5TmFtZX1gXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICByZXNwb25zZVR5cGU6IFwidGV4dFwiIGFzIFwidGV4dFwiXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gaHR0cENsaWVudC5wb3N0KFxyXG4gICAgICAgICAgICBDb25zdGFudHMuQkFTRV9TRVJWSUNFX1VSTCArIHNlcnZpY2VOYW1lICsgXCIuYXNteFwiLFxyXG4gICAgICAgICAgICB0aGlzLmdldEJvZHkoZW50aXR5LCBlbnRpdHlOYW1lKSxcclxuICAgICAgICAgICAgb3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRCb2R5KGVudGl0eTogYW55LCBlbnRpdHlOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCByZXF1ZXN0UGFyYW1zID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZW50aXR5KVxyXG4gICAgICAgICAgICAubWFwKGVsZW1lbnQgPT4gYDwke2VsZW1lbnR9PiR7ZW50aXR5W2VsZW1lbnRdfTwvJHtlbGVtZW50fT5gKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGA8c29hcDEyOkVudmVsb3BlIHhtbG5zOnhzaT1cImh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hLWluc3RhbmNlXCIgeG1sbnM6eHNkPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWFcIiB4bWxuczpzb2FwMTI9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAzLzA1L3NvYXAtZW52ZWxvcGVcIj5cclxuICAgICAgICAgICAgICAgICAgPHNvYXAxMjpCb2R5PlxyXG4gICAgICAgICAgICAgICAgICAgIDwke2VudGl0eU5hbWV9IHhtbG5zPVwiaHR0cHM6Ly9pcy5za2F1dC5jei9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwke3RoaXMubG93ZXJDYXNlRmlyc3RMZXR0ZXIoZW50aXR5TmFtZSl9SW5wdXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJRF9Mb2dpbj4ke2FwcFNldHRpbmdzLmdldFN0cmluZyhcInRva2VuXCIpfTwvSURfTG9naW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7cmVxdWVzdFBhcmFtcy5qb2luKCcnKX1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvJHt0aGlzLmxvd2VyQ2FzZUZpcnN0TGV0dGVyKGVudGl0eU5hbWUpfUlucHV0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvJHtlbnRpdHlOYW1lfT5cclxuICAgICAgICAgICAgICAgICAgPC9zb2FwMTI6Qm9keT5cclxuICAgICAgICAgICAgICAgIDwvc29hcDEyOkVudmVsb3BlPmA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb3dlckNhc2VGaXJzdExldHRlcihzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xyXG4gICAgfVxyXG59Il19