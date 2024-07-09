import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ImageService } from "./image.service";
import { GraphQLUpload, FileUpload } from "graphql-upload"

@Resolver()
export class ImageResolver {
    constructor(private imageService: ImageService) { }

    @Mutation(() => String)
    async uploadImage(@Args({ name: 'image', type: () => GraphQLUpload }) file: FileUpload): Promise<string> {
        const uploadResult = await this.imageService.uploadImage(file)
        return uploadResult.secure_url
    }
}