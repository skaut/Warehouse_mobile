
export const baseRequest = (requestBody) => {
    return (
    `<soap:Envelope ${xmlns}>
        <soap:Body>
            ${requestBody}
        </soap:Body>
    </soap:Envelope>`);
};

const xmlns = "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"";