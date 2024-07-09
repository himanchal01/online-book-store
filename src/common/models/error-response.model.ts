import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ErrorResponse {
    @Field()
    status: number;

    @Field()
    message: string;

    @Field()
    error: string;

}
