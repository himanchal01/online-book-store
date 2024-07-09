import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetAllBookInput {
    @Field(() => Int)
    page: number = 1;

    @Field(() => Int)
    limit: number = 10;

}

@InputType()
export class GetAllSearchBookInput {
    @Field(() => Int)
    page: number = 1;

    @Field(() => Int)
    limit: number = 10;

    @Field(() => String)
    searchTerm: string = ""
}

@InputType()
export class GetAllFilterBookInput {
    @Field(() => Int)
    page: number = 1;

    @Field(() => Int)
    limit: number = 10;

    @Field(() => String)
    genre: string = ""
}