const { getUserId } = require('../../utils')
// event(id: ID!): Event
// courseTemplate(id: ID!): CourseTemplate
// course(id: ID!): Course
// events: [Event!]!
// eventByKind(eventKind: EventKind!): [Event!]!
// courseTemplates: [CourseTemplate!]!
// courses: [Course!]!

const calendar = {
   // list of EVENTS nav'd from Main Menu
   events(parent, { id, name, desc, date }, ctx, info) {
      return ctx.db.query.events({ where: { id } }, info)
   },
   // list of TEMPLATES nav'd from main menu
   courseTemplates(parent, { id, name, courseKind, campus, days, hours }, ctx, info) {
      return ctx.db.query.courseTemplates({ where: { id } }, info)
   },
   // list of COURSES nav'd from main menu
   courses(parent, { id }, ctx, info) {
      return ctx.db.query.courses({ where: { id } }, info)
   },
   
   eventByKind(parent, { eventKind }, ctx, info) {
      return ctx.db.query.eventByKind({ where: { EventKind: eventKind } }, info)
   },
   
   course(parent, { id }, ctx, info) {
      return ctx.db.query.course({ where: { id } }, info)
   },
   
   event(parent, { id }, ctx, info) {
      return ctx.db.query.event({where: { id }}, info)
   },
   
   courseTemplate(parent, { id }, ctx, info) {
      return ctx.db.query.courseTemplate({ where: { id } }, info)
   },
}

module.exports = { calendar }