import * as XmlObjects from "nativescript-xmlobjects";


export class LoginResponse {
    private token: string;
    roleId: string;
    unitId: string;
    error: boolean;

    constructor() {
        this.error = false;
    }

    /*
        Method parses xml response for login request and sets fields to received values.
        In case of error sets error field to true to signalize problem.
     */
    parseLoginResponse(response: string) {
        try {
            const inputs = XmlObjects.parse(response)
                .root
                .element("body")
                .element("form")
                .elements("input");
            inputs.map((element) => {
                switch (element.attribute("name").value) {
                    case "skautIS_Token":
                        this.token = element.attribute("value").value;
                        break;
                    case "skautIS_IDRole":
                        this.roleId = element.attribute("value").value;
                        break;
                    case "skautIS_IDUnit":
                        this.unitId = element.attribute("value").value;
                        break;
                }
            })
        }
        catch {
            this.error = true;
        }
    }

    getToken() {
        return this.token;
    }
}

export class SoapResponse {

}