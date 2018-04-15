

export class WarehouseItemDetailPhotoResult {
    PhotoContent: string;
    PhotoExtension: string;

    constructor() {
        this.PhotoContent = null;
        this.PhotoExtension = null;
    }

    toString() {
        return "PhotoContent: " + this.PhotoContent + "\n" + "PhotoExtension: " + this.PhotoExtension;
    }
}