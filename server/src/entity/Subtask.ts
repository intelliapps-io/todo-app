import { Field, ID, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RelationColumn } from "../helpers/helpers";
import { Task } from "./Task";
import { User } from "./User";

@Entity() @ObjectType()
export class Subtask extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number

  @Field(() => String)
  @Column('varchar', { length: 255 })
  title: string

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  isCompleted: boolean

  @Field(() => User)
  @ManyToOne(() => User, { cascade: ['remove'], onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn()
  createdBy: User
  @RelationColumn()
  createdById: string

  @Field(() => Task)
  @ManyToOne(() => Task, { cascade: ['remove'], onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn()
  parentTask: Task
  @RelationColumn()
  parentTaskId: number
}