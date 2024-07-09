import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageResolver } from './image.resolver';
import { CloudinaryConfigService } from '../cloudinary/cloudinary.config';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    providers: [ImageService, ImageResolver, CloudinaryConfigService],
})
export class ImageModule { }
