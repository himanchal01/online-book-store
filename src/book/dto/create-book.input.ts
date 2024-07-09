import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
    @Field(() => String)
    bookName: string;

    @Field(() => String)
    publishedDate: string;

    @Field(() => String)
    description: string;

    @Field(() => String)
    price: number;

    @Field(() => String)
    image: string;

    @Field(() => String)
    genre: string;
}