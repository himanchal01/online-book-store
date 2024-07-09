import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { BookSchema } from './schema/book.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
    providers: [BookService, BookResolver],
})
export class BookModule { }
