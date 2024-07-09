import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  image?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}


@ObjectType()
export class CreateUserResponse {

  @Field()
  status: number;

  @Field()
  message: string;

  @Field(() => UserModel)
  data: UserModel
}