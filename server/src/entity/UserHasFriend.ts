import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn,  } from "typeorm";
import { RelationColumn } from "../helpers/helpers";
import { User } from "./User";

@Entity()
export class UserHasFriend extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  userHasFriendId: number

  @Column(() => Boolean)
  isFriendAccepted: boolean

  @ManyToOne(() => User)
  user: User
  @RelationColumn()
  userId: string

  @ManyToOne(() => User)
  friend: User
  @RelationColumn()
  friendId: string
}