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
    error: boolean;

    constructor() {
        this.error = false;
    }


    /**
     * Method parses received soap response to fields of entity parameter
     *
     * @param {string} response - soap response as text
     * @param entity - result entity to map received parameters to. In case of multiple outputs in result
     *  (e.g. response to RoleAll) entity object should have list parameter of entities to map results to
     *  (e.g.) roles: Role[];
     * @param multipleResponsesDataEntity - entity to map single output to (e.g.) Role.
     */
    parseResponse(response: string, entity: any, multipleResponsesDataEntity?: any): any {
        try {
            const properties = Object.getOwnPropertyNames(entity);
            const entityName = entity.constructor.name;
            const requestName = entityName.split("Result")[0];
            // receivedTags contains XElement either directly above received parameters
            // or above Output tags (e.g. <RoleAllOutput>), depends on response type
            const receivedTags = XmlObjects.parse(response)
                .root
                .element("soap:Body")
                .element(`${requestName}Response`)
                .elements(`${entityName}`)[0];
            const outputs = receivedTags.elements(`${requestName}Output`);
            // response with single response object, maps some of the received data which will be required later
            // to corresponding properties of passed result entity
            if (outputs.length === 0) {
                receivedTags.nodes().map(tag  => {
                    if (tag instanceof XmlObjects.XElement) {
                        properties.map(property => {
                            if (property === tag.name.toString()) {
                                entity[property] = tag.value.toString();
                                // console.log("property: " + property + ", value: " + tag.value.toString());
                            }
                        });
                    }
                });
            }
            // response which may contain multiple outputs (e.g. response to RoleAll request)
            else {
                // todo - handle multiple outputs responses
            }
            return entity;
        }
        catch {
            this.error = true;
            return null;
        }
    }
}