import { Length, IsEmail } from "class-validator";
import { InputType, Field } from "type-graphql";
import { DoesEmailAlreadyExist } from "./doesEmailAlreadyExist";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;
  
  @Field()
  @IsEmail()
  @DoesEmailAlreadyExist({message: "Email already in use"})
  email: string;
  
  @Field()
  @Length(1, 255)
  password: string;
}
