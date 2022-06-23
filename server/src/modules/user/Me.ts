import { Resolver, Query, Ctx, Authorized, Arg, InputType, Field } from "type-graphql";
import { getConnection } from "typeorm";
import { User, UserRole } from "../../entity/User";
import { nodeLogger } from "../../helpers/helpers";
import { MyContext } from "../../ts/context";

@InputType()
class SearchUserInput {
  @Field()
  email: string
}

@Resolver()
export class MeResolver {
  @Query(() => [User])
  @Authorized([UserRole['USER']])
  async users(@Arg('data') data: SearchUserInput): Promise<User[]> {
    const qb = getConnection().createQueryBuilder()
    qb.select('user')
    qb.from(User, 'user')
    qb.where(`user.email LIKE '%${data.email}%'`)
    qb.limit(10)
    return await qb.getMany().catch(err => { throw err })
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | null | undefined> {
    if (!ctx.req.userId) return null;
    return await User.findOne({ where: { id: ctx.req.userId } });
  }
}