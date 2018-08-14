const { AuthPayload } = require('./AuthPayload')
const { Subscription } = require('./Subscription')
const { posts } = require('./Query/posts')
const { user } = require('./Query/user')
const { auth } = require('./Mutation/auth')
const { post } = require('./Mutation/post')


module.exports = {
  Query: {
    ...posts,
    ...user,
  },
  Mutation: {
    ...auth,
    ...post,
  },
  Subscription,
  AuthPayload,
}
