const { getUserId } = require('../../utils')
// event(id: ID!): Event
// courseTemplate(id: ID!): CourseTemplate
// course(id: ID!): Course
// events: [Event!]!
// eventByKind(eventKind: EventKind!): [Event!]!
// courseTemplates: [CourseTemplate!]!
// courses: [Course!]!

const calendar = {
    event(parent, { id }, ctx, info) {
        return ctx.db.query.event({ where: { id } }, info)
    },
}

module.exports = { calendar }
