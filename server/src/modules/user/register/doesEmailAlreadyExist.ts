import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { User } from "../../../entity/User";

@ValidatorConstraint({ async: true })
export class DoesEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
  async validate(email: string) {
    return User.findOne({ where: { email } }).then(user => {
      if (user) return false;
      else return true;
    });
  }
}

export function DoesEmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: DoesEmailAlreadyExistConstraint
    });
  };
}