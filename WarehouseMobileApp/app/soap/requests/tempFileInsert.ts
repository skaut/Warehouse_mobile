import { BaseRequest } from "./baseRequest";


export class TempFileInsert extends BaseRequest {
    Extension: string;
    Content: any;
    Filename: string;

    constructor(extension: string, content: any) {
        super();
        this.Extension = extension;
        this.Content = content;
        this.Filename = "hokus";
    }
}
