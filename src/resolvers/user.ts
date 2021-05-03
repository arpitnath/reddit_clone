import {
  Resolver,
  Ctx,
  Arg,
  Mutation,
  InputType,
  Field,
  Query
} from 'type-graphql'
import { MyContext } from '../types'
import { User } from '../entities/User'
import argon2 from 'argon2'

@InputType()
class UsernamePasswordInput {
  @Field()
  first_name: string
  @Field()
  last_name: string
  @Field()
  email_id: string
  @Field()
  username: string
  @Field()
  password: string
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg('register') register: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ) {
    const hashedPassword = await argon2.hash(register.password)
    const user = em.create(User, {
      username: register.username,
      password: hashedPassword,
      first_name: register.first_name,
      last_name: register.last_name,
      email_id: register.email_id
    })
    await em.persistAndFlush(user)
    return user
  }
  @Query(() => [User])
  users(@Ctx() { em }: MyContext): Promise<User[]> {
    return em.find(User, {})
  }
}
