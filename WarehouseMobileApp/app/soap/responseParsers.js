"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XmlObjects = require("nativescript-xmlobjects");
var LoginResponse = /** @class */ (function () {
    function LoginResponse() {
        this.error = false;
    }
    LoginResponse.prototype.parseLoginResponse = function (response) {
        var _this = this;
        try {
            var inputs = XmlObjects.parse(response)
                .root
                .element("body")
                .element("form")
                .elements("input");
            inputs.map(function (element) {
                switch (element.attribute("name").value) {
                    case "skautIS_Token":
                        _this.token = element.attribute("value").value;
                        break;
                    case "skautIS_IDRole":
                        _this.idRole = element.attribute("value").value;
                        break;
                    case "skautIS_IDUnit":
                        _this.idUnit = element.attribute("value").value;
                        break;
                }
            });
        }
        catch (_a) {
            this.error = true;
        }
    };
    LoginResponse.prototype.getToken = function () {
        return this.token;
    };
    return LoginResponse;
}());
exports.LoginResponse = LoginResponse;
var soapResponse = /** @class */ (function () {
    function soapResponse() {
    }
    return soapResponse;
}());
exports.soapResponse = soapResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2VQYXJzZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzcG9uc2VQYXJzZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0RBQXNEO0FBR3REO0lBTUk7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsMENBQWtCLEdBQWxCLFVBQW1CLFFBQWdCO1FBQW5DLGlCQXlCQztRQXhCRyxJQUFJLENBQUM7WUFDRCxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztpQkFDcEMsSUFBSTtpQkFFSixPQUFPLENBQUMsTUFBTSxDQUFDO2lCQUNmLE9BQU8sQ0FBQyxNQUFNLENBQUM7aUJBQ2YsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxPQUFPO2dCQUNmLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDdEMsS0FBSyxlQUFlO3dCQUNoQixLQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO3dCQUM5QyxLQUFLLENBQUM7b0JBQ1YsS0FBSyxnQkFBZ0I7d0JBQ2pCLEtBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBQy9DLEtBQUssQ0FBQztvQkFDVixLQUFLLGdCQUFnQjt3QkFDakIsS0FBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQzt3QkFDL0MsS0FBSyxDQUFDO2dCQUNkLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFDRCxLQUFLLENBQUMsQ0FBQyxJQUFELENBQUM7WUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDO0lBQ0wsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBeENELElBd0NDO0FBeENZLHNDQUFhO0FBMEMxQjtJQUFBO0lBRUEsQ0FBQztJQUFELG1CQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFhtbE9iamVjdHMgZnJvbSBcIm5hdGl2ZXNjcmlwdC14bWxvYmplY3RzXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIExvZ2luUmVzcG9uc2Uge1xyXG4gICAgcHJpdmF0ZSB0b2tlbjogc3RyaW5nO1xyXG4gICAgaWRSb2xlOiBzdHJpbmc7XHJcbiAgICBpZFVuaXQ6IHN0cmluZztcclxuICAgIGVycm9yOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZXJyb3IgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwYXJzZUxvZ2luUmVzcG9uc2UocmVzcG9uc2U6IHN0cmluZykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlucHV0cyA9IFhtbE9iamVjdHMucGFyc2UocmVzcG9uc2UpXHJcbiAgICAgICAgICAgICAgICAucm9vdFxyXG4gICAgICAgICAgICAgICAgLy8gPGJvZHk+IGlzIGluIHRoZSBzZWNvbmQgZWxlbWVudCBpZiByZXF1ZXN0IHdhcyBzdWNjZXNzZnVsXHJcbiAgICAgICAgICAgICAgICAuZWxlbWVudChcImJvZHlcIilcclxuICAgICAgICAgICAgICAgIC5lbGVtZW50KFwiZm9ybVwiKVxyXG4gICAgICAgICAgICAgICAgLmVsZW1lbnRzKFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIGlucHV0cy5tYXAoKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoZWxlbWVudC5hdHRyaWJ1dGUoXCJuYW1lXCIpLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInNrYXV0SVNfVG9rZW5cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2tlbiA9IGVsZW1lbnQuYXR0cmlidXRlKFwidmFsdWVcIikudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJza2F1dElTX0lEUm9sZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlkUm9sZSA9IGVsZW1lbnQuYXR0cmlidXRlKFwidmFsdWVcIikudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJza2F1dElTX0lEVW5pdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlkVW5pdCA9IGVsZW1lbnQuYXR0cmlidXRlKFwidmFsdWVcIikudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3IgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRUb2tlbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHNvYXBSZXNwb25zZSB7XHJcblxyXG59Il19