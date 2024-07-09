import { Injectable } from "@nestjs/common";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { FileUpload } from "graphql-upload"

@Injectable()
export class ImageService {
    async uploadImage(file: FileUpload): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result)
                }
            );
            file.createReadStream().pipe(uploadStream)
        })
    }
}