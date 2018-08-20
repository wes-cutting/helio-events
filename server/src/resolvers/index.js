const { AuthPayload } = require('./AuthPayload')
const { Subscription } = require('./Subscription')
const { posts } = require('./Query/posts')
const { user } = require('./Query/user')
const { auth } = require('./Mutation/auth')
const { post } = require('./Mutation/post')
const { calendar } = require('./Query/calendar')
const { events } = require('./Mutation/events')
const { courseTemplates } = require('./Mutation/coursesTemplate')
const { courses } = require('./Mutation/courses')

module.exports = {
  Query: {
    ...posts,
    ...user,
    ...calendar,
  },
  Mutation: {
    ...auth,
    ...post,
    ...events,
    ...courseTemplates,
    ...courses,
  },
  Subscription,
  AuthPayload,
}
