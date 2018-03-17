import * as XmlObjects from "nativescript-xmlobjects";


export class LoginResponse {
    private token: string;
    idRole: string;
    idUnit: string;
    error: boolean;

    constructor() {
        this.error = false;
    }

    parseLoginResponse(response: string) {
        try {
            const inputs = XmlObjects.parse(response)
                .root
                // <body> is in the second element if request was successful
                .element("body")
                .element("form")
                .elements("input");
            inputs.map((element) => {
                switch (element.attribute("name").value) {
                    case "skautIS_Token":
                        this.token = element.attribute("value").value;
                        break;
                    case "skautIS_IDRole":
                        this.idRole = element.attribute("value").value;
                        break;
                    case "skautIS_IDUnit":
                        this.idUnit = element.attribute("value").value;
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

export class soapResponse {

}