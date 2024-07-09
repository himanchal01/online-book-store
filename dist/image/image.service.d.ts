import { UploadApiResponse } from "cloudinary";
import { FileUpload } from "graphql-upload";
export declare class ImageService {
    uploadImage(file: FileUpload): Promise<UploadApiResponse>;
}
