import { ObjectType, Field, ID, Root, registerEnumType } from 'type-graphql';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, JoinTable } from 'typeorm';

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN"
}

registerEnumType(UserRole, { name: "role", description: "User access role" });

@Entity() @ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  firstName: string

  @Field()
  @Column()
  lastName: string

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field()
  @Column({ unique: true })
  email: string

  @Field(() => UserRole)
  @Column('varchar', { default: UserRole['USER'], length: 100 })
  role: UserRole

  // JWT Auth
  @Field({ nullable: true })
  @Column({ default: 0 })
  authCount: number
  
  // User Auth
  @Column()
  password: string
}