import * as XmlObjects from "nativescript-xmlobjects";


export class LoginResponse {
    private token: string;
    roleId: string;
    unitId: string;
    error: boolean;

    constructor() {
        this.error = false;
    }

    /**
     * Method parses xml response for login request and sets fields to received values.
     *
     * @param {string} response - xml response as string
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
     * @param {string} response - soap response as string
     * @param entity - result entity to map received parameters to. In case of multiple outputs in result
     *  (e.g. response to UserRoleAll) entity object must have list parameter of entities to map results to with name
     *  in this format - UserRoles: Array<UserRole>() (or Warehouses: Array<Warehouse>());
     * @param createSingleOutputEntity - function to create entity object to map single output to
     */
    parseResponse(response: string, entity: any, createSingleOutputEntity?: () => any): any {
        try {
            const entityName = entity.constructor.name;
            const requestName = entityName.split("Result")[0];
            // receivedTags contains XElement either directly encapsulating received data (e.g. above <ID>1234</ID>)
            // or XElement encapsulating Output tags (e.g. above <UserRoleAllOutput>)
            const receivedTags = XmlObjects.parse(response)
                .root
                .element("soap:Body")
                .element(`${requestName}Response`)
                .elements(`${entityName}`)[0];
            const outputs = receivedTags.elements(`${requestName}Output`);
            if (outputs.length === 0) {
                return this.mapReceivedDataToEntity(entity, receivedTags.nodes())
            }
            else {
                outputs.map(output => {
                    const mappingEntity = this.mapReceivedDataToEntity(createSingleOutputEntity(), output.nodes());
                    entity[`${mappingEntity.constructor.name}s`].push(mappingEntity);
                });
                return entity
            }
        }
        catch {
            this.error = true;
            return null
        }
    }

    /**
     * Method maps received data to corresponding fields of provided entity
     *
     * @param entity - entity to map received data to
     * @param {XNode[]} nodes - received data in XML object
     */
    private mapReceivedDataToEntity(entity: any, nodes: XmlObjects.XNode[]) {
        const properties = Object.getOwnPropertyNames(entity);
        nodes.map(tag => {
            if (tag instanceof XmlObjects.XElement) {
                properties.map(property => {
                    if (property === tag.name.toString()) {
                        entity[property] = tag.value.toString()
                    }
                })
            }
        });
        return entity
    }
}
