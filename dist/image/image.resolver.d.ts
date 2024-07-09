import { ImageService } from "./image.service";
import { FileUpload } from "graphql-upload";
export declare class ImageResolver {
    private imageService;
    constructor(imageService: ImageService);
    uploadImage(file: FileUpload): Promise<string>;
}
