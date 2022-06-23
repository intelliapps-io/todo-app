import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Brackets, getConnection } from "typeorm";
import { User } from "../../entity/User";
import { UserHasFriend } from "../../entity/UserHasFriend";
import { MyContext } from "../../ts/context";

@Resolver()
export class FriendsResolver {
  /**
   * Friend
   * @param friendId 
   * @param ctx 
   */
  @Query(() => User)
  async friend(@Arg('id') friendId: string, @Ctx() ctx: MyContext): Promise<User> {
    const qb = await getConnection().createQueryBuilder()
    qb.select("user")
    qb.from(User, "user")
    qb.where(`'${ctx.req.userId}' IN (SELECT u.userId FROM user_has_friend u WHERE u.friendId = '${friendId}')`)
    qb.orWhere(`'${friendId}' IN (SELECT u.userId FROM user_has_friend u WHERE u.friendId = '${ctx.req.userId}')`)

    const friends = await qb.getMany().catch(err => { throw err })
    if (friends.length === 0)
      throw new Error('Friend does not exist by id')

    return friends[0]


    // const friend = await UserHasFriend
    //   .findOne({ where: { friendId, userId: ctx.req.userId, isFriendAccepted: true }, relations: ['friend'] })
    //   .catch(err => { throw err })

    // const user = await UserHasFriend
    //   .findOne({ where: { friendId: ctx.req.userId, userId: friendId, isFriendAccepted: true }, relations: ['user'] })
    //   .catch(err => { throw err })

    // if (!(friend && friend.friend) || !(user && user.user)) throw new Error('Friend does not exist by id')

    // if (friend.friend)
    //   return friend.friend
    // else
    //   return user.user
  }

  @Query(() => [User])
  async friends(@Ctx() ctx: MyContext): Promise<User[]> {
    const friends = await UserHasFriend
      .find({ where: { userId: ctx.req.userId, isFriendAccepted: true }, relations: ['friend'] })
      .catch(err => { throw err })

    const users = await UserHasFriend
      .find({ where: { friendId: ctx.req.userId, isFriendAccepted: true }, relations: ['user'] })
      .catch(err => { throw err })
    
    let merged: User[] = []
    friends.forEach(record => merged.push(record.friend))
    users.forEach(record => merged.push(record.user))

    return merged
  }


}