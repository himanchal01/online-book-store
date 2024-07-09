import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";


@Schema()
export class Book extends Document {
    @Prop({ required: true })
    bookName: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User", required: true })
    authorId: MongooseSchema.Types.ObjectId;

    @Prop({ required: true })
    publishedDate: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    genre: string;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true })
    createdAt: Date;

    @Prop({ required: true })
    updatedAt: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
